<template>
  <div ref="resizeLL" class="resize1 resizeLL"></div>
  <div v-if="props.asidePosition === 'sticky'" class="zxx-scroll11" :style="asideStyle">
    <slot name="aside"></slot>
  </div>
  <slot v-if="props.asidePosition === 'absolute'" name="aside"></slot>
  <div ref="resizeRR" class="resize1 resizeRR"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref, watch } from 'vue';
import type { Ref } from 'vue';
import { isString, useDraggable, useEventListener } from '@vueuse/core';
import type { Position, MaybeRef } from '@vueuse/core';
import { assertBindExpression } from '@babel/types';

interface asideProps {
  id: number; // 用于标识 aside 的 id. emit返回给父组件时, 父组件会用到
  asideTop: number | 'auto';
  asideWidth: number;
  asideHeight: number;
  asidePosition?: 'absolute' | 'sticky';
}

const props = withDefaults(defineProps<asideProps>(), {
  id: 0,
  asideTop: 0,
  asideWidth: 0,
  asideHeight: 0,
  asidePosition: 'absolute'
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
  (e: 'update:widthL', asideWidthL: rtnType): void;
  (e: 'update:widthR', asideWidthR: rtnType): void;
}
const emit = defineEmits<Emits>();

// const asideR = computed<rtnType>(() => {
//   const { asideWidth, id } = props;
//   return { width: asideWidth, id };
// });

// *****************************************************************************
const styleL = ref('');
const styleR = ref('');
const posL = ref(0);
const posR = ref(0);
const resizeLL = ref<HTMLElement | null>(null);
const resizeRR = ref<HTMLElement | null>(null);
const xR = useDraggable(resizeRR, {
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
const xL = useDraggable(resizeLL, {
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
// 这里 watch xl 不行， 必须watch xl.x
// watch(xL.x, () => {
//   const left = isString(props.asideLeft) ? 0 : props.asideLeft;
//   const right = isString(props.asideRight) ? 0 : props.asideRight;
//   let width = 0;
//   if (left === 0) {
//     console.log('left === 0');
//     width = posL.value + props.asideWidth - xL.x.value < 50 ? 50 : posL.value + props.asideWidth - xL.x.value + 14;
//   } else {
//     console.log('left ! 0  ========', left, posL.value);
//     width = left + props.asideWidth - xL.x.value < 50 ? 50 : left + props.asideWidth - xL.x.value + 14;
//   }
//   // styleL.value = `left: ${asideL.value.width}px; `;
//   emit('update:widthL', { width: props.asideWidth, id: props.id, lr: 'l', left: xL.x.value, right: 0 });
// });
// watch(xR.x, () => {
//   // const width = xR.x.value - props.asideRight < 50 ? 50 : xR.x.value - props.asideRight + 14;
//   // const width =
//   //   posL.value + props.asideWidth - xL.x.value < 50 ? 50 : posL.value + props.asideWidth - xL.x.value + 14;
//   console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', xR.x.value, posR);
//   emit('update:widthR', { width: props.asideWidth, id: props.id, lr: 'l', right: xR.x.value, left: posR.value });
// });
// *****************************************************************************

// const element = ref<HTMLDivElement>();
// const element2 = ref<HTMLDivElement>();
// useEventListener(element, 'mousedown', e => {
//   console.log(e);
// });
// useEventListener(element2, 'mousedown', e => {
//   useEventListener(element2, 'mousemove', e1 => {
//     console.log(e1);
//   });
//   console.log(e);
// });

function handleWidth(className: string, isLeft: boolean): void {}
// -------------------------------- 折叠图标处理 ------------------------------------------
function changeWidth() {
  // props.asideWidth.value = 0;
}
// -------------------------------- resize处理 ------------------------------------------

onMounted(() => {
  handleWidth('.resizeLL', true);
  handleWidth('.resizeRR', false);
});

// layout页面的样式
// 这个样式，只给sticky使用， 属于子DIV样式
const asideStyle = computed(() => {
  const { asideTop, asideWidth, asideHeight, asidePosition } = props;
  console.log('sssssssssssssiiiiiiiiiiiiiiii', asidePosition, asideTop, asideWidth, asideHeight);
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
  left: -0px;
  background-color: rgb(0, 169, 6);
}
.resizeRR {
  right: -0px;
  background-color: rgb(11, 88, 255);
}
.resizeLL:hover {
  background-color: hsl(20, 100%, 45%);
  /* transition: all 0.5s; */
}
.resizeRR:hover {
  background-color: hsl(309, 100%, 59%);
  /* transition: all 0.5s; */
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
