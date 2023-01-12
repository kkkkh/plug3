const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const Components = require('unplugin-vue-components/vite')
const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite" // 这里使用了vite，webpack不生效
  },
  "features": {
    "storyStoreV7": true
  },
  viteFinal: async (config, { configType }) => {
    // console.log("config",config)
    config.resolve.alias['~'] = path.resolve(__dirname, '../src')
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    config.plugins.push(Components({
      dts: path.resolve(__dirname, '../components.d.ts'),
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }))
    // console.log("config",config)
    return config
  }
  // webpackFinal: async (config, { configType }) => {
  //   config.resolve.alias['~'] = path.resolve(__dirname, '../src')
  //   config.plugins.push(require('unplugin-vue-components/webpack')({
  //     resolvers: [
  //       ElementPlusResolver({
  //         importStyle: false,
  //       }),
  //     ],
  //   }))
  //   return config
  // },
}