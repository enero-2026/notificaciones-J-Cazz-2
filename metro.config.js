const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /node_modules\/react-native\/src\/private\/components\/virtualview\/.*/,
];

module.exports = config;