module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    })
  },
  resolver: {
    platforms: ['ios', 'android'],
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs']
  }
};
