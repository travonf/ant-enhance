export default {
  esm: {
    type: 'babel',
  },
  cjs: {
    type: 'babel',
  },
  /*
  umd: {
    name: 'ante',
    globals: {
      react: 'React',
    },
    minFile: true,
  },
 */
  extractCSS: true,
  lessInBabelMode: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
