import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Gauge, Fuel, ArrowRight, Edit2, Trash2 } from 'lucide-react';
import { Car } from '@/src/data/cars';
import { useAdmin } from '../context/AdminContext';
import { doc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import CarForm from './CarForm';

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      if (car.id) {
        await deleteDoc(doc(db, 'cars', car.id));
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'cars');
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <>
      <motion.div
        layoutId={`car-${car.id}`}
        onClick={() => onClick(car)}
        className="group bg-brand-grey rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500 relative"
      >
        {/* Admin Edit/Delete Buttons Hidden as per user request */}
        {/* 
        {isAdmin && (
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-white/10 backdrop-blur-md text-white p-2 rounded-full border border-white/10 hover:bg-white/20 transition-all"
              title="Edit Car"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500/20 backdrop-blur-md text-red-500 p-2 rounded-full border border-red-500/20 hover:bg-red-500/40 transition-all"
              title="Delete Car"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
        */}

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

      <AnimatePresence>
        {isEditing && (
          <CarForm car={car} onClose={() => setIsEditing(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

