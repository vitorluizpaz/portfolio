import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9336;
const OUT = "/Users/villaca/vitor-paz-portfolio/public/shots";
const FWC = "http://localhost:5181";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PORT}`, "--user-data-dir=/tmp/cdp-profile-shots4", "--hide-scrollbars", "--force-device-scale-factor=2", "--window-size=1280,820", "--no-first-run", "--disable-gpu", "about:blank"]);
chrome.stderr.on("data", () => {});
let wsUrl;
for (let i = 0; i < 60; i++) { try { const j = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); wsUrl = j.webSocketDebuggerUrl; if (wsUrl) break; } catch {} await sleep(250); }
const ws = new WebSocket(wsUrl); await new Promise((res) => (ws.onopen = res));
let id = 0; const pending = new Map(); const loadWaiters = new Set();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result); } else if (m.method === "Page.loadEventFired") for (const w of loadWaiters) w(m.sessionId); };
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => { const myId = ++id; pending.set(myId, { resolve, reject }); ws.send(JSON.stringify({ id: myId, method, params, sessionId })); });
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId); await send("Runtime.enable", {}, sessionId);
async function go(url) { const loaded = new Promise((res) => { const fn = (sid) => { if (sid === sessionId) { loadWaiters.delete(fn); res(); } }; loadWaiters.add(fn); }); await send("Page.navigate", { url }, sessionId); await Promise.race([loaded, sleep(8000)]); }
const evalJS = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, sessionId)).result?.value;
async function shot(name, fullPage = false) { let clip; if (fullPage) { const d = await evalJS(`({w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,1280),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)})`); clip = { x: 0, y: 0, width: d.w, height: Math.min(d.h, 4000), scale: 1 }; } const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: fullPage, ...(clip ? { clip } : {}) }, sessionId); writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, "base64")); console.log("saved", name); }
const buttons = () => evalJS(`JSON.stringify([...document.querySelectorAll('button,a')].map(b=>(b.textContent||'').trim()).filter(Boolean))`);
const clickByText = (reSrc) => evalJS(`(()=>{const re=new RegExp(${JSON.stringify(reSrc)},'i');const b=[...document.querySelectorAll('button,a')].find(x=>re.test((x.textContent||'').trim()) && !x.disabled);if(b){b.click();return (b.textContent||'').trim()}return null})()`);

await go(`${FWC}/`); await sleep(700);
await evalJS(`localStorage.clear(); true`); await go(`${FWC}/`); await sleep(800);
console.log("start buttons:", await buttons());
await clickByText("random");           // Random Groups
await sleep(1200);

// alternate: advance to next phase, then randomize it, until a champion appears
for (let i = 0; i < 8; i++) {
  const cont = await clickByText("continue to|advance|next round|reveal");
  await sleep(1000);
  const rnd = await clickByText("^\\s*\\W*random");  // tolerate leading emoji/space
  await sleep(1000);
  const champ = await evalJS(`/champion|world champion|wins the|lifts the|🏆/i.test(document.body.innerText||'')`);
  console.log(`it${i}: continue=${JSON.stringify(cont)} random=${JSON.stringify(rnd)} champ=${champ}`);
  if (champ && !cont) break;
  if (!cont && !rnd) { console.log("buttons now:", await buttons()); break; }
}

await sleep(800);
// scroll to top to show champion banner / final
await evalJS(`window.scrollTo({top:0,behavior:'instant'}); true`);
await sleep(500);
console.log("PAGE TOP TEXT:", (await evalJS(`(document.body.innerText||'').slice(0,300).replace(/\\n/g,' | ')`)));
await shot("fwc-6-champion");
await shot("fwc-7-final-full", true);
await send("Target.closeTarget", { targetId }); ws.close(); chrome.kill();
console.log("done"); process.exit(0);
