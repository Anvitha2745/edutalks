
import type {NextConfig} from 'next';

const nextAppConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // Temporarily set to true for diagnostics
  },
  eslint: {
    ignoreDuringBuilds: false, // Set to false to surface ESLint errors
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

// PWA related code has been fully removed for build diagnosis.
// If PWA functionality is needed later, it will need to be re-introduced carefully.
const finalConfig = nextAppConfig;

export default finalConfig;
