// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add geojson to the list of asset extensions
config.resolver.assetExts.push("geojson");

module.exports = config;
