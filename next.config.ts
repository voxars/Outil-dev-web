import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour le déploiement
  output: 'standalone',
  
  // Configuration des images si nécessaire
  images: {
    unoptimized: true,
  },
  
  // Configuration pour les sous-domaines ou chemins personnalisés
  basePath: process.env.BASE_PATH || '',
  
  // Configuration pour les domaines externes si nécessaire
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
