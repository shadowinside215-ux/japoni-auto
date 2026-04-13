/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarGrid from './components/CarGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CarDetail from './components/CarDetail';
import { Car, cars as initialCars } from './data/cars';

function HomePage({ cars, logoUrl }: { cars: Car[], logoUrl: string }) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="relative min-h-screen bg-brand-black">
      <Navbar logoUrl={logoUrl} />
      
      <main>
        <Hero />
        <CarGrid cars={cars} onCarSelect={setSelectedCar} />
        <Features />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <CarDetail 
        car={selectedCar} 
        onClose={() => setSelectedCar(null)} 
      />
    </div>
  );
}

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const unsubscribeCars = onSnapshot(collection(db, 'cars'), (snapshot) => {
      if (snapshot.empty) {
        setCars(initialCars);
      } else {
        const carsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
        setCars(carsData);
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'cars'));

    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        setLogoUrl(snapshot.data().logoUrl || '');
      }
    });

    return () => {
      unsubscribeCars();
      unsubscribeSettings();
    };
  }, []);

  return (
    <AdminProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<HomePage cars={cars} logoUrl={logoUrl} />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}


