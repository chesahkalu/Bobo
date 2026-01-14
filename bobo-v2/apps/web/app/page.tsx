"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Community from "./components/Community";
import WhyBobo from "./components/WhyBobo";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Community />
        <WhyBobo />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
