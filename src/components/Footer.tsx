import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
                <span className="text-brand-black font-bold text-xl">J</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-display font-bold text-lg tracking-tight">JAPONI AUTO</span>
                <span className="text-gray-400 text-[10px] tracking-[0.2em] uppercase">Rabat</span>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed mb-8">
              The premier destination for luxury and high-performance vehicles in Rabat. 
              We pride ourselves on our curated selection and exceptional customer service.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-brand-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Inventory', 'Why Us', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Inventory</h4>
            <ul className="space-y-4">
              {['Luxury Sedans', 'Performance SUVs', 'Sports Cars', 'Electric Vehicles', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <a href="#inventory" className="text-gray-500 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-gray-500 mb-6">Subscribe to get notified about our latest arrivals.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-brand-light-grey border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-white text-brand-black px-4 rounded-lg font-bold text-sm">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Japoni Auto Rabat. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
