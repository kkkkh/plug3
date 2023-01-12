<template>
  <template v-for="(it, index) in data" :key="index">
    <!-- 根节点 -->
    <div
      v-if="it.type === 'layer'"
      :class="['flex', layout(it.mode)]"
    >
      <map-module
        v-if="it.children && it.children.length"
        :data="it.children"
        :mode="it.mode"
        @line="line"
      >
      <template #icon="{node}">
        <slot name="icon" :node="node"></slot>
      </template>
    </map-module>
    </div>
    <div
      :class="[
        'flex flex-col',
        mode === 'row' ? 'flex-grow-0 flex-shrink-0 mb-2 mx-1' : 'w-full mb-2',
      ]"
      v-else-if="
        it.type === 'category'
      "
      :id="it.id"
      :style="[
        spaceStyle(
          mode, //除根节点外，其他节点的宽、高，由父节点的布局来决定
          it.space,
          it.spaceUnit,
        ),
      ]"
      @click.stop="line(it)"
    >
      <div class="overflow-hidden mb-2">
        <map-title
          :title="it.name"
          :color="it.color"
          :level="it.level"
          :id="it.id"
        ></map-title>
      </div>
      <div
        v-if="it.children && it.children.length"
        :class="[
          'p-4 flex flex-grow  rounded',
          layout(it.mode),
          isALLCategory(it.children) ? '':'content-start' 
        ]"
        :style="[colorStyle(it.level, it.color)]"
      >
        <map-module
          :data="it.children"
          :mode="it.mode"
          @line="line"
          >
            <template #icon="{node}">
              <slot name="icon" :node="node"></slot>
            </template>
        </map-module>
      </div>
      <div
        v-else
        class="flex justify-center p-4 flex-grow rounded items-center text-gray-500"
        :style="[noDatacolorStyle(it.color)]"
      >
        <span>暂无数据</span>
      </div>
    </div>
    <div
      v-else
    >
      <div :id="it.id"
      :style = "{
        // border:`1px solid ${it.color}`,
        width:'70px',
      }"
      :class="[
        'flex flex-col items-center overflow-hidden m-1 p-1 rounded',
      ]"
      
      @click.stop="line(it)"
      @mouseenter="handleNodeMouseenter(it)"
      @mouseleave="handleNodeMouseleave(it)"
      >
      <!-- <img :src="url(it.icon)" :style="{
        height: '30px',
        width: '30px',
        filter: `drop-shadow(${it.color} 80px 0)`,
        transform: 'translateX(-80px)',
        }"/> -->
        <slot name="icon" :node="it"></slot>
      <!-- <ej-icon
        :style="{height: '30px',width: '30px',color: it.color}"
        :icon="it.icon"
      /> -->
      <div class="data-map-text text-xs mt-2" :style="{color:it.color}">
        <span>{{it.name}}</span>
      </div>
      </div>
      <!-- <span class="text-xs mt-2" :style="{color:it.color,'line-height':'12px'}">{{it.name}}</span> -->
    </div>
  </template>
  <!-- <data-set @handleEnter="handleEnter" :system="it" /> -->
</template>
<script lang="ts">
  export default {name: 'mapModule'}
</script>
<script setup lang="ts">
  import MapModule from './moule.vue'
  import MapTitle from './title.vue'
  import {NodeType} from './type/index'
  import {colorRgb} from "@/utils/color"
  interface ComponentProps {
    data: any[],
    mode?: string,
  }
  withDefaults(defineProps<ComponentProps>(), {})
  const emit = defineEmits(['line','enter','leave'])
  const line = (it:NodeType) => {
    emit('line', it)
  }
  const handleNodeMouseenter = (it:NodeType) => {
    emit('enter', it)
  }
  const handleNodeMouseleave = (it:NodeType) => {
    emit('leave', it)
  }
  const isALLCategory = (data:Record<string,unknown>[])=>{
    return data.every(item => item.type === 'category')
  }
  const layout = (mode:string) => {
    return mode === 'row' ? 'flex-row flex-wrap' : 'flex-col items-start'
    // return mode === 'row' ? 'flex-row flex-wrap' : 'flex-col items-center'
  }
  const spaceStyle = (mode:string, space:string, unit:number) => {
    const unitVal = unit === 1 ? '%' : 'px'
    const margin = '8px'
    return mode === 'row'
      ? {
        width: `calc(${space}${unitVal} - ${margin})`,
      }
      : {
        'min-height': `${space}${unitVal}`,
      }
  }
  const colorStyle = (level:number, color:string) => {
    return level === 1
      ? {
        border: `2px solid ${colorRgb(color, 0.5)}`,
      }
      : {
        'background-color': colorRgb(color, 0.1),
      }
  }
  const noDatacolorStyle = (color:string) => {
    return {
      'background-color': colorRgb(color, 0.1),
    }
  }

</script>
<style lang="scss">
.data-map-text{
  display: -webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  overflow:hidden;
  word-break: break-all;
  line-height:12px;
  text-align: center;
}
</style>
