import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageSquare, Globe, LogIn, LogOut, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { cn } from '@/src/lib/utils';

export default function Navbar({ logoUrl }: { logoUrl?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { isAdmin, user, login, logout } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openUploadWidget = (callback: (url: string) => void) => {
    // @ts-ignore
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    // @ts-ignore
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert('Cloudinary credentials are not configured.');
      return;
    }

    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ['local', 'url'],
        multiple: false,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          callback(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  const handleUpdateLogo = async (url: string) => {
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        logoUrl: url,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/global');
    }
  };

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.inventory'), href: '#inventory' },
    { name: t('nav.whyUs'), href: '#why-us' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'ar', name: 'AR' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-brand-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <div className="relative group">
              <img src={logoUrl} alt="Japoni Auto" className="h-10 w-auto object-contain" />
              {isAdmin && (
                <button
                  onClick={() => openUploadWidget(handleUpdateLogo)}
                  className="absolute -bottom-2 -right-2 bg-white text-brand-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Change Logo"
                >
                  <Upload size={12} />
                </button>
              )}
            </div>
          ) : (
            <div className="relative group flex items-center gap-2">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
                <span className="text-brand-black font-bold text-xl">J</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-display font-bold text-lg tracking-tight">JAPONI AUTO</span>
                <span className="text-gray-400 text-[10px] tracking-[0.2em] uppercase">Rabat</span>
              </div>
              {isAdmin && (
                <button
                  onClick={() => openUploadWidget(handleUpdateLogo)}
                  className="absolute -bottom-2 -right-2 bg-white text-brand-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Upload Logo"
                >
                  <Upload size={12} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-3 border-l border-white/10 pl-8">
            <Globe size={14} className="text-gray-500" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={cn(
                  "text-xs font-bold transition-colors",
                  i18n.language === lang.code ? "text-white" : "text-gray-500 hover:text-gray-300"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={logout}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all",
                  isAdmin ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "text-gray-400 hover:text-white"
                )}
                title={isAdmin ? "Admin Logged In" : "Sign Out"}
              >
                <LogOut size={16} />
                {isAdmin ? "Admin" : "Sign Out"}
              </button>
            ) : (
              <button
                onClick={login}
                className="text-gray-400 hover:text-white transition-colors"
                title="Admin Login"
              >
                <LogIn size={20} />
              </button>
            )}

            <a
              href="https://wa.me/212661294981"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-brand-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              <MessageSquare size={16} />
              {t('hero.whatsapp')}
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex gap-3 mr-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={cn(
                  "text-xs font-bold",
                  i18n.language === lang.code ? "text-white" : "text-gray-500"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-grey border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 text-red-500 font-bold py-2"
                >
                  <LogOut size={20} />
                  {isAdmin ? "Admin Logout" : "Sign Out"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    login();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 text-white font-bold py-2"
                >
                  <LogIn size={20} />
                  Admin Login
                </button>
              )}
              
              <a
                href="https://wa.me/212661294981"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-brand-black py-3 rounded-lg font-bold"
              >
                <MessageSquare size={20} />
                {t('hero.whatsapp')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


