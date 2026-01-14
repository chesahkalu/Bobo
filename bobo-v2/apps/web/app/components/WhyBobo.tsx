export default function WhyBobo() {
  const reasons = [
    {
      icon: "🧠",
      title: "AI-Powered Intelligence",
      description: "Our AI learns your baby's patterns and provides personalized insights. Not just tracking—understanding.",
    },
    {
      icon: "👥",
      title: "Real Parent Community",
      description: "50,000+ parents sharing real experiences. Get advice from those who've been there.",
    },
    {
      icon: "🎯",
      title: "WHO-Backed Milestones",
      description: "Track development with research-backed guidance. Know exactly what to expect at each stage.",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your data is encrypted and never shared. HIPAA-compliant security for peace of mind.",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Built for Families",
      description: "Multi-caregiver sync, family sharing, and real-time updates. Everyone stays in the loop.",
    },
    {
      icon: "💚",
      title: "Made by Parents",
      description: "Built by real parents who understand the chaos. Every feature solves a real problem.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#fdf8f6] text-[#cf765d] text-sm font-medium rounded-full mb-4">
            💚 Why Parents Choose Bobo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Not Just Another <br />
            <span className="text-[#cf765d] italic">Baby Tracking App</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We built Bobo to be the parenting companion we wished we had. Here&apos;s what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-xl bg-[#f4f6f5] flex items-center justify-center text-2xl mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-500">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-16 bg-gradient-to-br from-[#f4f6f5] to-white rounded-3xl p-8 border border-[#c5d3cd]">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bobo vs. Other Apps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-bold text-gray-900 mb-2">Basic Tracking Apps</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>❌ Just logs data</li>
                <li>❌ No insights</li>
                <li>❌ No community</li>
              </ul>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 border-2 border-[#425a51] shadow-lg">
              <div className="text-4xl mb-3">🍃</div>
              <h4 className="font-bold text-[#425a51] mb-2">Bobo</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✅ AI-powered predictions</li>
                <li>✅ 50,000+ parent community</li>
                <li>✅ WHO-backed guidance</li>
                <li>✅ Family sync</li>
                <li>✅ 24/7 AI assistant</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="font-bold text-gray-900 mb-2">Premium-Only Apps</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>❌ $15-30/month</li>
                <li>❌ Paywalled features</li>
                <li>❌ No free tier</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
