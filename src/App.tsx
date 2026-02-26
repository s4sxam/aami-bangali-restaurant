import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, Phone, Leaf, Triangle, Utensils, Fish, Drumstick, ChefHat, CakeSlice, X, Plus, Minus } from 'lucide-react';

type MenuItem = {
  id: string;
  name: string;
  price: number;
  type: 'veg' | 'non-veg';
  desc: string;
};

type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
  items: MenuItem[];
};

const menuData: Category[] = [
  {
    id: 'thalis',
    name: 'Thalis',
    icon: Utensils,
    items: [
      { id: 't1', name: 'Veg Thali Spl', price: 319, type: 'veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 't2', name: 'Egg Thali', price: 350, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 't3', name: 'Katla Fish Thali', price: 375, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 't4', name: 'Mutton Thali', price: 450, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
    ]
  },
  {
    id: 'seafood',
    name: 'Fish & Seafood',
    icon: Fish,
    items: [
      { id: 's1', name: 'Bhetki Paturi', price: 190, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 's2', name: 'Chingri Malaicurry', price: 250, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 's3', name: 'Masala Pomfret', price: 180, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 's4', name: 'Katla Kalia', price: 150, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
    ]
  },
  {
    id: 'chicken',
    name: 'Mutton & Chicken',
    icon: Drumstick,
    items: [
      { id: 'c1', name: 'Mutton Kosha', price: 280, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 'c2', name: 'Chicken Dakbunglow', price: 220, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 'c3', name: 'Chicken Kosha', price: 190, type: 'non-veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
    ]
  },
  {
    id: 'rice',
    name: 'Rice & Pulao',
    icon: ChefHat,
    items: [
      { id: 'r1', name: 'Basanti Pulao', price: 140, type: 'veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 'r2', name: 'Steamed Rice', price: 70, type: 'veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 'r3', name: 'Ghee Bhaat', price: 110, type: 'veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: CakeSlice,
    items: [
      { id: 'd1', name: 'Rosogolla', price: 20, type: 'veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 'd2', name: 'Mishti Doi', price: 40, type: 'veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
      { id: 'd3', name: 'Nolen Gurer Payesh', price: 60, type: 'veg', desc: 'Authentic Bengali preparation with pure mustard oil.' },
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(menuData[0].id);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(c => {
      if (c.item.id === id) {
        return { ...c, quantity: Math.max(0, c.quantity + delta) };
      }
      return c;
    }).filter(c => c.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const activeCategory = menuData.find(c => c.id === activeTab) || menuData[0];
  const ActiveIcon = activeCategory.icon;

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-mustard selection:text-white relative">
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-ivory/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif font-bold text-2xl tracking-tight text-charcoal">
            Aami Bangali
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide uppercase">
            <a href="#" className="hover:text-mustard transition-colors">Home</a>
            <a href="#menu" className="hover:text-mustard transition-colors">Menu</a>
            <a href="#location" className="hover:text-mustard transition-colors">Location</a>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:text-mustard transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-crimson text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 flex flex-col gap-1.5 items-end justify-center w-8 h-8 group">
              <span className="w-6 h-[2px] bg-current transition-all duration-300 ease-in-out group-hover:w-4"></span>
              <span className="w-4 h-[2px] bg-current transition-all duration-300 ease-in-out group-hover:w-6"></span>
              <span className="w-5 h-[2px] bg-current transition-all duration-300 ease-in-out group-hover:w-4"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80" 
            alt="Authentic Indian Food" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-ivory"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold italic text-ivory mb-8 drop-shadow-lg leading-tight">
            The Authentic<br/>Taste of Bengal.
          </h1>
          <a 
            href="#menu" 
            className="inline-block bg-mustard text-charcoal font-semibold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-white hover:text-charcoal transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Explore Menu
          </a>
        </div>
      </section>

      {/* Menu Explorer */}
      <section id="menu" className="py-24 px-6 max-w-5xl mx-auto relative">
        {/* Decorative Glowing Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-5%] left-[-10%] w-96 h-96 bg-mustard/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[30rem] h-[30rem] bg-crimson/5 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center mb-16">
          <p className="text-mustard font-bold tracking-[0.3em] text-xs uppercase mb-4">
            O U R &nbsp; C U L I N A R Y &nbsp; M A P
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-black italic text-charcoal mb-6">
            THE MENU EXPLORER
          </h2>
          <div className="w-24 h-1 bg-mustard mx-auto rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 mb-16 pb-4 justify-start md:justify-center">
          {menuData.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                activeTab === category.id 
                  ? 'bg-charcoal text-ivory border-charcoal shadow-md' 
                  : 'bg-transparent text-charcoal border-charcoal/20 hover:border-charcoal'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <div className="animate-in fade-in duration-500">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 bg-charcoal rounded-2xl flex items-center justify-center shadow-lg">
              <ActiveIcon className="w-6 h-6 text-mustard" />
            </div>
            <h3 className="font-serif text-4xl font-bold italic text-charcoal">
              {activeCategory.name}
            </h3>
          </div>

          <div className="space-y-10">
            {activeCategory.items.map(item => (
              <div 
                key={item.id} 
                className="group cursor-pointer"
                onClick={() => addToCart(item)}
              >
                <div className="flex items-end justify-between mb-2 gap-4">
                  <div className="flex items-center gap-2 shrink-0">
                    <h4 className="font-sans font-bold text-lg md:text-xl uppercase text-charcoal group-hover:text-mustard transition-colors">
                      {item.name}
                    </h4>
                    {item.type === 'veg' ? (
                      <Leaf className="w-4 h-4 text-green-600" />
                    ) : (
                      <Triangle className="w-4 h-4 text-red-600 fill-current" />
                    )}
                  </div>
                  
                  <div className="flex-grow menu-dotted-line h-4 mb-2"></div>
                  
                  <div className="font-sans font-bold text-xl md:text-2xl text-mustard shrink-0">
                    ₹{item.price}
                  </div>
                </div>
                <p className="font-sans text-sm italic text-charcoal/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 px-6 bg-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-mustard font-bold tracking-[0.3em] text-xs uppercase mb-4">
            V I S I T &nbsp; O U R &nbsp; R E S T A U R A N T
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-black italic text-charcoal mb-16">
            FIND US IN KHARAGPUR
          </h2>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl text-left flex flex-col md:flex-row gap-8 items-center md:items-start max-w-3xl mx-auto">
            <div className="w-16 h-24 bg-charcoal rounded-xl flex items-center justify-center shrink-0 shadow-inner">
              <MapPin className="w-8 h-8 text-mustard" />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h3 className="font-sans font-bold text-lg mb-1 text-charcoal uppercase">OUR ADDRESS</h3>
              <p className="text-charcoal/60 mb-4 leading-relaxed text-sm">
                OT Road, Inda, Beside Raipur Electronics,<br/>
                Kharagpur, West Bengal 721301
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold tracking-wider">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-charcoal uppercase">OPEN DAILY — 11:00 AM to 10:30 PM</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-48 shrink-0">
              <a 
                href="https://maps.app.goo.gl/Bd1CSjcrn1p1vMnm7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-charcoal text-white px-6 py-3 rounded-full font-serif italic text-sm hover:bg-mustard hover:text-charcoal transition-colors text-center shadow-md"
              >
                *GET DIRECTIONS*
              </a>
              <a 
                href="tel:+918016679931"
                className="bg-transparent border border-charcoal text-charcoal px-6 py-3 rounded-full font-serif italic text-sm hover:bg-charcoal hover:text-white transition-colors text-center"
              >
                *CALL RESTAURANT*
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-ivory/60 py-12 px-6 text-sm text-center">
        <p>© {new Date().getFullYear()} Aami Bangali Restaurant. All rights reserved.</p>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-ivory h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-charcoal/10 flex justify-between items-center">
              <h2 className="font-serif text-2xl font-bold italic text-charcoal">Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-crimson transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-charcoal/50 mt-10 italic">
                  Your cart is empty.
                </div>
              ) : (
                cart.map(c => (
                  <div key={c.item.id} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-charcoal">{c.item.name}</h4>
                      <div className="text-crimson font-medium">₹{c.item.price}</div>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full shadow-sm border border-charcoal/5">
                      <button onClick={() => updateQuantity(c.item.id, -1)} className="hover:text-crimson"><Minus className="w-4 h-4" /></button>
                      <span className="font-medium w-4 text-center">{c.quantity}</span>
                      <button onClick={() => updateQuantity(c.item.id, 1)} className="hover:text-green-600"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-charcoal/10">
                <div className="flex justify-between items-center mb-6 text-lg font-bold text-charcoal">
                  <span>Total</span>
                  <span className="text-crimson text-2xl">₹{cartTotal}</span>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={clearCart}
                    className="px-6 py-3 rounded-full border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white transition-colors font-medium"
                  >
                    Clear
                  </button>
                  <button className="flex-grow bg-mustard text-charcoal font-bold uppercase tracking-wider py-3 rounded-full hover:bg-crimson hover:text-white transition-colors shadow-lg">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
