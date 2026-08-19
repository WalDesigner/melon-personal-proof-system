/** @type {import('next').NextConfig} */
const nextConfig = {
  // This site has no server-side API or secret. Exporting static files keeps the
  // interview site independent from Cloud Run compute quotas and cold starts.
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
};

module.exports = nextConfig;
