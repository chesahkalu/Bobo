const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "1 baby profile",
      "Basic sleep & feeding logs",
      "7-day history",
      "Milestone checklist",
      "Community access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/mo",
    description: "For parents who want it all",
    features: [
      "Unlimited baby profiles",
      "AI sleep predictions",
      "Unlimited history",
      "Growth percentiles",
      "AI Chatbot access",
      "Caregiver sharing",
      "Ad-free experience",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Family",
    price: "$14.99",
    period: "/mo",
    description: "Share with the whole family",
    features: [
      "Everything in Premium",
      "Up to 5 family members",
      "Pediatrician exports",
      "Priority support",
      "Early access features",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-500">
            Start free, upgrade when you need the superpowers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-gray-900 text-white border-gray-800 shadow-2xl scale-105"
                  : "bg-white border-gray-200 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#cf765d] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-lg ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`mb-6 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                {plan.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={plan.popular ? "text-[#cf765d]" : "text-[#425a51]"}>✓</span>
                    <span className={plan.popular ? "text-gray-300" : "text-gray-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-4 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-[#425a51] text-white hover:bg-[#364842]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
