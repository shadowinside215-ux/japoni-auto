import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Car } from '@/src/data/cars';

interface CarDetailProps {
  car: Car | null;
  onClose: () => void;
}

export default function CarDetail({ car, onClose }: CarDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  if (!car) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-brand-black overflow-y-auto"
        >
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
                <h2 className="text-xl font-display font-bold text-white">{car.name}</h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-white">{car.price}</span>
                <a
                  href={`https://wa.me/212661294981?text=I'm interested in the ${car.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-2 bg-white text-brand-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  <MessageSquare size={18} />
                  {t('carDetail.inquireNow')}
                </a>
              </div>
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: Gallery */}
              <div className="space-y-6">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden group">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={car.images[currentImageIndex]}
                    alt={car.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {car.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        currentImageIndex === idx ? 'border-white' : 'border-transparent opacity-50'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>

                <div className="bg-brand-grey p-8 rounded-3xl border border-white/5">
                  <h3 className="text-xl font-display font-bold text-white mb-6">{t('carDetail.specs')}</h3>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                    {[
                      { label: t('inventory.year'), value: car.year },
                      { label: t('inventory.mileage'), value: car.mileage },
                      { label: t('inventory.fuel'), value: car.fuelType },
                      { label: 'Transmission', value: car.transmission },
                      { label: 'Engine', value: car.engine },
                      { label: 'Power', value: car.power },
                    ].map((spec) => (
                      <div key={spec.label} className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500 text-sm">{spec.label}</span>
                        <span className="text-white font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Info & Form */}
              <div className="space-y-10">
                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{car.name}</h1>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {car.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {car.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                        <CheckCircle2 size={16} className="text-white" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-grey p-8 rounded-3xl border border-white/5">
                  <h3 className="text-xl font-display font-bold text-white mb-6">{t('carDetail.interested')}</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={t('carDetail.name')}
                        className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                      />
                      <input
                        type="tel"
                        placeholder={t('carDetail.phone')}
                        className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                      />
                    </div>
                    <select className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 appearance-none">
                      <option>{t('carDetail.payment')}</option>
                      <option>{t('carDetail.cash')}</option>
                      <option>{t('carDetail.financing')}</option>
                    </select>
                    <select className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 appearance-none">
                      <option>{t('carDetail.when')}</option>
                      <option>{t('carDetail.immediately')}</option>
                      <option>{t('carDetail.week')}</option>
                      <option>{t('carDetail.month')}</option>
                    </select>
                    <button className="w-full bg-white text-brand-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all">
                      {t('carDetail.send')}
                    </button>
                    <a
                      href={`https://wa.me/212661294981?text=I'm interested in the ${car.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 border-2 border-white/10 text-white py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all"
                    >
                      <MessageSquare size={20} />
                      {t('carDetail.chat')}
                    </a>
                  </form>
                </div>

                <div className="p-6 border border-white/10 rounded-3xl flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-brand-light-grey flex items-center justify-center text-white font-bold text-xl">
                    JA
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Japoni Auto Rabat</h4>
                    <p className="text-gray-500 text-sm">Official Showroom • Rabat, Morocco</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

