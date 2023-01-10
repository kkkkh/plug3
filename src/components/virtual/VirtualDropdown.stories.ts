import VirtualMore from './more.vue';
import VirtualDropdown from './dropdown.vue';
import VirtualDropdownItem from './dropdownItem.vue';
import { ArrowDown } from '@element-plus/icons-vue'
import {virtualHandle} from './index'
import {ref} from "vue"

export default {
  title: 'Components/VirtualDropdown',
  component: VirtualDropdown,
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
      VirtualDropdown,
      VirtualDropdownItem,
    },
  setup () {
    const rVirtualRef =ref()
    const handle = (target: string) => {
      console.log(target)
    }
    return {
      rVirtualRef,
      handle,
    }
  },
  template: `
    <el-button
      ref="rVirtualRef"
      type="primary">
      操作
    </el-button>
    <virtual-dropdown
    :virtual-ref="rVirtualRef" 
    :attrs="{
      placement:'bottom',
      hideAfter:200,
    }">
      <virtual-dropdown-item @click="handle('detail')">
        详情
      </virtual-dropdown-item>
      <virtual-dropdown-item @click="handle('edit')">
        编辑
      </virtual-dropdown-item>
      <virtual-dropdown-item @click="handle('delete')">
        删除
      </virtual-dropdown-item>
    </virtual-dropdown>
  `
})
export const TableSort = ()=>({
  components: {
    VirtualDropdown,
    VirtualDropdownItem,
    ArrowDown,
  },
  setup () {
    const {currData, currIndex, trigger, virtualRef, refMaps} = virtualHandle()
    const handleTransRow = (target: string) => {
      console.log(currData.value)
      console.log(currIndex.value)
    }
    const data = ref([{}])
    return {
      data,
      refMaps,
      virtualRef,
      trigger,
      handleTransRow,
    }
  },
  template: `
    <el-table :data="data">
      <el-table-column label="操作" align="center">
        <template #default="{row, $index}">
          <el-button
            :ref="el => (refMaps[$index] = el)"
            type="primary" 
            link 
            size="small"
            @mouseover="(e)=> trigger(row,$index)" 
            >
              更多<el-icon><ArrowDown/></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <virtual-dropdown
      :virtual-ref="virtualRef"
    >
      <virtual-dropdown-item @click="handleTransRow('top')">
        此行置顶
      </virtual-dropdown-item>
      <virtual-dropdown-item @click="handleTransRow('prev')">
        上移一行
      </virtual-dropdown-item>
      <virtual-dropdown-item @click="handleTransRow('next')">
        下移一行
      </virtual-dropdown-item>
      <virtual-dropdown-item @click="handleTransRow('bottom')">
        此行置底
      </virtual-dropdown-item>
    </virtual-dropdown>
  `
})
export const TableMore = () => ({
  components: {
    VirtualDropdown,
    VirtualDropdownItem,
    VirtualMore,
    ArrowDown,
  },
  setup () {
    const {currData, currIndex, trigger, virtualRef, refMaps} = virtualHandle()
    const handleCancelCheckout = (row:Record<string,unknown>) => {
      console.log(row)
      console.log(currData.value)
      console.log(currData.value === row)
      console.log(currIndex.value)
    }
    const handleDelete = (row:Record<string,unknown>) => {
      console.log(row)
      console.log(currData.value)
      console.log(currData.value === row)
      console.log(currIndex.value)
    }
    const handleCancelDelete = (row:Record<string,unknown>) => {
      console.log(row)
      console.log(currData.value)
      console.log(currData.value === row)
      console.log(currIndex.value)
    }
    const handleForceCheckIn = (row:Record<string,unknown>) => {
      console.log(row)
      console.log(currData.value)
      console.log(currData.value === row)
      console.log(currIndex.value)
    }
    const handleForceCheckout = (row:Record<string,unknown>) => {
      console.log(row)
      console.log(currData.value)
      console.log(currData.value === row)
      console.log(currIndex.value)
    }
    const data = ref([{}])
    return {
      data,
      refMaps,
      virtualRef,
      ArrowDown,
      trigger,
      handleCancelCheckout,
      handleDelete,
      handleCancelDelete,
      handleForceCheckIn,
      handleForceCheckout,
    }
  },
  template: `
    <el-table :data="data">
      <el-table-column label="操作" align="center">
        <template #default="{row, $index}">
          <el-button
            :ref="el => (refMaps[$index] = el)"
            type="primary" 
            link 
            size="small"
            @mouseover="(e)=> trigger(row,$index)">
              更多<el-icon><ArrowDown/></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <virtual-more
      :virtual-ref="virtualRef"
      @cancelCheckout="handleCancelCheckout(currData)"
      @delete="handleDelete(currData)"
      @cancelDel="handleCancelDelete(currData)"
      @forceCheckin="handleForceCheckIn(currData)"
      @forceCancelCheckout="handleForceCheckout(currData)">
    >
    </virtual-more>
  `,
})