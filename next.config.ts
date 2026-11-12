import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/team/**", search: "" },
      // CMS uploads, streamed from Cloudflare R2 by Payload.
      { pathname: "/api/media/file/**" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withPayload(nextConfig);
