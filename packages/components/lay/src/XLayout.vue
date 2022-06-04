<template>
  <div class="layout" :style="layoutStyle">
    <header v-if="props.hasCover" ref="cover" :style="coverStyle">
      <slot name="cover"></slot>
    </header>
    <header v-if="props.hasHidden" ref="hidden" :style="hiddenStyle">
      <slot name="hidden"></slot>
    </header>
    <header v-if="props.hasHeader" ref="header1" class="header" :style="headerStyle">
      <slot name="header"></slot>
    </header>

    <div v-if="props.hasTab" class="layout-tab" :style="tabStyle">
      <slot name="tab"
        >sx:y {{ sx }} - {{ sy }} -- main height: {{ mainh }} -- footero {{ footero }}
        <div v-if="props.headerTimeout">来了！</div>
      </slot>
    </div>

    <aside v-if="props.hasAsideLeft" class="asideL" :style="asideLStyle">
      <slot name="asideL"></slot>
      <!-- 拖拽变宽窄 -->
      <div class="resize resizeL"></div>
      <!-- 折叠小图标 -->
      <div class="hello" :style="asideZhedie" @click="changeWidth"></div>
    </aside>

    <aside v-if="props.hasAsideRight" class="asideR" :style="asideRStyle">
      <div class="resize resizeR"></div>
      <slot name="asideR">qeqerqwer</slot>
    </aside>

    <main class="main" :style="mainStyle">
      <slot name="main"></slot>
      <div v-if="props.hasMinimap" class="minimap" :style="ministyle"></div>
    </main>

    <footer v-if="props.hasFooter" class="footer" :style="footerStyle">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeMount } from 'vue';
import { isString, useWindowScroll, useElementSize, useResizeObserver } from '@vueuse/core';
// import { useCssRender, useFixedTransformStyle } from '../../../hooks';
// import LayoutBlock from './LayoutBlock.vue';

interface Props {
  hasCover?: boolean;
  hasHidden?: boolean;
  hasHeader?: boolean;

  hasTab?: boolean;
  hasAsideLeft?: boolean;
  hasAsideRight?: boolean;
  hasMinimap?: boolean;
  hasFooter?: boolean;

  // 暂时不需要以下属性 用于广告？
  // hasTabInfo: boolean;
  // hasMainInfo: boolean;
  // hasFooterInfo: boolean;

  headerTimeout?: boolean;

  /** 开启fixed布局 */
  hPosition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky'; // 'relative'
  hTop?: number | 'auto';
  hLeft?: number | 'auto';
  hRight?: number | 'auto';
  hBottom?: number | 'auto';
  hzIndex?: number | 'auto';
  hWidth?: number | 'auto';
  hHeight?: number | 'auto';
  hMinHeight?: number | 'auto';
  hPaddingLeft?: number | 'auto';
  tPosition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  tTop?: number | 'auto';
  tLeft?: number | 'auto';
  tRight?: number | 'auto';
  tBottom?: number | 'auto';
  tzIndex?: number | 'auto';
  tWidth?: number | 'auto';
  tHeight?: number | 'auto';
  tMinHeight?: number | string;
  tPaddingLeft?: number | 'auto';
  /* Aside Left */
  aLposition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  aLtop?: number | 'auto';
  aLleft?: number | 'auto';
  aLright?: number | 'auto';
  aLbottom?: number | 'auto';
  aLzIndex?: number | 'auto';
  aLMinWidth?: number;
  aLwidth?: number;
  aLheight?: number | 'auto';
  aLpaddingLeft?: number | 'auto';
  /* Aside Right */
  aRposition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  aRtop?: number | 'auto';
  aRleft?: number | 'auto';
  aRright?: number | 'auto';
  aRbottom?: number | 'auto';
  aRzIndex?: number | 'auto';
  aRMinWidth?: number;
  aRwidth?: number;
  aRheight?: number | 'auto';
  aRpaddingLeft?: number | 'auto';
  /* Footer */
  fPosition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  fTop?: number | 'auto';
  fLeft?: number | 'auto';
  fRight?: number | 'auto';
  fBottom?: number | 'auto';
  fzIndex?: number | 'auto';
  fWidth?: number | 'auto';
  fHeight?: number | 'auto';

  // mWidth: number;
  // myFooter: footerType;
}

const props = withDefaults(defineProps<Props>(), {
  hasCover: false,
  hasHidden: false,

  hasHeader: true,
  hasTab: true,
  hasAsideLeft: false,
  hasAsideRight: false,
  hasMinimap: true,
  hasFooter: true,

  headerTimeout: false,
  /* Header */
  hPosition: 'sticky',
  hTop: 'auto',
  hLeft: 'auto',
  hRight: 'auto',
  hBottom: 'auto',
  hzIndex: 1001,
  hWidth: 1200,
  hHeight: 'auto',
  hMinHeight: 48,
  hPaddingLeft: 0,
  /* Tab */
  tPosition: 'relative',
  tTop: 'auto',
  tLeft: 'auto',
  tRight: 'auto',
  tBottom: 'auto',
  tzIndex: 1003,
  tWidth: 1200,
  tHeight: 148,
  tMinHeight: 50,
  tPaddingLeft: 0,
  /* Aside Left */
  aLposition: 'absolute',
  aLtop: 'auto',
  aLleft: 'auto',
  aLright: 'auto',
  aLbottom: 'auto',
  aLzIndex: 1001,
  aLMinWidth: 0,
  aLwidth: 1200,
  aLheight: 148,
  aLpaddingLeft: 0,
  /* Aside Right */
  aRposition: 'absolute',
  aRtop: 'auto',
  aRleft: 'auto',
  aRright: 'auto',
  aRbottom: 'auto',
  aRzIndex: 1001,
  aRMinWidth: 0,
  aRwidth: 1200,
  aRheight: 148,
  aRpaddingLeft: 0,
  /* Footer */
  fPosition: 'relative',
  fTop: 'auto',
  fLeft: 'auto',
  fRight: 'auto',
  fBottom: 'auto',
  fzIndex: 1001,
  fWidth: 1200,
  fHeight: 148

  // mWidth: 500
});

// interface myTF {
//   isA: boolean;
//   isB: boolean;
// }

// const myTFx = computed<myTF>(() => {
//   const { hasCover, hasHidden, hasHeader, hasTab } = props;
//   return { isA: hasCover, isB: hasHidden || hasHeader || hasTab };
// });

// const commonProps = computed(() => {
//   const { transitionDuration, transitionTimingFunction } = props;
//   return {
//     transitionDuration,
//     transitionTimingFunction
//   };
// });

const { x, y } = useWindowScroll();

const widthL = computed(() => {
  return props.aLwidth;
});
const widthR = computed(() => {
  return props.aRwidth;
});

// ---------------------------------拖动改变宽度-----------------------------------------
const xxx = ref(0);
const yyy = ref(0);

interface Emits {
  (e: 'update:widthL', asideWidthL: number): void;
  (e: 'update:widthR', asideWidthR: number): void;
}
const emit = defineEmits<Emits>();
const asideWidthL = computed({
  get() {
    return props.aLwidth;
  },
  set(newValue: number) {
    emit('update:widthL', newValue);
  }
});

const asideWidthR = computed({
  get() {
    return props.aRwidth;
  },
  // 当给 asideWidthR 赋值时，会触发 set 方法
  set(newValue: number) {
    emit('update:widthR', newValue);
  }
});

function handleWidth(className: string, isLeft: boolean): boolean {
  const element = document.querySelector(className) as HTMLElement;
  element.onmousedown = e => {
    e.preventDefault(); // 阻止默认事件发生
    const startX = e.clientX;
    const w = isLeft ? props.aLwidth : props.aRwidth;
    xxx.value = startX;
    document.onmousemove = e1 => {
      const endX = e1.clientX;
      // const len = w + endX - startX;
      if (isLeft) {
        const len = w + endX - startX;
        asideWidthL.value = len < props.aLMinWidth ? props.aLMinWidth : len;
      } else {
        const len = w + startX - endX;
        asideWidthR.value = len < props.aRMinWidth ? props.aRMinWidth : len;
      }

      yyy.value = endX;
    };
  };
  element.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
  return false;
}
// --------------------------------拖动改变宽度------------------------------------------
function changeWidth() {
  asideWidthL.value = 0;
}

const sx = ref(0);
const sy = ref(0);
const mainh = ref(0);
// const layouth = ref(0);
const footero = ref(0);

// type Auto = number | 'auto';
// const headerHeight = ref<Auto>(0);

const header1 = ref(null);
const { height } = useElementSize(header1);
const headerHeight = computed(() => {
  return height.value;
});

// 计算 main的宽度  --------------------------------？？ 要看执行的时机 -----charmi-------------------------------------
const mainWidth = computed(() => {
  const a = props.hasAsideLeft ? props.aLwidth : 0;
  const b = props.hasAsideRight ? props.aRwidth : 0;
  const c = sx.value - a - b - 20;
  return c < 600 ? 600 : c;
});

// const lWidth = computed(() => {
//   return sx.value;
// });

// const hWidth = computed(() => {
//   return sx.value;
// });

// 计算高度 --------------------------------------------------------------------------
const asideLTop = ref(300);
const asideRTop = ref(300);
// const headerHeight = ref(0);

// headerTimeout是从父组件中传过来的，但它早于 v- if 指令的执行，所以它的值是 undefined
// watch(
//   () => props.headerTimeout,
//   () => {
//     asideLTop.value = 300; // 需要计算*******
//     asideRTop.value = 300;
//     // headerHeight.value = 400;
//     const element = document.querySelector('.header') as HTMLElement;
//     console.log('kkkkkkkkkkkkkkkkkkkk', element.offsetHeight);
//     headerHeight.value = element === null ? props.hMinHeight : element.offsetHeight;
//   },
//   {
//     immediate: false
//   }
// );

// 计算高度 --------------------------------------------------------------------------

// 计算高度 --------------------------------------------------------------------------

function onResize() {
  // 下面的 -20是为了让页面滚动条不占用宽度
  sx.value = window.innerWidth - 20;
  sy.value = window.innerHeight;
  console.log('111111111ooooooooooooooooooo', sx.value, sy.value);
  const element = document.querySelector('.main') as HTMLElement;
  mainh.value = element.offsetHeight < sy.value ? sy.value : element.offsetHeight;

  const element2 = document.querySelector('.footer') as HTMLElement;
  footero.value = element2 === null ? 0 : element2.offsetHeight;
}

onBeforeMount(() => {
  sx.value = window.innerWidth - 20;
  sy.value = window.innerHeight;
  console.log('ooooooooooooooooooo', sx.value, sy.value);
});

onMounted(() => {
  // const element = document.querySelector('.header') as HTMLElement;
  // headerHeight.value = element === null ? props.hMinHeight : element.offsetHeight;
  // console.log('onMounted headerHeight', element.offsetHeight);

  window.addEventListener('resize', onResize);
  onResize();
  if (props.hasAsideLeft) {
    handleWidth('.resizeL', true);
  }
  if (props.hasAsideRight) {
    handleWidth('.resizeR', false);
  }
});

// ------------------------------------------ 计算页面样式 ------------------------------------------------
// layout页面的样式
const layoutStyle = computed(() => {
  return `
    margin: 0px;
    width: ${sx.value}px;
    position: relative;
		background-color: #ddeeaa
  `;
});

const coverStyle = computed(() => {
  const { hPosition } = props;
  return `
		width: ${sx.value}px;
		height: ${headerHeight.value}px;
		position: ${hPosition};
		top: 0px;
		left: 0px;
		z-index: 100;
		background-color: #aeae23;
	`;
});

const hiddenStyle = computed(() => {
  const { hPosition } = props;
  return `
		width: ${sx.value}px;
		height: ${headerHeight.value}px;
		position: ${hPosition};
		top: 0px;
		left: 0px;
		z-index: 100;
		background-color: #aeae23;
	`;
});

// header 的样式
const headerStyle = computed(() => {
  const { hPosition, hMinHeight } = props;
  return `
		width: ${sx.value}px;
		position: ${hPosition};
		min-height: ${hMinHeight}px;
		top: 0px;
		left: 0px;
		z-index: 100;
		background-color: #aeae23;
	`;
});
// tab 的样式
const tabStyle = computed(() => {
  const { tPosition, tHeight, tMinHeight } = props;
  const height1 = isString(tHeight) ? tHeight : `${tHeight}px`;
  return `
		width: ${sx.value}px;
		height: ${height1};
		min-height: ${tMinHeight}px;
		position: ${tPosition};
		top: 0px;
		left: 0px;
		z-index: 3001;
		background-color: #ae4423;
	`;
});

const mainStyle = computed(() => {
  const { tTop, aLwidth, tRight } = props;
  return `
		width: ${mainWidth.value}px;
		position: relative;
		top: ${tTop}px;
		left: ${aLwidth + 10}px;
		right: ${tRight}px;
		z-index: 1001;
		height: ${mainh.value}px;
		background-color: #f1f1f1;
	`;
});

const asideLStyle = computed(() => {
  const { aLleft, aLright } = props;
  return `
		width: ${mainWidth.value}px;
		position: absolute;
		top: ${asideLTop.value}px;
		left: ${aLleft}px;
		right: ${aLright}px;
		bottom: 0px;
		width: ${widthL.value}px;
    height: ${mainh.value}px;
		z-index: 1001;
	`;
});

const asideRStyle = computed(() => {
  // const { mPosition, tTop, aLleft, aLright, mBottom, mzIndex, mHeight } = props;
  return `
		width: ${mainWidth.value}px;
		position: absolute;
		top: ${asideRTop.value}px;
		left: auto;
		right: 0px;
		bottom: 0px;
		width: ${widthR.value}px;
    height: ${mainh.value}px;
		z-index: 1001;

	`;
});

const footerStyle = computed(() => {
  const { fPosition, fzIndex } = props;
  return `
		width: ${sx.value}px;
		height: ${headerHeight.value}px;
		position: ${fPosition};
		z-index: ${fzIndex};
		background-color: #ae4423;
		:min-height="348"
	`;
});

// 文章的minimap样式
const ministyle = computed(() => {
  return `
	position: absolute;
	width:${mainWidth.value / 10}px;
	top:0px;
	right:0px;
	bottom:0px;
	background-color: #886655;
	height:${mainh.value}px;
	`;
});

// --------------------- 左侧折叠图标样式
const asideZhedie = computed(() => {
  return `
	position: fixed;
	top:250px;
	left:${asideWidthL.value - 10}px;
	height:20px;
	width:20px;
	z-index:8000
	`;
});

// ------------------------------------------ 页面样式 ------------------------------------------------
</script>

<style>
/* ---------------------相邻选择器 实现 hover 控制 子DIV 显示隐藏 --------------  */
.asideL:hover .hello {
  display: block;
}

.hello {
  background-color: #ff0000;
  display: none;
}

.hello:hover {
  background-color: #0054c9;
  transition: all 0.5s;
}
/* ---------------------相邻选择器 实现 hover 控制 子DIV 显示隐藏 --------------  */
.resize {
  background-color: rgb(173, 173, 255);
  width: 14px;
  height: 100%;
  position: absolute;
  top: 0px;
  cursor: ew-resize;
  z-index: 5001;
}
.resizeL {
  right: -8px;
}
.resizeR {
  left: -2px;
}
.resize:hover {
  background-color: #0054c9;
  /* transition: all 0.5s; */
}

.asideL {
  /* position: absolute;
	top: 0px;
	left: 0px;
	width: 100px;
	height: 100%; */
  background-color: #c3dcff;
  /* transition: all 0.5s; */
  overflow: scroll;
  scrollbar-width: thin;
}

.asideR {
  background-color: #c3dcff;
  scrollbar-width: thin;
}

.minimap {
  background-color: rgb(31, 31, 255);
  width: 154px;
  position: absolute;
  top: 0px;
  right: 30px;
  /* height: 100%; */
}
.footer {
  background-color: #368aff;
}
.main {
  background-color: aqua;
}

.asideL::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
  /* display: none; */
}
.asideL::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.asideL::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
</style>
