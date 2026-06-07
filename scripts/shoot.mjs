// Drive headless Chrome via the DevTools Protocol to capture screenshots,
// including interactive states. Uses Node's built-in global WebSocket/fetch.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const OUT = "/Users/villaca/vitor-paz-portfolio/public/shots";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--user-data-dir=/tmp/cdp-profile-shots",
  "--hide-scrollbars",
  "--force-device-scale-factor=2",
  "--window-size=1280,820",
  "--no-first-run",
  "--disable-gpu",
  "about:blank",
]);
chrome.stderr.on("data", () => {});

// wait for the debugging endpoint
let wsUrl;
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const j = await r.json();
    wsUrl = j.webSocketDebuggerUrl;
    if (wsUrl) break;
  } catch {}
  await sleep(250);
}
if (!wsUrl) {
  console.error("no CDP endpoint");
  process.exit(1);
}

// --- minimal CDP client over the browser-level socket (flat sessions) ---
const ws = new WebSocket(wsUrl);
await new Promise((res) => (ws.onopen = res));
let id = 0;
const pending = new Map();
const loadWaiters = new Set();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method === "Page.loadEventFired") {
    for (const w of loadWaiters) w(msg.sessionId);
  }
};
function send(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const myId = ++id;
    pending.set(myId, { resolve, reject });
    ws.send(JSON.stringify({ id: myId, method, params, sessionId }));
  });
}

// one reusable tab
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", {
  targetId,
  flatten: true,
});
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);

async function go(url) {
  const loaded = new Promise((res) => {
    const fn = (sid) => {
      if (sid === sessionId) {
        loadWaiters.delete(fn);
        res();
      }
    };
    loadWaiters.add(fn);
  });
  await send("Page.navigate", { url }, sessionId);
  await Promise.race([loaded, sleep(8000)]);
}
async function evalJS(expression) {
  const r = await send(
    "Runtime.evaluate",
    { expression, awaitPromise: true, returnByValue: true },
    sessionId,
  );
  return r.result?.value;
}
async function shot(name, { fullPage = false } = {}) {
  let clip;
  if (fullPage) {
    const dims = await evalJS(
      `(() => { const b=document.body, e=document.documentElement;
        return { w: Math.max(b.scrollWidth,e.scrollWidth,1280),
                 h: Math.max(b.scrollHeight,e.scrollHeight) }; })()`,
    );
    clip = { x: 0, y: 0, width: dims.w, height: dims.h, scale: 1 };
  }
  const { data } = await send(
    "Page.captureScreenshot",
    {
      format: "png",
      captureBeyondViewport: fullPage,
      ...(clip ? { clip } : {}),
    },
    sessionId,
  );
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, "base64"));
  console.log("saved", name);
}

const TTR = "http://localhost:5180";
const FWC = "http://localhost:5181";

// ---------- TICKET TO RIDE ----------
const ttrJobs = [
  { url: `${TTR}/`, name: "ttr-1-hero" },
  { url: `${TTR}/#turn`, name: "ttr-2-turn" },
  { url: `${TTR}/#sandbox`, name: "ttr-3-map" },
  { url: `${TTR}/#scoring`, name: "ttr-4-scoring" },
  { url: `${TTR}/#quiz`, name: "ttr-5-quiz" },
];
for (const job of ttrJobs) {
  await go(job.url);
  await sleep(900);
  // jump instantly to the anchor (avoid mid-smooth-scroll capture)
  const hash = new URL(job.url).hash;
  if (hash) {
    await evalJS(
      `document.querySelector(${JSON.stringify(hash)})?.scrollIntoView({behavior:'instant',block:'start'}); true`,
    );
    await sleep(500);
  }
  await shot(job.name);
}

// ---------- FWC26 ----------
// 1) empty group stage
await go(`${FWC}/`);
await sleep(900);
await evalJS(`localStorage.clear(); true`);
await go(`${FWC}/`);
await sleep(900);
await shot("fwc-1-groups");

// 2) click "Random Groups" -> filled standings
await evalJS(
  `(() => { const b=[...document.querySelectorAll('button')].find(x=>/random/i.test(x.textContent||'')); if(b){b.click(); return true;} return false; })()`,
);
await sleep(1200);
await evalJS(`window.scrollTo({top:0,behavior:'instant'}); true`);
await sleep(400);
await shot("fwc-2-standings");

// 3) scroll a bit to show a couple of filled groups
await evalJS(`window.scrollTo({top:520,behavior:'instant'}); true`);
await sleep(500);
await shot("fwc-3-filled");

// 4) advance to the knockout bracket if the phase unlocked
const wentR32 = await evalJS(
  `(() => { const els=[...document.querySelectorAll('button, [role=button], a, div')];
     const t=els.find(x=>/^\\s*(R32|Round of 32)/i.test((x.textContent||'').trim()));
     if(t){ t.click(); return true; } return false; })()`,
);
await sleep(1000);
await evalJS(`window.scrollTo({top:0,behavior:'instant'}); true`);
await sleep(400);
await shot("fwc-4-bracket", { fullPage: false });
console.log("R32 clicked:", wentR32);

await send("Target.closeTarget", { targetId });
ws.close();
chrome.kill();
console.log("done");
process.exit(0);
