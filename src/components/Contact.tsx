import { motion } from 'motion/react';
import { Phone, MapPin, MessageSquare, Mail, Send } from 'lucide-react';

export default function Contact() {
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
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-8"
            >
              Ready to Drive Your <br />
              <span className="text-gray-500">Dream Car?</span>
            </motion.h2>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Call Us</h4>
                  <p className="text-xl font-bold text-white">06 61 29 49 81</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Visit Showroom</h4>
                  <p className="text-xl font-bold text-white">86 Avenue Al Mohit Al Hadi, Rabat</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Email Us</h4>
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
            className="bg-brand-black p-10 rounded-[2.5rem] border border-white/10"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-brand-light-grey border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+212 ..."
                    className="w-full bg-brand-light-grey border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Interested In</label>
                <select className="w-full bg-brand-light-grey border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none">
                  <option>Select a Vehicle</option>
                  <option>BMW X5</option>
                  <option>Mercedes G63</option>
                  <option>Porsche 911</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-brand-light-grey border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                ></textarea>
              </div>

              <button className="w-full group flex items-center justify-center gap-2 bg-white text-brand-black py-5 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all">
                Send Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-500 text-sm mb-4">Or contact us directly via</p>
                <a
                  href="https://wa.me/212661294981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-bold hover:text-gray-300 transition-colors"
                >
                  <MessageSquare size={20} />
                  WhatsApp Support
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
