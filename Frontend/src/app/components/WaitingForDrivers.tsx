'use client';

import { useEffect, useState } from 'react';

export default function DriverLoading() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-xl font-bold text-pink-600">Searching for Drivers{dots}</h2>
        <div className="my-4 flex justify-center">
          <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <button 
        onClick={() => window.location.reload()}
        className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition">Cancel</button>
      </div>
    </div>
  );
}