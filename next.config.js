/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:1323/api/:path*",
            },
        ];
    },
};
  
module.exports = nextConfig;