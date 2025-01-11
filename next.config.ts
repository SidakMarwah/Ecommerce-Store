import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ['sidak-next-ecommerce.s3.amazonaws.com'] // Add your S3 bucket domain here

    // images.domains propety is deprecated, so we are using images.remtePatterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sidak-next-ecommerce.s3.amazonaws.com" // Use "**" for all hostname(s)
      },
    ],
  }
};

export default nextConfig;
