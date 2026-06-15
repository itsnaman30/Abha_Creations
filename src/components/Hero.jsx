import React from 'react';

export default function Hero() {
  return (
    <section className="relative bg-[#F4EDE4] overflow-hidden py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6 max-w-md">
          <span className="text-xs uppercase tracking-widest text-brand-sage font-semibold">Comfort. Style. Simply Beautiful.</span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark leading-tight">
            Beautiful Homes <br />Begin Here ♡
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Premium bedsheets, comforters, and everyday home essentials you'll love. Crafted for the ultimate sleeping experience.
          </p>
          <div className="flex space-x-4 pt-2">
            <button className="bg-brand-rose hover:bg-opacity-90 text-white px-6 py-3 rounded-full text-sm font-medium transition shadow-md">
              Shop Now →
            </button>
            <button className="bg-white hover:bg-gray-50 text-brand-dark border border-brand-beige px-6 py-3 rounded-full text-sm font-medium transition">
              New Arrivals
            </button>
          </div>
        </div>

        {/* Right Styled Hero Image */}
        <div className="relative flex justify-center">
          <div className="rounded-t-full overflow-hidden border-8 border-white shadow-xl max-w-md w-full aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80" 
              alt="Premium Floral Bedsheet Set" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}