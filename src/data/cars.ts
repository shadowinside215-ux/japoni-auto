export interface Car {
  id: string;
  name: string;
  year: number;
  price: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  engine: string;
  power: string;
  images: string[];
  description: string;
  features: string[];
}

export const cars: Car[] = [
  {
    id: '1',
    name: 'BMW X5 xDrive40i',
    year: 2022,
    price: '780,000 DH',
    mileage: '24,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '3.0L I6',
    power: '335 hp',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'A pristine BMW X5 with full options, M Sport package, and low mileage. Perfectly maintained and ready for its next owner.',
    features: ['M Sport Package', 'Panoramic Sunroof', 'Harman Kardon Sound', '360 Camera', 'Leather Interior']
  },
  {
    id: '2',
    name: 'Mercedes-Benz G63 AMG',
    year: 2021,
    price: '2,150,000 DH',
    mileage: '15,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '4.0L V8 Biturbo',
    power: '577 hp',
    images: [
      'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'The ultimate off-road luxury icon. This G63 AMG comes in a stunning matte black finish with red interior accents.',
    features: ['Night Package', 'Burmester Surround Sound', 'Massage Seats', 'Carbon Fiber Trim', '22-inch AMG Wheels']
  },
  {
    id: '3',
    name: 'Porsche 911 Carrera S',
    year: 2023,
    price: '1,450,000 DH',
    mileage: '5,000 km',
    fuelType: 'Petrol',
    transmission: 'PDK',
    engine: '3.0L Flat-6',
    power: '443 hp',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Experience the pure joy of driving with this nearly new 911 Carrera S. Finished in GT Silver with black leather interior.',
    features: ['Sport Chrono Package', 'Sport Exhaust System', 'Bose Sound System', 'PASM Sport Suspension', 'LED Matrix Headlights']
  },
  {
    id: '4',
    name: 'Audi RS6 Avant',
    year: 2020,
    price: '1,100,000 DH',
    mileage: '38,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '4.0L V8 TFSI',
    power: '591 hp',
    images: [
      'https://images.unsplash.com/photo-1606148632339-99ee17400aa1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'The perfect blend of family practicality and supercar performance. This RS6 is fully loaded and meticulously maintained.',
    features: ['Carbon Ceramic Brakes', 'Dynamic Package Plus', 'Valcona Leather', 'RS Sports Exhaust', 'Virtual Cockpit']
  },
  {
    id: '5',
    name: 'Range Rover Sport SVR',
    year: 2019,
    price: '850,000 DH',
    mileage: '52,000 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engine: '5.0L V8 Supercharged',
    power: '575 hp',
    images: [
      'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1542362567-b055002b976b?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'A beast on the road. This SVR features the signature carbon fiber hood and a sound that turns heads everywhere.',
    features: ['Carbon Fiber Exterior Pack', 'Meridian Signature Sound', 'Soft Close Doors', 'Heated & Cooled Seats', 'Head-up Display']
  },
  {
    id: '6',
    name: 'Land Rover Defender 110',
    year: 2022,
    price: '920,000 DH',
    mileage: '12,000 km',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engine: '3.0L D300',
    power: '296 hp',
    images: [
      'https://images.unsplash.com/photo-1618245472463-b32f6c06660e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1609527791661-8f3f97183121?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'The modern reincarnation of an icon. This Defender 110 is ready for both city luxury and off-road adventure.',
    features: ['Explorer Pack', 'Air Suspension', 'ClearSight Rear View', 'Meridian Sound', 'Black Exterior Pack']
  }
];
