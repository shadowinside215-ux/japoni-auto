import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Save, Plus } from 'lucide-react';
import { doc, addDoc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Car } from '../data/cars';

interface CarFormProps {
  car?: Partial<Car> | null;
  onClose: () => void;
  isAdding?: boolean;
}

export default function CarForm({ car, onClose, isAdding = false }: CarFormProps) {
  const [formData, setFormData] = useState<Partial<Car>>(car || {
    name: '',
    price: '',
    year: new Date().getFullYear(),
    images: [],
    description: '',
    features: [],
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '',
    power: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isAdding) {
        await addDoc(collection(db, 'cars'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      } else if (formData.id) {
        // Use setDoc with merge: true instead of updateDoc
        // This handles the case where we're editing initial mock data that hasn't been saved to Firestore yet
        await setDoc(doc(db, 'cars', formData.id), {
          ...formData,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }
      onClose();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'cars');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-brand-black/90 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-brand-grey w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-white/10 p-8 md:p-12"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white">
            {isAdding ? 'Add New Vehicle' : 'Edit Vehicle'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Car Name</label>
              <input
                required
                value={formData.name || ''}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Price</label>
              <input
                required
                value={formData.price || ''}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Year</label>
              <input
                type="number"
                value={formData.year || ''}
                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Mileage</label>
              <input
                value={formData.mileage || ''}
                onChange={e => setFormData({...formData, mileage: e.target.value})}
                className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Description</label>
            <textarea
              rows={4}
              value={formData.description || ''}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Images</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images?.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...(formData.images || [])];
                      newImages.splice(i, 1);
                      setFormData({...formData, images: newImages});
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => openUploadWidget((url) => {
                  setFormData({...formData, images: [...(formData.images || []), url]});
                })}
                className="aspect-square bg-brand-black border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-white/30 hover:text-white transition-all"
              >
                <Plus size={24} />
                <span className="text-xs mt-2">Add Image</span>
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-white text-brand-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save Vehicle
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 bg-white/5 border border-white/10 rounded-xl font-bold text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
