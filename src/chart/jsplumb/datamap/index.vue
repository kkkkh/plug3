<template>
  <div v-if="treeData.length">
    <datamap-module :data="treeData" @line="line" @enter="enter" @leave="leave">
      <template #icon="{node}">
        <slot name="icon" :node="node"></slot>
      </template>
    </datamap-module>
  </div>
  <div class="flex justify-center" v-else>暂无数据地图</div>
</template>
<script lang="ts">
  export default {name: 'dataMap'}
</script>
<script setup lang="ts">
  import {onMounted, nextTick, ref, onBeforeUnmount} from 'vue'
  import DatamapModule from './moule.vue'
  import {jsPlumb, Defaults} from 'jsplumb'
  import {toTreeData} from '~/utils/toTree'
  import {NodeType,LineType,JsPlumbInstanceType,SelectType,ConnectionType} from './type/index'
  // import data from './data/dataCol'
  // import data from './data/dataRow'
  // import lines from './data/lines'
  import {jsPlumbConfig} from "./data/config"
  import {emitHandle} from "./hooks/index"
  const emit = defineEmits(['line','enter','leave'])
  const {enter, leave, line:emitLine} = emitHandle(emit)
  let plumbIns:null | JsPlumbInstanceType = null
  const treeData = ref<NodeType[]>([])
  const lineData = ref<LineType[]>([])
  const strokeColor = 'rgba(19,114,240,0.9)'
  const props = defineProps({
    jsPlumbConfig:{
      type:Object,
      default:()=>(jsPlumbConfig())
    }
  })

  const line = (node:NodeType) => {
    clear()
    nextTick(() => {
      if (Array.isArray(lineData.value) && lineData.value.length > 0){
        const showLines = lineData.value.filter(
          (item) =>
            item.source === node.id ||
            item.target === node.id,
        )
        for (const {
          source,
          target,
          weight,
        } of showLines) {
          const connection = plumbIns?.connect({
            source,
            target,
          }) as ConnectionType
          const select = plumbIns?.select({source, target}) as SelectType
          // test1
          // select.addOverlay(['Arrow', {width: 10, length: 10, location: 40, id}])
          // test2
          // select.addOverlay(['Custom', {create: ()=>{
          //   const d = document.createElement('div')
          //   d.className = 'datamap-spot'
          //   d.style['width']  = weight * 2 + 'px'
          //   d.style['height']  = weight + 'px'
          //   return d
          // }, location: 0, id}])
          select?.setPaintStyle({
            strokeWidth: weight,
            stroke: strokeColor,
          })
          // debugger
          setTimeout(()=>{
            const canvas = connection?.canvas
            const {width, height} = canvas
            const third = Math.hypot(width.baseVal.value, height.baseVal.value)
            const child = canvas.children[0]
            const dPath = child.getAttribute('d')
            const time = Math.ceil(0.4 * third / 100) + 's'
            const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            ellipse.setAttribute('class', 'datamap-spot')
            ellipse.style['offsetPath']  = `path('${dPath}')`
            ellipse.style['animation']  = `datamap-move ${time} linear infinite`
            ellipse.setAttribute('cx', '0')
            ellipse.setAttribute('cy', '0')
            ellipse.setAttribute('rx', `${ Math.ceil(weight + 5) / 2 }`)
            ellipse.setAttribute('ry', `${ Math.ceil(weight + 5) / 2 }`)
            ellipse.setAttribute('fill', '#00FFF6')
            g.setAttribute('transform', child.getAttribute('transform')!)
            child.setAttribute('transform', 'translate(0,0)')
            g.append(child, ellipse)
            canvas.append(g)
          }, 100)
        }
        const endpoints = plumbIns?.selectEndpoints()
        endpoints?.setEnabled(false)
      }
      emitLine(node)
    })
  }
  onBeforeUnmount(()=>{
    clear()
  })
  const clear = () => {
    const spots = document.getElementsByClassName('datamap-spot')
    for (let i = spots.length - 1;i < spots.length && spots.length > 0;){
      spots[i].remove()
    }
    // debugger
    if (plumbIns){
      plumbIns.deleteEveryConnection()
      plumbIns.deleteEveryEndpoint()
    } 
  }
  const handleSetNodes = (data:NodeType[] | undefined) => {
    if (Array.isArray(data)){
      const root = data.find(i => i.type === 'layer')
      if (root){
        treeData.value = toTreeData(data, {
          id:'id',
          parentId:'parentId',
          name:'name',
          rootId: root.parentId,
          icon:'icon',
          sort:true,
        })
      }
    }
  }
  const handleSetLines = (data: []) => {
    clear()
    lineData.value = data
  }
  onMounted(() => {
    plumbIns = jsPlumb.getInstance(props.jsPlumbConfig) as JsPlumbInstanceType
  })
  // handleSetNodes(data)
  // handleSetLines(lines)
  defineExpose({
    handleSetNodes,
    handleSetLines,
  })
</script>
<style lang="postcss">
.datamap-spot{
  /* offset-path: path("M 843 1987 C 571.5 841 571.5 841 0 -5"); */
  /* animation: move 10s linear infinite; */
  /* width:10px; */
  /* height:10px; */
  background:#00FFF6;
  /* position: absolute; */
  offset-rotate: auto;
  offset-anchor: auto;
  border-radius: 4px;
  /* filter: drop-shadow(0px 0px 4px rgba(0,255,246,0.6)); */
  filter: drop-shadow(0px 0px 6px #00FFF6);
  /* box-shadow: 0px 0px 4px rgba(0,255,246,0.6); */
}
@keyframes datamap-move {
  /* 之前语法 */
  /* 100% {
    motion-offset: 100%;
  } */
  /* 当前规范语法 */
  0%{
    offset-distance: 2%;
  }
  100% {
    offset-distance: 98%;
  }
}
.datamap-dot{
    z-index: 1000;
}
</style>
