import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import CarCard from './CarCard';
import CarForm from './CarForm';
import { Car } from '@/src/data/cars';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../context/AdminContext';

interface CarGridProps {
  cars: Car[];
  onCarSelect: (car: Car) => void;
}

export default function CarGrid({ cars, onCarSelect }: CarGridProps) {
  const { t } = useTranslation();
  const { isAdmin } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);

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
              {t('inventory.badge')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-white"
            >
              {t('inventory.title')}
            </motion.h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-md md:text-right"
            >
              {t('inventory.description')}
            </motion.p>
            {isAdmin && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 bg-white text-brand-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg"
              >
                <Plus size={20} />
                Add New Car
              </motion.button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car.id || index}
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

      <AnimatePresence>
        {isAdding && (
          <CarForm isAdding onClose={() => setIsAdding(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

