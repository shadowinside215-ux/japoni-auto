/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarGrid from './components/CarGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CarDetail from './components/CarDetail';
import { Car } from './data/cars';

export default function App() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  return (
    <div className="relative min-h-screen bg-brand-black">
      <Navbar />
      
      <main>
        <Hero />
        <CarGrid onCarSelect={setSelectedCar} />
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

