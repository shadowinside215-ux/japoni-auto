import { motion } from 'motion/react';
import { ShieldCheck, BadgeCheck, Zap, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'High-Quality Vehicles',
    description: 'Every car in our showroom undergoes a rigorous multi-point inspection process.'
  },
  {
    icon: BadgeCheck,
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprises. We provide clear, honest pricing on every vehicle.'
  },
  {
    icon: Zap,
    title: 'Fast & Easy Process',
    description: 'From viewing to ownership, we streamline every step for a seamless experience.'
  },
  {
    icon: HeartHandshake,
    title: 'Serious Sellers Only',
    description: 'We curate our inventory from trusted sources to ensure maximum reliability.'
  }
];

export default function Features() {
  return (
    <section id="why-us" className="py-24 px-6 bg-brand-grey relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 block"
          >
            The Japoni Standard
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            We don't just sell cars; we provide a premium automotive experience 
            built on trust, quality, and exceptional service.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-brand-black transition-all duration-500 border border-white/10 group-hover:border-white">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
