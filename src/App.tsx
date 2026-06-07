import { motion, useScroll, useSpring } from "motion/react";
import Background from "./components/Background";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="grain relative min-h-screen">
      <Background />
      <Cursor />

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-iris via-cyan to-lime"
      />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
