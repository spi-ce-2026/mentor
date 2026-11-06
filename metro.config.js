const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@mentorias/auth": path.resolve(__dirname, "packages/auth"),
};

// Adiciona a pasta packages/ ao watchFolders para o Metro recarregar
// quando os arquivos de @mentorias/auth mudarem durante o desenvolvimento
config.watchFolders = [path.resolve(__dirname, "packages")];

module.exports = config;
