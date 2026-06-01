// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
// remove the watchFolders and unstable_enableSymlinks lines

// Add geojson to the list of asset extensions
config.resolver.assetExts.push("geojson");

module.exports = config;
