<template>
  <aside class="wikixia-layout-sider" :style="style">
    <div class="drag"></div>
    <slot></slot>
    <div class="drag1"></div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi';
import { useCssRender } from '../../../hooks';

interface Props {
  /** fixed布局的层级 */
  zIndex?: number;
  /** 宽度 */
  width?: number;
  /** 顶部内边距 */
  paddingTop?: number;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡时间 */
  transitionTimingFunction?: string;
}
const props = withDefaults(defineProps<Props>(), {
  zIndex: 1002,
  width: 300,
  paddingTop: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
});
const { cssRender } = useCssRender();
const style = computed(() => {
  const { zIndex, width, paddingTop, transitionDuration, transitionTimingFunction } = props;
  return `z-index: ${zIndex};width: ${width}px;
	padding-top: ${paddingTop}px;transition-duration: ${transitionDuration}ms;
	transition-timing-function: ${transitionTimingFunction};`;
});
// css
cssRender('.wikixia-layout-sider', {
  position: 'fixed',
  left: 0,
  top: 0,
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  transitionProperty: 'all'
});
</script>
<style>
.drag {
  position: absolute;
  width: 4px;
  height: 100%;
  right: -2px;
  cursor: w-resize;
  background-color: #ee22ee;
}
.drag1 {
  position: absolute;
  /* z-index: 2000; */
  width: 14px;
  height: 100%;
  left: -2px;
  top: 60px;
  cursor: w-resize;
  background-color: #9035ff;
}

.drag:hover {
  background-color: #0054c9;
  transition: all 0.5s;
}
</style>
