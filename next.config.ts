
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
  allowedDevOrigins: [
    'http://9000-firebase-studio-1749402915609.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev',
    'http://6000-firebase-studio-1749402915609.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev'
  ],
};

// Conditionally apply the PWA wrapper.
// In development (when NODE_ENV is 'development'), Turbopack will use nextAppConfig directly.
// In production, withPWA(nextAppConfig) will be used.
const finalConfig = process.env.NODE_ENV === 'production' ? withPWA(nextAppConfig) : nextAppConfig;

export default finalConfig;

