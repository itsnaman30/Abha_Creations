import React, { useState } from 'react';

const defaultCollections = [
  {
    name: 'Bedsheets',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Comforters',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Cushions',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Fashion & Apparel',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
  },
];

const adminCredentials = {
  email: import.meta.env.VITE_ADMIN_EMAIL?.trim() || '',
  password: import.meta.env.VITE_ADMIN_PASSWORD?.trim() || '',
};

export default function App() {
  const [collections, setCollections] = useState(defaultCollections);
  const [viewAuth, setViewAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('customer');
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formValues, setFormValues] = useState({ email: '', password: '', name: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const updateCollectionImage = (index, value) => {
    setCollections((current) =>
      current.map((item, idx) => (idx === index ? { ...item, image: value } : item)),
    );
  };

  const resetForm = () => setFormValues({ email: '', password: '', name: '' });

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const email = formValues.email.trim().toLowerCase();
    const password = formValues.password;

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (authRole === 'admin') {
      if (!adminCredentials.email || !adminCredentials.password) {
        setErrorMessage('Admin access is not configured yet. Please contact the business owner to set the admin login credentials.');
        return;
      }

      if (email === adminCredentials.email && password === adminCredentials.password) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setUserName('Admin');
        setViewAuth(false);
        setErrorMessage('');
        resetForm();
        return;
      }
      setErrorMessage('Invalid admin credentials. Please use the business owner account.');
      return;
    }

    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserName(email.split('@')[0] || 'Guest');
    setViewAuth(false);
    setErrorMessage('');
    resetForm();
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (authRole === 'admin') {
      setErrorMessage('Admin must log in using the business owner account.');
      return;
    }

    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.password) {
      setErrorMessage('Please fill all fields to sign up.');
      return;
    }

    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserName(formValues.name.trim());
    setViewAuth(false);
    setErrorMessage('');
    resetForm();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName('');
    setErrorMessage('');
    resetForm();
  };

  return (
    <div className="w-full min-h-screen bg-brand-cream text-brand-dark font-sans antialiased">
      {viewAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-[30px] bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
            <div className="flex flex-col gap-4 p-6 border-b border-brand-beige/30 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-serif text-brand-dark">
                  {authRole === 'admin' ? 'Admin Login' : authMode === 'login' ? 'Customer Login' : 'Customer Sign Up'}
                </h2>
                <p className="text-[12px] text-gray-500 mt-1">
                  Preview the landing page freely. Sign in to access customer features or let the business owner edit page images.
                </p>
              </div>
              <button
                className="text-brand-rose text-3xl leading-none hover:text-brand-dark transition"
                onClick={() => setViewAuth(false)}
                aria-label="Close login modal"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-3">
                <button
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] transition ${
                    authRole === 'customer'
                      ? 'bg-brand-rose text-white'
                      : 'border border-brand-beige/60 bg-brand-cream text-brand-dark'
                  }`}
                  onClick={() => {
                    setAuthRole('customer');
                    setAuthMode('login');
                    setErrorMessage('');
                  }}
                >
                  Customer
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] transition ${
                    authRole === 'admin'
                      ? 'bg-brand-rose text-white'
                      : 'border border-brand-beige/60 bg-brand-cream text-brand-dark'
                  }`}
                  onClick={() => {
                    setAuthRole('admin');
                    setAuthMode('login');
                    setErrorMessage('');
                  }}
                >
                  Admin
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] transition ${
                    authMode === 'login'
                      ? 'bg-brand-rose text-white'
                      : 'border border-brand-beige/60 bg-brand-cream text-brand-dark'
                  }`}
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMessage('');
                  }}
                >
                  Login
                </button>
                {authRole === 'customer' && (
                  <button
                    className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] transition ${
                      authMode === 'signup'
                        ? 'bg-brand-rose text-white'
                        : 'border border-brand-beige/60 bg-brand-cream text-brand-dark'
                    }`}
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMessage('');
                    }}
                  >
                    Sign Up
                  </button>
                )}
              </div>
              {authRole === 'admin' && (
                <p className="text-[11px] text-gray-500 mt-1">
                  Admin access uses the business owner&apos;s own email and password.
                </p>
              )}

              <div className="rounded-[28px] border border-brand-beige/30 bg-brand-cream p-5">
                <form onSubmit={authMode === 'login' ? handleLoginSubmit : handleSignupSubmit} className="space-y-4">
                  {authMode === 'signup' && (
                    <label className="block text-[11px] uppercase tracking-[0.3em] text-brand-dark">
                      Name
                      <input
                        type="text"
                        value={formValues.name}
                        onChange={(event) => setFormValues((prev) => ({ ...prev, name: event.target.value }))}
                        className="mt-2 w-full rounded-2xl border border-brand-beige/60 bg-white px-4 py-3 text-sm outline-none focus:border-brand-rose"
                        placeholder="Your full name"
                      />
                    </label>
                  )}

                  <label className="block text-[11px] uppercase tracking-[0.3em] text-brand-dark">
                    Email Address
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-brand-beige/60 bg-white px-4 py-3 text-sm outline-none focus:border-brand-rose"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="block text-[11px] uppercase tracking-[0.3em] text-brand-dark">
                    Password
                    <input
                      type="password"
                      value={formValues.password}
                      onChange={(event) => setFormValues((prev) => ({ ...prev, password: event.target.value }))}
                      className="mt-2 w-full rounded-2xl border border-brand-beige/60 bg-white px-4 py-3 text-sm outline-none focus:border-brand-rose"
                      placeholder="Minimum 4 characters"
                    />
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-brand-rose px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-[#8c3f37]"
                    >
                      {authMode === 'login' ? 'Continue' : 'Create Account'}
                    </button>
                    {authMode === 'login' && authRole === 'admin' && (
                      <p className="text-[11px] text-gray-500">
                        Use the business owner&apos;s configured admin credentials.
                      </p>
                    )}
                    {authMode === 'login' && authRole === 'customer' && (
                      <p className="text-[11px] text-gray-500">Customer login is available with any email and password.</p>
                    )}
                  </div>

                  {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- NAVIGATION HEADER --- */}
      <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-brand-beige/40 px-4 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Navigation */}
          <div className="flex items-center gap-6">
            <button className="text-xl text-gray-700 hover:text-brand-rose transition cursor-pointer">☰</button>
            <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-gray-600">
              <a href="#home" className="text-brand-dark border-b-2 border-brand-rose pb-1">Home</a>
              <a href="#shop" className="hover:text-brand-rose transition pb-1">Shop</a>
              <a href="#collections" className="hover:text-brand-rose transition pb-1">Collections</a>
            </nav>
          </div>

          {/* Center Brand Identity (Loading directly from public directory) */}
          <div className="flex flex-col items-center text-center py-1">
            <img 
              src="./assets/abha_creations_logo.jpeg" 
              alt="Abha Creations Logo" 
              className="max-h-[110px] w-auto object-contain"
              onError={(e) => {
                // Friendly text backup if you haven't renamed it to logo.jpg yet
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `
                  <h1 class="text-2xl font-serif tracking-[0.25em] font-bold text-brand-dark">ABHA</h1>
                  <p class="text-[9px] tracking-[0.45em] text-gray-500 uppercase mt-1 font-semibold">— CREATIONS —</p>
                `;
              }}
            />
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-5 text-gray-600 text-sm">
            <a href="#about" className="hidden lg:inline text-xs uppercase tracking-widest font-semibold hover:text-brand-rose">About Us</a>
            <a href="#contact" className="hidden lg:inline text-xs uppercase tracking-widest font-semibold hover:text-brand-rose">Contact</a>
            <button className="hover:text-brand-rose transition cursor-pointer">🔍</button>
            {isLoggedIn ? (
              <>
                <span className="hidden lg:inline text-xs uppercase tracking-widest font-semibold text-brand-sage">
                  {isAdmin ? 'Admin' : 'Customer'}: {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:text-brand-rose transition cursor-pointer text-xs uppercase tracking-widest font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setViewAuth(true);
                  setAuthMode('login');
                }}
                className="rounded-full border border-brand-beige/40 bg-brand-cream px-4 py-2 text-xs uppercase tracking-[0.25em] text-brand-dark hover:bg-white hover:text-brand-rose transition"
              >
                Login / Sign Up
              </button>
            )}
            <button className="hover:text-brand-rose transition cursor-pointer relative">
              🛒 <span className="absolute -top-1.5 -right-2 bg-amber-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">2</span>
            </button>
          </div>
        </div>
      </header>

      {!isLoggedIn && (
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-4">
          <div className="rounded-full border border-brand-beige/40 bg-white/90 px-5 py-3 text-center text-[11px] text-brand-dark shadow-sm">
            Free preview available — browse the landing page before logging in or signing up. 
            <strong className="text-brand-rose">Admin users:</strong> click Login / Sign Up, choose Admin, then sign in to edit the landing page photos.
          </div>
        </div>
      )}

      {/* --- HERO SHOWCASE --- */}
      <section id="home" className="w-full bg-[#f6eee4] py-12 md:py-20 px-4 md:px-12 lg:px-24 border-b border-brand-beige/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 space-y-6 text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-sage font-bold block">
              Comfort. Style. Simply Beautiful.
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark leading-[1.15] font-normal">
              Beautiful Homes <br />
              Begin Here <span className="font-sans text-brand-rose text-3xl">♡</span>
            </h2>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-light max-w-sm">
              Premium bedsheets, comforters and everyday home essentials you'll love.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button className="bg-[#b35c52] hover:bg-brand-rose text-white px-7 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition shadow-sm cursor-pointer">
                Shop Now →
              </button>
              <button className="bg-transparent hover:bg-white text-brand-dark border border-brand-dark/20 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition cursor-pointer">
                New Arrivals
              </button>
            </div>
          </div>

          <div className="md:col-span-7 flex justify-center md:justify-end">
            <div className="rounded-t-full overflow-hidden border-[10px] border-white shadow-xl max-w-md w-full aspect-[4/5] bg-brand-beige/20">
              <img 
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80" 
                alt="Abha Creations Premium Bedding Showcase" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION STRIP --- */}
      <div className="bg-white border-b border-brand-beige/40 py-5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            { icon: "🍃", title: "Premium Quality", desc: "Soft & Durable Fabrics" },
            { icon: "🏺", title: "Beautiful Designs", desc: "For Every Home" },
            { icon: "✨", title: "Carefully Curated", desc: "With Love" },
            { icon: "🚚", title: "Fast & Reliable", desc: "Pan India Delivery" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 text-left border-r last:border-0 border-brand-beige/50 px-2">
              <span className="text-xl bg-brand-cream p-2 rounded-full">{item.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-brand-dark tracking-wide">{item.title}</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SHOP COLLECTIONS SECTION --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isAdmin && (
          <section className="mb-10 rounded-3xl border border-brand-beige/30 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-brand-dark">Admin Collection Editor</h4>
                <p className="text-[11px] text-gray-500 mt-1">
                  Logged-in admin can update the flashcard images for all collection items.
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-brand-rose/20 bg-brand-cream px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-brand-rose transition hover:bg-brand-rose/10"
              >
                Sign out of admin
              </button>
            </div>
            <div className="grid gap-4 mt-6 md:grid-cols-2">
              {collections.map((item, idx) => (
                <div key={item.name} className="rounded-3xl border border-brand-beige/30 bg-brand-cream p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-brand-dark font-semibold">{item.name}</div>
                  <div className="mt-3 w-full rounded-2xl border border-brand-beige/40 bg-white px-4 py-3 text-sm outline-none focus:border-brand-rose">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border">
                        {item.image ? (
                          // preview either URL or object URL
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[11px] text-gray-400">Empty</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block text-[11px] text-gray-600">Upload image file</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files && e.target.files[0];
                            if (f) {
                              const url = URL.createObjectURL(f);
                              updateCollectionImage(idx, url);
                            }
                          }}
                          className="mt-2 text-sm"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => updateCollectionImage(idx, '')}
                            type="button"
                            className="rounded-full px-3 py-1 text-xs bg-white border border-red-200 text-red-600"
                          >
                            Delete
                          </button>
                          <input
                            type="text"
                            value={item.image}
                            onChange={(event) => updateCollectionImage(idx, event.target.value)}
                            placeholder="Or paste image URL"
                            className="flex-1 rounded-2xl border border-brand-beige/40 bg-white px-3 py-2 text-sm outline-none"
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-gray-500">Upload a file from your PC or paste an image URL. Uploaded files are previewed locally (not persisted).</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="collections" className="w-full text-center mb-16">
          <h3 className="text-2xl font-serif text-brand-dark tracking-wide">Shop Our Collections</h3>
          <div className="w-12 h-[1px] bg-brand-rose mx-auto mt-2 mb-10"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {collections.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-brand-beige/40 p-2.5 group">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-brand-cream relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                  />
                </div>
                <div className="text-center pt-3 pb-1">
                  <h4 className="font-serif font-medium text-brand-dark text-sm md:text-base">{cat.name}</h4>
                  <p className="text-[11px] text-brand-rose font-medium tracking-wider mt-0.5 group-hover:underline cursor-pointer">
                    Explore →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- BRAND STORY --- */}
        <section className="w-full bg-[#fcf9f5] border border-brand-beige/30 rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center my-16">
          <div className="space-y-4 max-w-md">
            <h3 className="text-2xl font-serif italic text-brand-dark">About Abha Creations 🍃</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-light">
              We believe every home tells a story. Our collections are thoughtfully chosen to bring comfort, warmth and elegance to your everyday life.
            </p>
            <p className="text-xs font-semibold text-brand-rose tracking-wide pt-2">
              Thank you for supporting a small business. ❤️
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl overflow-hidden shadow-sm aspect-square bg-white border p-1 transform rotate-3 translate-y-2">
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=300&q=80" alt="Detail 2" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm aspect-square bg-white border p-1 transform -rotate-1">
              <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=300&q=80" alt="Detail 3" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm aspect-square bg-white border p-1 transform translate-y-1">
              <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=300&q=80" alt="Detail 4" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section className="w-full py-4">
          <h3 className="text-xl font-serif text-center text-brand-dark tracking-wide mb-8">Loved by Our Customers</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              {
                name: 'Shreya Mehta ',
                text: 'I recently purchased three bedsheets from Abha Creations and was truly impressed by the quality. The fabric is soft, comfortable, and premium, and the 3D-look bedsheets for my kids\' room were my favourite.',
                featured: true,
              },
              { name: 'Neha S.', text: 'The bedsheet quality is amazing! So soft and the print is beautiful.' },
              { name: 'Priyanka M.', text: 'Comforter is lightweight yet so warm. Perfect for winters!' },
              { name: 'Anjali K.', text: 'Super fast delivery and such cute packing. Loved it! 💕' },
            ].map((user, i) => (
              <div
                key={i}
                className={`border p-5 rounded-2xl shadow-sm flex flex-col justify-between items-start ${
                  user.featured
                    ? 'bg-gradient-to-br from-brand-cream to-white border-brand-rose ring-2 ring-brand-rose/30 shadow-md'
                    : 'bg-white border-brand-beige/50'
                }`}
              >
                <div>
                  <div className="text-amber-400 text-xs tracking-tighter mb-3">★★★★★</div>
                  <p className="text-gray-600 text-xs italic leading-relaxed">"{user.text}"</p>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-2 border-t border-brand-beige/30 w-full">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-brand-cream flex items-center justify-center text-[10px] font-semibold text-brand-dark">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-brand-dark">— {user.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-[#cc8277] text-white mt-16 border-t border-brand-beige/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6 text-center md:text-left items-center text-xs tracking-wide">
          
          <a 
            href="https://wa.me/919830000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 group hover:opacity-90 transition py-2"
          >
            <span className="text-lg bg-white/20 p-2 rounded-full group-hover:scale-105 transition">💬</span>
            <div>
              <p className="font-bold uppercase tracking-wider text-[10px] text-white/80">Need Help?</p>
              <p className="text-white font-medium mt-0.5">Chat with us on WhatsApp</p>
            </div>
          </a>

          <div className="flex items-center justify-center gap-3 py-2 border-y md:border-y-0 md:border-x border-white/10">
            <span className="text-lg bg-white/20 p-2 rounded-full">🎁</span>
            <div>
              <p className="font-bold uppercase tracking-wider text-[10px] text-white/80">Secure Packaging</p>
              <p className="text-white font-medium mt-0.5">Packed with care, always</p>
            </div>
          </div>

          <a 
            href="https://instagram.com/abha.creations" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-end gap-3 group hover:opacity-90 transition py-2"
          >
            <span className="text-lg bg-white/20 p-2 rounded-full group-hover:scale-105 transition">📸</span>
            <div>
              <p className="font-bold uppercase tracking-wider text-[10px] text-white/80 text-center md:text-right">Follow Us</p>
              <p className="text-white font-medium mt-0.5">@abha.creations</p>
            </div>
          </a>

        </div>
        <div className="w-full bg-black/5 text-[10px] text-white/60 text-center py-3 border-t border-white/5">
          © {new Date().getFullYear()} Abha Creations. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}