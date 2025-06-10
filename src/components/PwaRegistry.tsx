
"use client";

import { useEffect } from 'react';

export default function PwaRegistry() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox;
      // Add event listeners for PWA lifecycle events.
      // wb.addEventListener('installed', event => { console.log(`Event ${event.type} is triggered.`) });
      // wb.addEventListener('controlling', event => { console.log(`Event ${event.type} is triggered.`) });
      // wb.addEventListener('activated', event => { console.log(`Event ${event.type} is triggered.`) });
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return null; // This component does not render anything
}
