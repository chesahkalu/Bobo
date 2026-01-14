const features = [
  {
    icon: "🌙",
    title: "Smart Sleep Tracking",
    description: "AI predicts the perfect nap windows and bedtime. Track sleep patterns and get personalized recommendations.",
    className: "md:col-span-2 bg-[#f4f6f5] border-[#c5d3cd]",
    stats: "93% of parents report better sleep",
  },
  {
    icon: "🍼",
    title: "Feeding Insights",
    description: "Track breast, bottle, formula, and solids. See patterns and get smart reminders.",
    className: "bg-white border-gray-200",
  },
  {
    icon: "🎯",
    title: "Milestone Tracker",
    description: "WHO-backed developmental guidance across 4 categories. Never miss a milestone.",
    className: "bg-white border-gray-200",
  },
  {
    icon: "👥",
    title: "Parent Community",
    description: "Join 50,000+ parents sharing real experiences. Forums for sleep, feeding, health, and more.",
    className: "md:col-span-2 bg-gradient-to-br from-[#425a51] to-[#364842] border-[#425a51]",
    dark: true,
    highlight: true,
    stats: "10,000+ discussions",
  },
  {
    icon: "🤖",
    title: "AI Parenting Assistant",
    description: "Get instant answers to any parenting question. Our AI is trained on expert advice and real parent experiences.",
    className: "md:col-span-2 bg-gray-900 border-gray-800",
    dark: true,
    badge: "NEW",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Sync",
    description: "Real-time sharing with partners, grandparents, and caregivers.",
    className: "bg-[#fdf8f6] border-[#f3dad3]",
  },
  {
    icon: "📊",
    title: "Growth Charts",
    description: "Track weight, height, and head circumference against WHO standards.",
    className: "bg-white border-gray-200",
  },
  {
    icon: "🛒",
    title: "Parent Marketplace",
    description: "Buy, sell, and swap baby items with verified parents in your community.",
    className: "bg-white border-gray-200",
    badge: "COMING SOON",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#f4f6f5] text-[#425a51] text-sm font-medium rounded-full mb-4">
            ✨ Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to <br />
            <span className="text-[#cf765d] italic">Thrive as a Parent</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Smart tools designed to replace the chaos with confidence. Track, learn, connect, and grow together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${feature.className}`}
            >
              {feature.badge && (
                <span className={`absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full ${
                  feature.badge === "NEW" ? "bg-[#cf765d] text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {feature.badge}
                </span>
              )}
              <div className="flex flex-col h-full justify-between">
                <div className={`text-4xl mb-6 ${feature.dark ? "bg-white/10" : "bg-white shadow-sm"} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-3 ${feature.dark ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-base leading-relaxed ${feature.dark ? "text-gray-300" : "text-gray-500"}`}>
                    {feature.description}
                  </p>
                  {feature.stats && (
                    <p className={`mt-4 text-sm font-medium ${feature.dark ? "text-white/70" : "text-[#425a51]"}`}>
                      📈 {feature.stats}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
