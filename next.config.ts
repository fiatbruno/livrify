import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep /books/new URLs: Turbopack panics if the app route segment folder is literally named `new`
     (it tries to read that path as a file while bundling CSS). The page lives under `add`. */
  // async rewrites() {
  //   return [{ source: "/books/new", destination: "/books/add" }];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
    ],
  },
};

export default nextConfig;
