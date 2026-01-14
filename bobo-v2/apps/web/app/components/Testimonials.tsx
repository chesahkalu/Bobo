const testimonials = [
  {
    quote: "Bobo's sleep predictions are like magic! My baby went from random naps to a perfect schedule.",
    author: "Sarah Jenkins",
    role: "Mom of 8-month-old",
    rating: 5,
  },
  {
    quote: "Finally an app that syncs with my partner. No more 'did you feed her yet?' texts!",
    author: "James Kim",
    role: "Dad of twins",
    rating: 5,
  },
  {
    quote: "The milestone tracking helped us catch a developmental concern early. Forever grateful.",
    author: "Maria Lopez",
    role: "Mom of toddler",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-[#f4f6f5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loved by <span className="text-[#cf765d] italic">Modern Parents</span>
          </h2>
          <p className="text-lg text-gray-500">
            Join thousands of happy families using Bobo every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f4f6f5] flex items-center justify-center text-lg font-bold text-[#425a51]">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
