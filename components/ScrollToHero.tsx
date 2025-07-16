'use client';
import { useEffect } from 'react';

export default function ScrollToHero() {
  useEffect(() => {
    const el = document.getElementById('hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return null;
} 