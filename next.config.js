/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.googletagservices.com https://www.google-analytics.com https://*.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.google-analytics.com; img-src 'self' data: https: https://www.googletagmanager.com https://*.google-analytics.com;"
          }
        ]
      }
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' }
    ]
  }
};
module.exports = nextConfig;
