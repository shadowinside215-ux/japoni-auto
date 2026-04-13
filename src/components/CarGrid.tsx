import { motion } from 'motion/react';
import CarCard from './CarCard';
import { cars, Car } from '@/src/data/cars';

interface CarGridProps {
  onCarSelect: (car: Car) => void;
}

export default function CarGrid({ onCarSelect }: CarGridProps) {
  return (
    <section id="inventory" className="py-24 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4 block"
            >
              Exclusive Inventory
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white"
            >
              Featured Vehicles
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-md"
          >
            Explore our curated selection of high-performance and luxury vehicles, 
            each inspected to meet our rigorous standards of quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CarCard car={car} onClick={onCarSelect} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
