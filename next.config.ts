import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export', // enables next export
  trailingSlash: true, // helpful for GitHub Pages
  images: { unoptimized: true }, // disable image optimization for export
  // basePath can be set if deploying under a subpath; for user site, root is fine
};

export default nextConfig;
