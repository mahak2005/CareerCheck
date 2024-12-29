/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/data/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, max-age=0',
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  
  