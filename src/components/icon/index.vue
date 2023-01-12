<template>
    <svg v-if="hasIcon" class="ej-icon">
      <use v-bind="useAttrs" />
    </svg>
  </template>
  
  <script setup lang="ts">
    import {computed} from 'vue'
    import icons from './icons.svg'
    interface Props {
      icon: string
      width?: string
      height?: string
    }
    const props = withDefaults(defineProps<Props>(), {
      icon: '',
      width: '24px',
      height: '24px',
    })
    const useAttrs = computed(() => ({
      'xlink:href': props.icon.indexOf('#') > 0 ? props.icon : `${icons}#${props.icon}`,
    }))
    const hasIcon = computed(() => Boolean(props.icon))
    const width = computed(() => toCssSize(props.width))
    const height = computed(() => toCssSize(props.height))
    const  toCssSize = (val: number | string): string =>  {
        if (typeof val !== 'number' && typeof val !== 'string') {
            throw 'toCssSize type must be a number or a string'
        }
        const value = Number(val)
        return Number.isNaN(value) ? String(val) : value + 'px'
    }
  </script>
  
  <style lang="postcss">
    .ej-icon {
      width: v-bind(width);
      height: v-bind(height);
    }
  </style>
  