<template>
  <li
    data-el-collection-item=""
    aria-disabled="false"
    :class="{
      'is-disabled': disabled,
      'el-dropdown-menu__item': true,
    }"
    tabindex="-1"
    role="menuitem"
    @mouseover="(el) => el.target.focus()"
    @mouseleave="(el) => el.target.blur()"
    @click="handle"
  >
    <slot></slot>
  </li>
</template>
<script setup lang="ts">
  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false,
    },
  })
  const emits = defineEmits(['click'])
  const handle = () => {
    if (!props.disabled) {
      // debugger
      emits('click')
    }
  }
</script>
