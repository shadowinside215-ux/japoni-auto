import React, { useState, useEffect } from 'react';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Shield, LogOut, Plus, Trash2, Edit2, Upload, Save, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Car } from '@/src/data/cars';

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Cloudinary Upload Widget
  const openUploadWidget = (callback: (url: string) => void) => {
    // @ts-ignore
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    // @ts-ignore
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert('Cloudinary credentials are not configured. Please add them to your environment variables.');
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if admin
        if (currentUser.email === 'dragonballsam86@gmail.com') {
          setIsAdmin(true);
          // Sync user to firestore
          await setDoc(doc(db, 'users', currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email,
            role: 'admin'
          }, { merge: true });
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubscribeCars = onSnapshot(collection(db, 'cars'), (snapshot) => {
      const carsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
      setCars(carsData);
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
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSaveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;

    try {
      if (isAdding) {
        await addDoc(collection(db, 'cars'), {
          ...editingCar,
          createdAt: serverTimestamp()
        });
      } else if (editingCar.id) {
        await updateDoc(doc(db, 'cars', editingCar.id), {
          ...editingCar,
          updatedAt: serverTimestamp()
        });
      }
      setEditingCar(null);
      setIsAdding(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'cars');
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      await deleteDoc(doc(db, 'cars', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'cars');
    }
  };

  const handleUpdateLogo = async (url: string) => {
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        logoUrl: url,
        updatedAt: serverTimestamp()
      }, { merge: true });
      setLogoUrl(url);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/global');
    }
  };

  if (loading) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-white">Loading...</div>;

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-center">
        <Shield size={64} className="text-white mb-6" />
        <h1 className="text-4xl font-display font-bold text-white mb-4">Admin Access</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          This area is restricted to authorized personnel only. Please sign in with your admin account.
        </p>
        <button
          onClick={handleLogin}
          className="bg-white text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all"
        >
          Sign in with Google
        </button>
        <a href="/" className="mt-8 text-gray-500 hover:text-white transition-colors">Back to Website</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Dealership Management</h1>
            <p className="text-gray-400">Welcome back, {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Logo Management */}
          <div className="lg:col-span-1">
            <div className="bg-brand-grey p-8 rounded-3xl border border-white/5">
              <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <ImageIcon size={20} />
                Showroom Logo
              </h2>
              <div className="aspect-square bg-brand-black rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden mb-6">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-gray-600">No logo uploaded</span>
                )}
              </div>
              <button
                onClick={() => openUploadWidget(handleUpdateLogo)}
                className="w-full flex items-center justify-center gap-2 bg-white text-brand-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                <Upload size={18} />
                Upload New Logo
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Recommended: PNG with transparent background
              </p>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="lg:col-span-2">
            <div className="bg-brand-grey p-8 rounded-3xl border border-white/5">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-display font-bold">Inventory ({cars.length})</h2>
                <button
                  onClick={() => {
                    setEditingCar({
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
                    setIsAdding(true);
                  }}
                  className="flex items-center gap-2 bg-white text-brand-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200"
                >
                  <Plus size={16} />
                  Add Car
                </button>
              </div>

              <div className="space-y-4">
                {cars.map(car => (
                  <div key={car.id} className="flex items-center gap-4 bg-brand-black p-4 rounded-2xl border border-white/5">
                    <img src={car.images[0]} alt="" className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h4 className="font-bold">{car.name}</h4>
                      <p className="text-sm text-gray-500">{car.price} • {car.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCar(car);
                          setIsAdding(false);
                        }}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} className="text-gray-400" />
                      </button>
                      <button
                        onClick={() => car.id && handleDeleteCar(car.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {editingCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-brand-grey w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-white/10 p-8 md:p-12"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-display font-bold">
                  {isAdding ? 'Add New Vehicle' : 'Edit Vehicle'}
                </h2>
                <button onClick={() => setEditingCar(null)} className="text-gray-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveCar} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Car Name</label>
                    <input
                      required
                      value={editingCar.name || ''}
                      onChange={e => setEditingCar({...editingCar, name: e.target.value})}
                      className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Price</label>
                    <input
                      required
                      value={editingCar.price || ''}
                      onChange={e => setEditingCar({...editingCar, price: e.target.value})}
                      className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Year</label>
                    <input
                      type="number"
                      value={editingCar.year || ''}
                      onChange={e => setEditingCar({...editingCar, year: parseInt(e.target.value)})}
                      className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Mileage</label>
                    <input
                      value={editingCar.mileage || ''}
                      onChange={e => setEditingCar({...editingCar, mileage: e.target.value})}
                      className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Description</label>
                  <textarea
                    rows={4}
                    value={editingCar.description || ''}
                    onChange={e => setEditingCar({...editingCar, description: e.target.value})}
                    className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-3 text-white resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Images</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {editingCar.images?.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...(editingCar.images || [])];
                            newImages.splice(i, 1);
                            setEditingCar({...editingCar, images: newImages});
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
                        setEditingCar({...editingCar, images: [...(editingCar.images || []), url]});
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
                    onClick={() => setEditingCar(null)}
                    className="px-8 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
