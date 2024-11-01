const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const customAdditions = ['cjs', 'png', 'svg'];

// Required for Reanimated according to chatGPT
config.resolver.sourceExts = [...config.resolver.sourceExts, ...customAdditions];

module.exports = config;
