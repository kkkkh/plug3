<template>
  <div class="map-title" v-if="level === 1">
    <div></div>
    <div></div>
    <span class="map-title-text">{{ title }}</span>
    <map-title-icon
      class="map-title-icon-right"
      :color="color"
      :id="id"
    ></map-title-icon>
    <map-title-icon
      class="map-title-icon-left"
      :color="color"
      :id="id"
    ></map-title-icon>
    <!-- <ej-icon
      class="map-title-icon-center"
      icon="map-title-center"
      width="189"
      height="24"
      :color="color"
    ></ej-icon> -->
    <!-- <img :src="icon"/> -->
    <!-- <div class="map-title-border">
      <div></div>
      <div></div>
      <div></div>
    </div> -->
  </div>
  <div class="map-title-else" v-else>
    <span>{{ title }}</span>
  </div>
</template>
<script lang="ts">
  export default {name: 'mapTitle'}
</script>
<script setup lang="ts">
  import MapTitleIcon from "./title-icon.vue"
  defineProps({
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    level: {
      type: Number,
      default: 2,
    },
  })
</script>
<style lang="scss">
@use "sass:math";
$border-width: 120px;
.map-title-else {
  width: 100%;
  min-width: $border-width;
  color: v-bind(color);
}
.map-title {
  width: 100%;
  min-width: $border-width;
  height: 30px;
  position: relative;
  color: v-bind(color);
  .map-title-icon-right {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(math.div($border-width, 2) + 20px);
  }
  .map-title-icon-left {
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: rotate3d(0, 1, 0, 180deg)
      translateX(math.div($border-width, 2) + 20px);
    // transform: translateX($border-width/2 + 20px);
  }
  .map-title-text {
    position: absolute;
    font-size: 16px;
    left: 50%;
    z-index: 11;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .map-title-icon-center {
    position: absolute;
    // width: 100%;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    z-index: 9;
  }
  div {
    position: absolute;
    width: calc((100% - 189px) / 2);
    height: 3px;
    min-width: 60px;
    &:nth-child(1) {
      top: 6px;
      left: 50%;
      transform: translateX(93px);
      background: linear-gradient(to right, v-bind(color), #fff);
    }
    &:nth-child(2) {
      top: 6px;
      right: 50%;
      transform: translateX(-93px);
      background: linear-gradient(to left, v-bind(color), #fff);
    }
  }
}
</style>
