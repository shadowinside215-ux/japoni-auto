import { motion } from 'motion/react';
import { Phone, MapPin, MessageSquare, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 px-6 bg-brand-grey">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 block"
            >
              {t('contact.badge')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-8"
            >
              {t('contact.title')} <br />
              <span className="text-gray-500">{t('contact.subtitle')}</span>
            </motion.h2>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-1">{t('contact.callUs')}</h4>
                  <p className="text-xl font-bold text-white">06 61 29 49 81</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-1">{t('contact.visit')}</h4>
                  <p className="text-xl font-bold text-white">86 Avenue Al Mohit Al Hadi, Rabat</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-1">{t('contact.email')}</h4>
                  <p className="text-xl font-bold text-white">contact@japoniauto.ma</p>
                </div>
              </div>
            </div>

            {/* Embedded Map Placeholder */}
            <div className="w-full h-64 bg-brand-light-grey rounded-3xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.260844222625!2d-6.85!3d33.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU4JzEyLjAiTiA2wrA1MScwMC4wIlc!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-black p-10 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <MessageSquare size={40} className="text-green-500" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-4">{t('contact.whatsappTitle')}</h3>
            <p className="text-gray-400 mb-8 max-w-sm">
              {t('contact.whatsappDesc')}
            </p>
            <a
              href="https://wa.me/212661294981"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group flex items-center justify-center gap-3 bg-green-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-green-500 transition-all"
            >
              <MessageSquare size={24} />
              {t('contact.chatNow')}
            </a>
            <p className="mt-6 text-gray-500 font-medium">{t('contact.available')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

