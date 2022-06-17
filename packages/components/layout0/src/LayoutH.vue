<template>
  <header class="xia-layout-header" :style="style">
    <slot></slot>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCssRender } from '../../../hooks';

interface Props {
  /** 开启fixed布局 */
  fixed?: boolean;
  /** fixed布局的层级 */
  zIndex?: number;
  /** 最小宽度 */
  minWidth?: number;
  /** 高度 */
  height?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡时间 */
  transitionTimingFunction?: string;
}
const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  zIndex: 1001,
  minWidth: 1200,
  height: 48,
  paddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
});
const { cssRender } = useCssRender();
const style = computed(() => {
  return `
	position: absolute;
	width: 100%;
	min-width: 500px;
	height: 56px;
	`;
});
// css
</script>
<style>
.xia-layout-header {
  position: absolute;
  width: 100%;
  min-width: 500px;
  height: 56px;
}
</style>
