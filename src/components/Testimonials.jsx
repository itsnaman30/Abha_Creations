import React from 'react';

const reviews = [
  {
    name: 'Shreya Mehta ',
    review:
      "I recently purchased three bedsheets from Abha Creations and was truly impressed by the quality. The fabric is soft, comfortable, and premium, and the 3D-look bedsheets for my kids' room were my favourite. Thank you, Abha aunty, for such beautiful products and excellent quality.",
    stars: 5,
    featured: true,
  },
  { name: 'Neha S.', review: 'The bedsheet quality is amazing! So soft and the print is beautiful.', stars: 5 },
  { name: 'Priyanka M.', review: 'Comforter is lightweight yet so warm. Perfect for winters!', stars: 5 },
  { name: 'Anjali K.', review: 'Super fast delivery and such cute packing. Loved it! 💕', stars: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-brand-beige/30 rounded-3xl p-8 mt-16">
      <h3 className="text-2xl font-serif text-center text-brand-dark mb-8">Loved by Our Customers</h3>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl shadow-sm border flex flex-col justify-between ${
              rev.featured
                ? 'border-brand-rose bg-gradient-to-br from-brand-cream to-white ring-2 ring-brand-rose/30 shadow-md'
                : 'bg-white border-brand-beige'
            }`}
          >
            <div>
              <div className="text-amber-400 text-sm mb-3">{'★'.repeat(rev.stars)}</div>
              <p className="text-gray-600 text-xs italic leading-relaxed">"{rev.review}"</p>
            </div>
            <h5 className="text-xs font-semibold text-brand-dark mt-4 text-right">— {rev.name}</h5>
          </div>
        ))}
      </div>
    </section>
  );
}