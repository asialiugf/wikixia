<template>
  <!-- <div :style="style">
    <slot></slot>
  </div> -->
  <!-- <component :is="user === false ? 'div' : 'main'" :style="style"></component> -->
  <component :is="ttt" :style="style">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { useCssRender } from '../../../hooks';

const user = ref(true);
const ttt = ref('section');

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
  paddingLeft: 0
});

// const { cssRender } = useCssRender();
const style = computed(() => {
  const { position, top, left, right, bottom, zIndex, width, height, paddingLeft } = props;

  const Top = top === 'auto' ? top : `${top}px`;
  const Left = left === 'auto' ? left : `${left}px`;
  const Right = right === 'auto' ? right : `${right}px`;
  const Bottom = bottom === 'auto' ? bottom : `${bottom}px`;

  return `
		width: ${width}px;
	  height: auto;
	  position: ${position};
		top: ${Top};
		left: ${Left};
		right: ${Right};
		bottom: ${Bottom};
		z-index: ${zIndex};
		padding-left: ${paddingLeft}px;
		padding-right: ${paddingLeft}px;
;`;
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
