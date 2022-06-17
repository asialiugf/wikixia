<template>
  <!-- <div :style="style">
    <slot></slot>
  </div> -->
  <!-- <component :is="user === false ? 'div' : 'main'" :style="style"></component> -->
  <component :is="tag" :style="style">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { isString } from '@vueuse/core';
// import { useCssRender } from '../../../hooks';

export interface LayoutBlockProps {
  tag: string; // 可以是 div | main | aside | header | footer | section | article | nav  | content | footer
  position?: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  top?: number | 'auto';
  left?: number | 'auto';
  right?: number | 'auto';
  bottom?: number | 'auto';
  minHeight?: number;
  minWidth?: number;
  zIndex?: number | 'auto' /** fixed布局的层级 */;
  width?: number | 'auto' /** 最小宽度 */;
  height?: number | 'auto' | '100%' /** 高度 */;
  paddingLeft?: number | 'auto' /** 左侧内边距 */;
}

const props = withDefaults(defineProps<LayoutBlockProps>(), {
  tag: 'div',
  position: 'relative',
  top: 'auto',
  left: 'auto',
  right: 'auto',
  bottom: 'auto',
  minHeight: 50,
  minWidth: 0,
  zIndex: 1001,
  width: 1200,
  height: 'auto',
  paddingLeft: 0
});

// const { cssRender } = useCssRender();
const tag = computed(() => {
  return props.tag;
});

const style = computed(() => {
  console.log(props);
  const { position, top, left, right, bottom, minHeight, minWidth, zIndex, width, height, paddingLeft } = props;
  const Top = top === 'auto' ? top : `${top}px`;
  const Left = left === 'auto' ? left : `${left}px`;
  const Right = right === 'auto' ? right : `${right}px`;
  const Bottom = bottom === 'auto' ? bottom : `${bottom}px`;
  const height1 = isString(height) ? height : `${height}px`;

  return `
	  position: ${position};
		top: ${Top};
		left: ${Left};
		right: ${Right};
		bottom: ${Bottom};
		width: ${width}px;
	  height: ${height1};
		min-height: ${minHeight}px;
		min-width: ${minWidth}px;
		z-index: ${zIndex};
		padding-left: ${paddingLeft}px;
		padding-right: ${paddingLeft}px;
`;
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
