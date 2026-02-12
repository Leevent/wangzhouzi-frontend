'use client';

import { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors z-40"
      aria-label="回到頂部"
    >
      <ChevronUpIcon className="h-6 w-6" />
    </button>
  );
}
