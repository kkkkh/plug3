import Datamap from './index.vue';
import Icon from '@/components/icon/index.vue';
import { colData,rowData,lineData } from "./data/data";
import {ref} from "vue"

export default {
  title: 'chart/jsplumb/datamap',
  component: Datamap,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  //   onClick: {},
  //   size: {
  //     control: { type: 'select' },
  //     options: ['small', 'medium', 'large'],
  //   },
  // },
};

export const Col = (args:unknown) => ({
    components: {
      Datamap,
      Icon,
    },
  setup () {
    const datamap = ref()
    const dataSet = ()=>{
      const nodes = colData.map((item,index) => ({
        id:item.data_map_category_id,
        parentId:item.parent_dgov_category_id,
        name:item.cn_name,
        icon:item.icon,
        sort:index + 1,
        type:item.node_type,
        level:item.level,
        mode: item.inside_array_mode_cd,
        space: item.category_space,
        spaceUnit: item.category_space_unit,
        color: item.color,
      }))
      datamap.value.handleSetNodes(nodes)
      datamap.value.handleSetLines(lineData)
    }
    return {
      datamap,
      dataSet,
    }
  },
  template: `
    <el-button
      type="primary" 
      @click="dataSet">
      set
    </el-button>
    <datamap ref="datamap">
      <template #icon="{node}">
        <icon :icon="node.icon" width="30px" height="30px" :style="{fill:node.color}"></icon>
      </template>
    </datamap> 
  `
})

export const Row = () => ({
  components: {
    Datamap,
    Icon,
  },
setup () {
  const datamap = ref()
  const dataSet = ()=>{
    const nodes = rowData.map((item,index) => ({
      id:item.data_map_category_id,
      parentId:item.parent_dgov_category_id,
      name:item.cn_name,
      icon:item.icon,
      sort:index + 1,
      type:item.node_type,
      level:item.level,
      mode: item.inside_array_mode_cd,
      space: item.category_space,
      spaceUnit: item.category_space_unit,
      color: item.color,
    }))
    datamap.value.handleSetNodes(nodes)
    datamap.value.handleSetLines(lineData)
  }
  return {
    datamap,
    dataSet,
  }
},
template: `
  <el-button
    type="primary" 
    @click="dataSet">
    set
  </el-button>
  <datamap ref="datamap">
    <template #icon="{node}">
      <icon :icon="node.icon" width="30px" height="30px" :style="{fill:node.color}"></icon>
    </template>
  </datamap> 
`
})