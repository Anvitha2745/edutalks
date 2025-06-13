
import type {NextConfig} from 'next';

// Define the PWA plugin and its configuration
const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // fallbacks: {
  //   document: '/offline', // if you want to fallback to a custom page
  // }
};

const withPWA = require("@ducanh2912/next-pwa").default(pwaConfig);

const nextAppConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// Conditionally apply the PWA wrapper.
// In development (when NODE_ENV is 'development'), Turbopack will use nextAppConfig directly.
// In production, withPWA(nextAppConfig) will be used.
const finalConfig = process.env.NODE_ENV === 'production' ? withPWA(nextAppConfig) : nextAppConfig;

export default finalConfig;
