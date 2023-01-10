<template>
  <el-tooltip
    v-bind="attributes"
    :virtual-ref="virtualRef"
    virtual-triggering
  >
    <template #content>
      <slot name="content"></slot>
    </template>
  </el-tooltip>
</template>

<script lang="ts">
export default {
  name: 'VirtualTooltip',
}
</script>
<script setup lang="ts">
  import {computed} from 'vue'
  const defaultAttrs = () => ({
    placement: 'bottom',
    trigger: 'hover',
  })
  const props = defineProps({
    virtualRef: {
      type: Object,
      default: ()=>({}),
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
  })
  const attributes = computed(() => {
    return {...defaultAttrs(), ...props.attrs}
  })
</script>
