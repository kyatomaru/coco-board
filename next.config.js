/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    images: {
        domains: ['localhost'], // 画像を置いているドメイン
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './'),
        };

        return config;
    },
}

// const nextConfig = {
//     webpack: (
//         config,
//         // { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
//     ) => {
//         config.externals.push({ canvas: 'commonjs canvas' })
//         return config
//     },
// };


module.exports = nextConfig
