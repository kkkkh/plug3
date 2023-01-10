const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
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
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  babel: async (options) => ({
    // Update your babel configuration here
    ...options,
  }),
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })
    config.plugins.push(require('unplugin-vue-components/webpack')({
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
    }))
    return config
  },
}