/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    const legacyPages = [
      "/projects/:path*",
      "/experience/:path*",
      "/contributions/:path*",
      "/skills/:path*",
      "/blogs/:path*",
      "/community/:path*",
      "/contact/:path*",
      "/resume/:path*",
      "/profile-img.jpg",
      "/logo.png",
      "/next.svg",
      "/vercel.svg",
    ];

    return legacyPages.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

module.exports = nextConfig;
