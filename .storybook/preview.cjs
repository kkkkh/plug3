import { app }from "@storybook/vue3"
import ElementPlus from "element-plus"
import '../src/style/tailwind.css'
import 'element-plus/dist/index.css'

app.use(ElementPlus)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}