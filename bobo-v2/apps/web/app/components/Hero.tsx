"use client";

import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Save to Supabase
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f4f6f5] via-white to-[#fdf8f6] -z-10" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#c5d3cd]/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f3dad3]/30 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-gray-200/50 backdrop-blur-sm mb-8">
          <span className="text-amber-500">✨</span>
          <span className="text-sm font-medium text-gray-600">
            Trusted by 50,000+ modern parents
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
          Track Every{" "}
          <span className="text-[#425a51] italic">Precious Moment</span>
          <br />
          with Intelligent Insights
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Bobo helps you understand your baby&apos;s sleep, feeding, and growth patterns 
          with beautifully simple AI-powered tracking.
        </p>

        {/* CTA Form */}
        <div className="max-w-md mx-auto mb-16">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 min-w-[200px] px-5 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl"
              >
                Join Waitlist
              </button>
            </form>
          ) : (
            <div className="text-center p-4 bg-[#f4f6f5] rounded-2xl text-[#425a51] border border-[#c5d3cd]">
              🎉 You&apos;re on the list! We&apos;ll be in touch soon.
            </div>
          )}
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-8 flex-wrap text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <span>⭐️</span>
            <span>4.9/5 rating</span>
          </div>
          <div className="w-px h-4 bg-gray-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span>📱</span>
            <span>iOS & Android</span>
          </div>
          <div className="w-px h-4 bg-gray-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
