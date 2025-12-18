/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ["import"],
  },
};
