/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      // Redirect non-www to www for canonical consistency
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "mijnpensioengevuld.nl",
          },
        ],
        destination: "https://www.mijnpensioengevuld.nl/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
