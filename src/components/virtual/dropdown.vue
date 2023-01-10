<template>
  <virtual-tooltip
    :virtual-ref="virtualRef"
    :attrs="attrsComputed"
  >
    <template #content>
      <div class="el-scrollbar">
        <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
          <div class="el-scrollbar__view el-dropdown__list" style="">
            <ul
              class="el-dropdown-menu"
              tabindex="-1"
              role="menu"
              style="outline: none"
            >
              <slot name="dropdownItem" />
              <slot></slot>
              <slot name="dropItem"></slot>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </virtual-tooltip>
</template>
<script setup lang="ts">
  import VirtualTooltip from './tooltip.vue'
  import {computed} from "vue"
  const props = defineProps({
    attrs: {
      type: Object,
      default: () => ({}),
    },
    virtualRef: {
      type: Object,
      default: () => ({}),
    },
  })
  const attrsComputed = computed(()=>{
    return {
      placement: 'bottom',
      popperClass: 'is-pure is-light el-dropdown__popper',
      hideAfter: 500,
      ...props.attrs,
    }
  })
</script>
