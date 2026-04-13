import { Facebook, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

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
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/Japoni-Auto/100057140602796/?locale=fr_FR#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-brand-black transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {[
                { name: t('nav.home'), href: '#' },
                { name: t('nav.inventory'), href: '#inventory' },
                { name: t('nav.whyUs'), href: '#why-us' },
                { name: t('nav.contact'), href: '#contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-500 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t('footer.inventory')}</h4>
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
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t('footer.newsletter')}</h4>
            <p className="text-gray-500 mb-6">{t('footer.newsletterDesc')}</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-brand-light-grey border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-white text-brand-black px-4 rounded-lg font-bold text-sm">
                {t('footer.join')}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Japoni Auto Rabat. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">{t('footer.terms')}</a>
            <a href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-white text-sm transition-colors">
              <Shield size={14} />
              {t('nav.admin')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

