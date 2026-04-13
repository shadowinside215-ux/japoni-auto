import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Benjelloun',
    role: 'Business Owner',
    content: 'The best car buying experience I have had in Morocco. Transparent, professional, and the car was exactly as described.',
    rating: 5
  },
  {
    name: 'Sara El Amrani',
    role: 'Executive',
    content: 'Japoni Auto Rabat is the place to go if you are looking for serious sellers. No time wasted, just pure professionalism.',
    rating: 5
  },
  {
    name: 'Youssef Mansouri',
    role: 'Car Enthusiast',
    content: 'Exceptional inventory. I found my dream Porsche here and the process was incredibly smooth. Highly recommended.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 block"
          >
            Client Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-grey p-8 rounded-3xl border border-white/5 relative group"
            >
              <Quote className="absolute top-6 right-8 text-white/5 group-hover:text-white/10 transition-colors" size={60} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-white text-white" />
                ))}
              </div>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>

              <div>
                <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm uppercase tracking-wider">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
