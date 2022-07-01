<template>
  <div v-if="isRight" ref="resizeLL" class="xia-aside-resize resizeLL"></div>
  <div v-if="props.asidePosition === 'sticky'" class="xia-layout-aside" :style="asideStyle">
    <slot name="aside"></slot>
  </div>
  <slot v-if="props.asidePosition === 'absolute'" name="aside"></slot>
  <div v-if="isLeft" ref="resizeRR" class="xia-aside-resize resizeRR"></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDraggable } from '@vueuse/core';
import type { Position } from '@vueuse/core';

interface asideProps {
  id: number; // 用于标识 aside 的 id. emit返回给父组件时, 父组件会用到
  asideTop: number | 'auto';
  asideWidth: number;
  asideHeight: number;
  asidePosition?: 'absolute' | 'sticky';
  isLeft?: boolean;
  isRight?: boolean;
}

const props = withDefaults(defineProps<asideProps>(), {
  id: 0,
  asideTop: 0,
  asideWidth: 0,
  asideHeight: 0,
  asidePosition: 'absolute',
  isLeft: true,
  isRight: false
});

// ---------------------------------拖动改变宽度-----------------------------------------
interface rtnType {
  state: 'start' | 'move' | 'end';
  id: number;
  side: 'left' | 'right';
  pos: number;
  pageX: number;
}

interface Emits {
  (e: 'update:widthL', L: rtnType): void;
  (e: 'update:widthR', R: rtnType): void;
}
const emit = defineEmits<Emits>();

// *****************************************************************************

const resizeLL = ref<HTMLElement | null>(null);
const resizeRR = ref<HTMLElement | null>(null);
useDraggable(resizeRR, {
  onStart: (position: Position, event: PointerEvent) => {
    emit('update:widthR', { state: 'start', id: props.id, side: 'right', pos: position.x, pageX: event.pageX });
  },
  onMove: (position: Position, event: PointerEvent) => {
    emit('update:widthR', { state: 'move', id: props.id, side: 'right', pos: position.x, pageX: event.pageX });
  },
  onEnd: (position: Position, event: PointerEvent) => {
    emit('update:widthR', { state: 'end', id: props.id, side: 'right', pos: position.x, pageX: event.pageX });
  },
  preventDefault: true
});

// 值得佩服！！
useDraggable(resizeLL, {
  onStart: (position: Position, event: PointerEvent) => {
    emit('update:widthL', { state: 'start', id: props.id, side: 'left', pos: position.x, pageX: event.pageX });
  },
  onMove: (position: Position, event: PointerEvent) => {
    emit('update:widthL', { state: 'move', id: props.id, side: 'left', pos: position.x, pageX: event.pageX });
  },
  onEnd: (position: Position, event: PointerEvent) => {
    emit('update:widthL', { state: 'end', id: props.id, side: 'left', pos: position.x, pageX: event.pageX });
  },
  preventDefault: true
});

/** aside的可拖拉线的宽度 */
const ww = 6;
const ww1 = `${ww}px`;
// layout页面的样式
// 这个样式，只给sticky使用， 属于子DIV样式
// 		overflow-x:hidden;
// 		overflow-y:auto;
const asideStyle = computed(() => {
  const { asideTop, asideWidth, asideHeight } = props;
  const marginL = props.isLeft ? 0 : ww;
  const marginR = props.isRight ? 0 : ww;
  return `
	  position: sticky;
	  top: ${asideTop}px;
		bottom: 0px;
	  width: ${asideWidth - ww}px;
		height: ${asideHeight}px;
		overflow: auto;
    margin-right: ${marginR}px;
		margin-left: ${marginL}px;
`;
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++ end
</script>
<style scoped>
.xia-aside-resize {
  width: v-bind('ww1');
  height: 100%;
  position: absolute;
  top: 0px;
  cursor: ew-resize;
  z-index: 5001;
}
.resizeLL {
  left: 0px;
  background-color: rgb(0, 169, 6);
}
.resizeRR {
  right: 0px;
  background-color: rgb(11, 88, 255);
}
.resizeLL:hover {
  background-color: hsl(20, 100%, 45%);
  transition: all 0.5s;
}
.resizeRR:hover {
  background-color: hsl(309, 100%, 59%);
  transition: all 0.5s;
}
.xia-layout-aside {
  scrollbar-color: #ffffff #ffffff;
  scrollbar-width: thin;
  scrollbar-gutter: stable both-edges;
}

.xia-layout-aside:hover {
  scrollbar-color: #ff2b2b #ffffff;
  scrollbar-width: thin;
}

.xia-layout-aside::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 8px;
}

.xia-layout-aside::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #ffffff;
}

.xia-layout-aside::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #dd5;
  background-image: -webkit-gradient(linear, 40% 0%, 75% 84%, from(#d9d9d9), to(#bcbcbc), color-stop(0.6, #b4b4b4));
}

.xia-layout-aside:hover::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #efefef;
  border-radius: 8px;
}

.xia-layout-aside:hover::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #5544f5;
}

.xia-layout-aside:hover::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #dd5;
  background-image: -webkit-gradient(linear, 40% 0%, 75% 84%, from(#4d9c41), to(#19911d), color-stop(0.6, #54de5d));
}
</style>
