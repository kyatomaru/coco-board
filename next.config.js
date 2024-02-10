/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
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
