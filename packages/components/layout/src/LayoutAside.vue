<template>
  <div v-if="props.asidePosition === 'sticky'" class="xia-layout-aside asideslot" :style="asideStyle">
    <slot name="aside"></slot>
  </div>
  <div v-if="props.asidePosition === 'absolute'" class="asideslot" style="height: 100%">
    <slot name="aside"></slot>
  </div>

  <!-- aside toggle块 -->
  <div v-if="props.isLeft && props.isToggle" class="toggle lll" @click="toggleC">
    <div :style="toggleStyle" class="ll1"></div>
    <div :style="toggleStyle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
        class="svgg"
      >
        <path
          fill="#cb1010"
          d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"
        ></path>
      </svg>
    </div>
  </div>

  <div v-if="props.isRight && props.isToggle" class="toggle rrr" @click="toggleC">
    <div :style="toggleStyle" class="rr1"></div>
    <div :style="toggleStyle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
        class="svgg"
      >
        <path
          fill="#cb1010"
          d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
        ></path>
      </svg>
    </div>
  </div>

  <!-- aside宽度拖动条 -->
  <div
    v-if="props.isRight"
    ref="resizeLL"
    class="xia-aside-resize resizeLL"
    :class="{ resizeOn: props.isDraggbale }"
  ></div>
  <div
    v-if="props.isLeft"
    ref="resizeRR"
    class="xia-aside-resize resizeRR"
    :class="{ resizeOn: props.isDraggbale }"
  ></div>
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
  isToggle?: boolean;
  isDraggbale?: boolean;
  togglePostion?: number;
  onToggle?: boolean;
}

const props = withDefaults(defineProps<asideProps>(), {
  id: 0,
  asideTop: 0,
  asideWidth: 0,
  asideHeight: 0,
  asidePosition: 'absolute',
  isLeft: true,
  isRight: false,
  isToggle: true,
  isDraggbale: true,
  togglePostion: 300,
  onToggle: true
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
  (e: 'update:toggle', id: number, side: string): void;
}
const emit = defineEmits<Emits>();

// *****************************************************************************

const resizeLL = ref<HTMLElement | null>(null);
const resizeRR = ref<HTMLElement | null>(null);
useDraggable(resizeRR, {
  onStart: (position: Position, event: PointerEvent) => {
    if (!props.isDraggbale) return;
    emit('update:widthR', { state: 'start', id: props.id, side: 'right', pos: position.x, pageX: event.pageX });
  },
  onMove: (position: Position, event: PointerEvent) => {
    if (!props.isDraggbale) return;
    emit('update:widthR', { state: 'move', id: props.id, side: 'right', pos: position.x, pageX: event.pageX });
  },
  onEnd: (position: Position, event: PointerEvent) => {
    if (!props.isDraggbale) return;
    emit('update:widthR', { state: 'end', id: props.id, side: 'right', pos: position.x, pageX: event.pageX });
  },
  preventDefault: true
});

// 值得佩服！！
useDraggable(resizeLL, {
  onStart: (position: Position, event: PointerEvent) => {
    if (!props.isDraggbale) return;
    emit('update:widthL', { state: 'start', id: props.id, side: 'left', pos: position.x, pageX: event.pageX });
  },
  onMove: (position: Position, event: PointerEvent) => {
    if (!props.isDraggbale) return;
    emit('update:widthL', { state: 'move', id: props.id, side: 'left', pos: position.x, pageX: event.pageX });
  },
  onEnd: (position: Position, event: PointerEvent) => {
    if (!props.isDraggbale) return;
    emit('update:widthL', { state: 'end', id: props.id, side: 'left', pos: position.x, pageX: event.pageX });
  },
  preventDefault: true
});

function toggleC() {
  emit('update:toggle', props.id, props.isLeft ? 'left' : 'right');
}

/** aside的可拖拉线的宽度 */
const ww = 4;
const ww1 = `${ww}px`;

/** toggle按钮的宽度 */
const tw = 12;
const toggleW = `${tw}px`;
const toggleW1 = `-${tw}px`;

const onToggl = computed(() => {
  return props.onToggle ? '1' : '0';
});

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

// const asideStyle1 = computed(() => {
//   const { togglePostion } = props;
//   return `
// 		position: fixed;
// 		top: ${togglePostion - 120}px;
// 	`;
// });

const toggleStyle = computed(() => {
  const { togglePostion } = props;
  // const ll = isLeft ? 'auto' : `${-6}px`;
  // const rr = isRight ? 'auto' : `${-6 - ww}px`;
  // const radiusL = isLeft ? '0px' : '15px';
  // const radiusR = isRight ? '0px' : '15px';
  return `
		position: fixed;
		top: ${togglePostion}px;
		width: ${toggleW};
		height: 40px;

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
}

.rrr {
  position: absolute;
  top: 0px;
  left: v-bind('toggleW1');
}

.lll {
  position: absolute;
  top: 0px;
  right: 0px;
}
.rr1 {
  background-color: rgb(0, 88, 0);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  transform: perspective(6px) rotateX(0deg) rotateY(-8deg) translateZ(0);
}
.ll1 {
  background-color: rgb(0, 88, 0);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transform: perspective(6px) rotateX(0deg) rotateY(8deg) translateZ(0);
}
.svgg {
  display: block;
  /* margin: auto; */
  height: 100%;
  width: 100%;
}

.resizeLL {
  left: 0px;
  background-color: rgb(0, 169, 6);
}
.resizeRR {
  right: 0px;
  background-color: rgb(11, 88, 255);
}
.resizeOn {
  cursor: ew-resize;
}
.resizeOn:hover {
  background-color: hsl(20, 100%, 45%);
  transition: all 0.5s;
}
/* .resizeOn:hover .toggle {
  display: block;
} */
/* .resizeOn:hover .toggle .icon-arrow-right {
  display: none;
} */
/**  ---- toggle显示 ------------------------------------ */
.asideslot:hover + .toggle {
  opacity: v-bind('onToggl');
}

.asideslot:hover {
  background-color: #989598;
}

.toggle {
  opacity: 0;
}

.toggle:hover {
  opacity: 1;
}

/** scrollbar的配置 ------- begin ------- */
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
/** scrollbar的配置 ------end------ */

/**  > css图标 ----- begin ---- */
css-icon {
  display: inline-block;
  height: 1em;
  width: 1em;
  font-size: 16px;
  box-sizing: border-box;
  text-indent: -9999px;
  vertical-align: middle;
  position: relative;
}
css-icon::before,
css-icon::after {
  content: '';
  box-sizing: inherit;
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.icon-arrow-right::before {
  height: 0.65em;
  width: 0.65em;
  border-style: solid;
  border-width: 1px 0 0 1px;
  -ms-transform: translate(-75%, -50%) rotate(135deg);
  transform: translate(-75%, -50%) rotate(135deg);
}
/**  > css图标 ----- begin ---- */
</style>
