export default function Community() {
  const topics = [
    { icon: "🌙", name: "Sleep & Naps", count: "2.4k discussions" },
    { icon: "🍼", name: "Feeding", count: "1.8k discussions" },
    { icon: "🎯", name: "Milestones", count: "1.2k discussions" },
    { icon: "💊", name: "Health", count: "980 discussions" },
  ];

  const testimonials = [
    {
      quote: "The sleep tips from other moms literally saved my sanity. My baby finally sleeps through the night!",
      author: "Maria K.",
      role: "Mom to 8-month old",
      avatar: "👩",
    },
    {
      quote: "I was struggling with breastfeeding until I found support here. Real advice from real parents.",
      author: "Sarah T.",
      role: "First-time mom",
      avatar: "👩‍🦰",
    },
    {
      quote: "The milestone tracker combined with community advice helped me know what to expect at each stage.",
      author: "James L.",
      role: "Dad of twins",
      avatar: "👨",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#f4f6f5] to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#425a51] text-white text-sm font-medium rounded-full mb-4">
            👥 Parent Community
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            You&apos;re Not Alone on <br />
            <span className="text-[#425a51] italic">This Journey</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Connect with 50,000+ parents sharing real experiences, tips, and support. 
            Because every parent needs a village.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-[#425a51] mb-1">50K+</div>
            <div className="text-sm text-gray-500">Active Parents</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-[#425a51] mb-1">10K+</div>
            <div className="text-sm text-gray-500">Discussions</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-[#425a51] mb-1">8</div>
            <div className="text-sm text-gray-500">Topic Categories</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-[#425a51] mb-1">24/7</div>
            <div className="text-sm text-gray-500">Active Community</div>
          </div>
        </div>

        {/* Topics Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all cursor-pointer">
              <div className="text-3xl mb-2">{topic.icon}</div>
              <h4 className="font-bold text-gray-900">{topic.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{topic.count}</p>
            </div>
          ))}
        </div>

        {/* Community Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="text-[#425a51] text-4xl mb-4">&quot;</div>
              <p className="text-gray-700 mb-4 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f4f6f5] flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/signup"
            className="inline-block px-8 py-4 rounded-full bg-[#425a51] text-white font-semibold text-lg hover:bg-[#364842] transition-colors shadow-lg hover:shadow-xl"
          >
            Join Our Community →
          </a>
          <p className="text-sm text-gray-400 mt-4">Free to join. No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
