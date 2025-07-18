import type { NextConfig } from "next";
// import i18nConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  // i18n: {
  //   ...i18nConfig.i18n,
  //   localeDetection: false,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
