import VirtualTooltip from './tooltip.vue';
import {virtualHandle} from './index'
import {ref} from "vue"

export default {
  title: 'Components/VirtualTooltip',
  component: VirtualTooltip,
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

export const Base = (args:unknown) => ({
    components: {
      VirtualTooltip,
    },
  setup () {
    const rVirtualRef =ref()
    return {
      rVirtualRef
    }
  },
  template: `
    <el-button
      ref="rVirtualRef"
      type="primary">
      test
    </el-button>
      <virtual-tooltip 
      :virtual-ref="rVirtualRef" 
      :attrs="{
        placement:'bottom',
        hideAfter:200,
      }">
        <template #content>
          test
        </template>
      </virtual-tooltip>
  `
})


export const Table = ()=>({
  components: {
    VirtualTooltip,
  },
  setup () {
    const {currData, currIndex, trigger, virtualRef, refMaps} = virtualHandle()
    const handleTransRow = (target: string) => {
      console.log(currData.value)
      console.log(currIndex.value)
    }
    const data = ref([{
      name:'111'
    }])
    return {
      data,
      refMaps,
      virtualRef,
      currData,
      trigger,
      handleTransRow,
    }
  },
  template: `
    <el-table :data="data">
      <el-table-column label="name">
        <template #default="{row, $index}">
          <el-button
            :ref="el => (refMaps[$index] = el)"
            type="primary" 
            link 
            size="small"
            @mouseover="(e)=> trigger(row,$index)" 
            >
              {{row.name}}</el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <virtual-tooltip
      :virtual-ref="virtualRef"
    >
      <template #content>
        name：{{currData.name}}
      </template>
    </virtual-dropdown>
  `
})