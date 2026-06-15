import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-beige px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden text-2xl cursor-pointer">☰</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm tracking-medium text-gray-600">
          <a href="#home" className="hover:text-brand-rose transition">Home</a>
          <a href="#shop" className="hover:text-brand-rose transition">Shop</a>
          <a href="#collections" className="hover:text-brand-rose transition">Collections</a>
        </div>

        {/* Brand Logo */}
        <div className="text-center">
          <h1 className="text-2xl font-serif tracking-widest font-semibold text-brand-dark">ABHA</h1>
          <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase -mt-1">Creations</p>
        </div>

        {/* Utility Links & Icons */}
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <a href="#about" className="hidden md:inline hover:text-brand-rose">About Us</a>
          <a href="#contact" className="hidden md:inline hover:text-brand-rose">Contact</a>
          <span className="cursor-pointer text-lg">🔍</span>
          <span className="cursor-pointer text-lg">👤</span>
          <span className="cursor-pointer text-lg relative">
            🛒 <span className="absolute -top-2 -right-2 bg-brand-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </span>
        </div>
      </div>
    </nav>
  );
}