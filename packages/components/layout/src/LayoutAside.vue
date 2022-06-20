<template>
  <div v-if="isRight" ref="resizeLL" class="resize1 resizeLL"></div>
  <div v-if="props.asidePosition === 'sticky'" class="zxx-scroll11" :style="asideStyle">
    <slot name="aside"></slot>
  </div>
  <slot v-if="props.asidePosition === 'absolute'" name="aside"></slot>
  <div v-if="isLeft" ref="resizeRR" class="resize1 resizeRR"></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { isString, useDraggable } from '@vueuse/core';
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

// layout页面的样式
// 这个样式，只给sticky使用， 属于子DIV样式
const asideStyle = computed(() => {
  const { asideTop, asideWidth, asideHeight, asidePosition } = props;
  // console.log('sssssssssssssiiiiiiiiiiiiiiii', asidePosition, asideTop, asideWidth, asideHeight);
  return `
	  position: sticky;
	  top: ${asideTop}px;
		left: 0px;
		bottom: 0px;
	  width: ${asideWidth}px;
		height: ${asideHeight}px;
		overflow: scroll;
`;
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++ end
</script>
<style scoped>
.resize1 {
  width: 4px;
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

.xia-layout-aside::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
  display: none;
}

.xia-layout-aside:hover {
  background-color: #9a9a9a;
  /* display: none; */
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
    /* display: none; */
  }
}
.xia-layout-aside {
  background-color: #7a149f;
  /* display: none; */
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #1c2848;
}

/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #1c2848;
}

.xia-layout-aside:hover::-webkit-scrollbar-thumb {
  background: rgba(144, 147, 153, 0.3);
}

.zxx-scroll11 {
  display: block;

  /* padding: 0.5em 1em; */
  /* margin: 5em auto; */
  border: solid rgb(255, 106, 47);
  overflow: auto;
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;
  white-space: normal;
}
</style>
