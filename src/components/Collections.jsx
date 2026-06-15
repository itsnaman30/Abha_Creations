import React from 'react';

const categories = [
  { name: "Bedsheets", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=400&q=80" },
  { name: "Comforters", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80" },
  { name: "Cushions", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80" },
];

export default function Collections() {
  return (
    <section id="collections" className="py-12">
      <h3 className="text-2xl font-serif text-center text-brand-dark mb-2">Shop Our Collections</h3>
      <div className="w-16 h-[2px] bg-brand-rose mx-auto mb-10"></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group border border-brand-beige/50 p-3">
            <div className="rounded-xl overflow-hidden aspect-square bg-brand-cream">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="text-center pt-4 pb-2">
              <h4 className="font-medium text-brand-dark text-sm md:text-base">{cat.name}</h4>
              <p className="text-xs text-brand-rose font-light mt-1 group-hover:underline cursor-pointer">Explore →</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}