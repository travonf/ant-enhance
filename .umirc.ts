import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Ant Enhance',
  description: '基于Antd的增强型组件库',
  favicon: '/images/antd.svg',
  logo: '/images/antd.svg',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  resolve: {
    includes: ['docs'],
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  locales: [['zh-CN', '中文']],
  /**
   * https://github.com/umijs/dumi/blob/master/packages/theme-default/src/style/variables.less
   */
  theme: {
    '@c-primary': '#4569d4',
  },
});
