import { motion } from 'motion/react';
import { Calendar, Gauge, Fuel, ArrowRight } from 'lucide-react';
import { Car } from '@/src/data/cars';

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  return (
    <motion.div
      layoutId={`car-${car.id}`}
      onClick={() => onClick(car)}
      className="group bg-brand-grey rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.images[0]}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
            {car.year}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-display font-bold text-white group-hover:text-gray-300 transition-colors">
              {car.name}
            </h3>
            <p className="text-gray-400 text-sm">{car.transmission}</p>
          </div>
          <span className="text-lg font-bold text-white whitespace-nowrap">
            {car.price}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-6">
          <div className="flex flex-col gap-1">
            <Calendar size={14} className="text-gray-500" />
            <span className="text-xs text-gray-300 font-medium">{car.year}</span>
          </div>
          <div className="flex flex-col gap-1">
            <Gauge size={14} className="text-gray-500" />
            <span className="text-xs text-gray-300 font-medium">{car.mileage}</span>
          </div>
          <div className="flex flex-col gap-1">
            <Fuel size={14} className="text-gray-500" />
            <span className="text-xs text-gray-300 font-medium">{car.fuelType}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-2">
            View Details <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
