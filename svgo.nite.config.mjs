const svgoNiteConfig = {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: false,
  },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          cleanupIds: false,
          collapseGroups: false,
          convertPathData: false,
          convertShapeToPath: false,
          mergePaths: false,
          removeHiddenElems: false,
          removeUnknownsAndDefaults: {
            keepDataAttrs: true,
          },
          removeUselessDefs: false,
        },
      },
    },
    "removeDimensions",
  ],
};

export default svgoNiteConfig;
