/**
 * ScrollToHero Component
 *
 * Front-end Guidelines:
 * - Handles smooth scrolling to the hero section on mount.
 * - Uses native DOM methods to scroll to the #hero element.
 * - UI/UX: Ensures users are brought to the hero section after navigation or action.
 *
 * Back-end Follow-through:
 * - No direct back-end integration, but ensure any links or redirects that require hero scroll are coordinated with front-end.
 */
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