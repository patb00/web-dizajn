"use client";

import Navbar from "./components/navbar";
import HeroSection from "./components/sections/hero/hero-section";
import AboutSection from "./components/sections/about/about-section";
import ContactSection from "./components/sections/contact/contact-section";
import VisualizerSection from "./components/sections/visualizer/visualizer-section";

export default function Home() {
  return (
    <main
      className="min-h-screen w-full text-white relative"
      style={{
        backgroundImage: "url('/background.jpeg')",
        backgroundSize: "100% auto",
      }}
    >
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VisualizerSection />
      <ContactSection />
    </main>
  );
}
