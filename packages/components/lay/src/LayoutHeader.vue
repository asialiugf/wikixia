<template>
  <div class="" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCssRender } from '../../../hooks';

interface Props {
  /** 开启fixed布局 */
  position?: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  top?: number | 'auto';
  left?: number | 'auto';
  right?: number | 'auto';
  bottom?: number | 'auto';
  /** fixed布局的层级 */
  zIndex?: number | 'auto';
  /** 最小宽度 */
  width?: number | 'auto';
  /** 高度 */
  height?: number | 'auto';
  /** 左侧内边距 */
  paddingLeft?: number | 'auto';
  /** 动画过渡时间 */
  transitionDuration?: number | 'auto';
  /** 动画过渡时间 */
  transitionTimingFunction?: string;
}
const props = withDefaults(defineProps<Props>(), {
  position: 'relative',
  top: 'auto',
  left: 'auto',
  right: 'auto',
  bottom: 'auto',
  zIndex: 1001,
  width: 1200,
  height: 48,
  paddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
});

// const { cssRender } = useCssRender();
const style = computed(() => {
  const {
    position,
    top,
    left,
    right,
    bottom,
    zIndex,
    width,
    height,
    paddingLeft,
    transitionDuration,
    transitionTimingFunction
  } = props;

  let Top: string;
  let Left: string;

  if (top === 'auto') {
    Top = top;
  } else {
    Top = `${top}px`;
  }

  if (left === 'auto') {
    Left = left;
  } else {
    Left = `${left}px`;
  }

  const Right = right === 'auto' ? right : `${right}px`;
  const Bottom = bottom === 'auto' ? bottom : `${bottom}px`;

  return `
	  position: ${position};
		top: ${Top};
		left: ${Left};
		right: ${Right};
		bottom: ${Bottom};
		z-index: ${zIndex};
		width: ${width}px;
	  height: ${height}px;
		padding-left: ${paddingLeft}px;
		padding-right: ${paddingLeft}px;
		transition-duration: ${transitionDuration}ms;
	  transition-timing-function: ${transitionTimingFunction};`;
});
// css
// cssRender('.wikixia-header', {
//   left: 0,
//   top: 0,
//   flexShrink: 0,
//   boxSizing: 'border-box',
//   width: '100%',
//   transitionProperty: 'padding-left'
//   // backgroundColor: '#ddd',
// });
console.log(style);
</script>
<style></style>
