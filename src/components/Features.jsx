import React from 'react';

const features = [
  { icon: "🍃", title: "Premium Quality", desc: "Soft & Durable Fabrics" },
  { icon: "🏺", title: "Beautiful Designs", desc: "For Every Home" },
  { icon: "✨", title: "Carefully Curated", desc: "With Love" },
  { icon: "🚚", title: "Fast & Reliable", desc: "Pan India Delivery" },
];

export default function Features() {
  return (
    <div className="bg-white border-b border-brand-beige py-6 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4 text-center">
        {features.map((f, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">{f.icon}</span>
            <h4 className="text-xs font-semibold text-brand-dark">{f.title}</h4>
            <p className="text-[11px] text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}