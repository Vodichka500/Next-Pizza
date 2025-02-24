import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.dodostatic.net',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dodostatic.net'
            }
        ],
    },

};

export default nextConfig;
