const features = [
  {
    icon: "🌙",
    title: "Smart Sleep Tracking",
    description: "AI predicts the perfect nap windows for your baby.",
    className: "md:col-span-2 bg-[#f4f6f5] border-[#c5d3cd]",
  },
  {
    icon: "🍼",
    title: "Feeding Insights",
    description: "Track patterns for breast, bottle, and solids.",
    className: "bg-white border-gray-200",
  },
  {
    icon: "📊",
    title: "Growth Milestones",
    description: "Research-backed development guidance.",
    className: "bg-white border-gray-200",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Sync",
    description: "Real-time sharing with caregivers.",
    className: "md:col-span-2 bg-[#fdf8f6] border-[#f3dad3]",
  },
  {
    icon: "🤖",
    title: "AI Parenting Chatbot",
    description: "Get instant answers from our intelligent assistant powered by advanced AI.",
    className: "md:col-span-3 bg-gray-900 border-gray-800",
    dark: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to <br />
            <span className="text-[#cf765d] italic">Thrive as a Parent</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Smart tools designed to replace the chaos with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.className}`}
            >
              <div className="flex flex-col h-full justify-between">
                <div className={`text-4xl mb-6 ${feature.dark ? "bg-white/10" : "bg-white"} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-3 ${feature.dark ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-base leading-relaxed ${feature.dark ? "text-gray-400" : "text-gray-500"}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
