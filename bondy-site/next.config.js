/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.wearebondy.com' }],
        destination: 'https://wearebondy.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
