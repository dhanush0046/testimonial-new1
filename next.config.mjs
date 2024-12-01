// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint:{
//     ignoreDuringBuilds:true,
//   },
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'my-testimonials-bucket.s3.amazonaws.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

// next.config.mjs
//import i18nConfig from './next-i18next.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-testimonials-bucket.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'my-testimonials-bucket.s3.amazonaws.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           { key: 'Access-Control-Allow-Credentials', value: 'true' },
//           { key: 'Access-Control-Allow-Origin', value: '*' },
//           { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
//           { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
//         ],
//       },
//     ]
//   },
//   webpack(config) {
//     config.experiments = {
//       ...config.experiments,
//       asyncWebAssembly: true,
//     };
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       fs: false,
//       path: false,
//     };
//     return config;
//   },
// };

// export default nextConfig;

