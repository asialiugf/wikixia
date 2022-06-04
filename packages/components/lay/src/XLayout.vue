<template>
  <div class="layout" :style="layoutStyle">
    <header v-if="hasHeader" :style="headerStyle">
      <slot name="header"></slot>
    </header>

    <div v-if="hasTab" class="layout-tab" :style="tabStyle">
      <slot name="tab"
        >sx:y {{ sx }} - {{ sy }} -- main height: {{ mainh }} -- footero {{ footero }}
        <div v-if="props.headerTimeout">来了！</div>
      </slot>
    </div>

    <layout-block
      v-if="hasAsideLeft"
      tag="aside"
      class="asideL"
      :position="'fixed'"
      :top="asideLTop"
      :left="props.aLleft"
      :right="props.aLright"
      :bottom="0"
      :z-index="1001"
      :width="widthL"
      :height="300"
      :padding-left="0"
    >
      <slot name="asideL"> {{ xxx }} -- {{ yyy }} rlen: {{ rlen }} -- {{ layouth }} {{ mainh }}</slot>
      <!-- 拖拽变宽窄 -->
      <div class="resize resizeL"></div>
      <!-- 折叠小图标 -->
      <div class="hello" :style="asideZhedie" @click="changeWidth"></div>
    </layout-block>

    <layout-block
      v-if="hasAsideRight"
      tag="aside"
      class="asideR"
      :position="'absolute'"
      :top="asideRTop"
      :left="'auto'"
      :right="0"
      :bottom="0"
      :z-index="1001"
      :width="widthR"
      :padding-left="0"
    >
      <div class="resize resizeR"></div>
      <slot name="asideR">qeqerqwer</slot>
    </layout-block>

    <layout-block
      tag="main"
      class="main"
      :position="'relative'"
      :top="props.tTop"
      :left="props.aLwidth + 10"
      :right="props.tRight"
      :bottom="props.tBottom"
      :z-index="1001"
      :width="mWidth"
      :padding-left="0"
    >
      <slot name="main"> </slot>
      <div v-if="hasMinimap" class="minimap" :style="ministyle"></div>
    </layout-block>

    <!-- <layout-block
      v-if="hasFooter"
      tag="footer"
      class="footer"
      :position="props.tPosition"
      :top="props.tTop"
      :left="props.tLeft"
      :right="props.tRight"
      :bottom="props.tBottom"
      :min-height="348"
      :z-index="1"
      :width="lWidth"
      :padding-left="0"
    >
      <slot name="footer"> </slot>
    </layout-block> -->

    <footer v-if="hasFooter" class="footer" :style="footerStyle">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useWindowScroll, useIntervalFn } from '@vueuse/core';
// import { useCssRender, useFixedTransformStyle } from '../../../hooks';
import LayoutBlock from './LayoutBlock.vue';
import type { LayoutBlockProps } from './LayoutBlock.vue';

interface Props {
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
  hPaddingLeft?: number | 'auto';
  tPosition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  tTop?: number | 'auto';
  tLeft?: number | 'auto';
  tRight?: number | 'auto';
  tBottom?: number | 'auto';
  tzIndex?: number | 'auto';
  tWidth?: number | 'auto';
  tHeight?: number | 'auto';
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

  mWidth: number;
  // myFooter: footerType;
}

const props = withDefaults(defineProps<Props>(), {
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
  fHeight: 148,

  mWidth: 500
});

const hasHeader = computed(() => {
  return props.hPosition !== 'static';
});

const hasTab = computed(() => {
  return props.tPosition !== 'static';
});

const hasFooter = computed(() => {
  return props.hPosition !== 'static';
});

const hasAsideLeft = computed(() => {
  return true;
});

const hasAsideRight = computed(() => {
  return true;
});

// 文章的minimap
const hasMinimap = computed(() => {
  return true;
});

// const mouseInaside = computed(() => {
//   return true;
// });

const mouseInaside = ref(true);
const mouseover = () => {
  mouseInaside.value = true;
};
const mouseout = () => {
  mouseInaside.value = false;
};

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
const rlen = ref(0);

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
  // mouseInaside.value = true;
  asideWidthL.value = 0;
}

const sx = ref(0);
const sy = ref(0);
const mainh = ref(0);
const layouth = ref(0);
const footero = ref(0);

const mWidth = computed(() => {
  return sx.value - props.aLwidth - props.aRwidth - 20;
});

const lWidth = computed(() => {
  return sx.value;
});

const hWidth = computed(() => {
  return sx.value;
});

// 计算高度 --------------------------------------------------------------------------
const asideLTop = ref(300);
const asideRTop = ref(300);
// const headerHeight = ref(0);

watch(
  () => props.headerTimeout,
  () => {
    asideLTop.value = 300;
    asideRTop.value = 500;
    // headerHeight.value = 400;
  },
  {
    immediate: true
  }
);

// 计算高度 --------------------------------------------------------------------------
const headerHeight = computed(() => {
  const { headerTimeout } = props;
  if (headerTimeout) {
    return 200;
  }
  return props.hHeight;
});
// 计算高度 --------------------------------------------------------------------------

function onResize() {
  // 下面的 -20是为了让页面滚动条不占用宽度
  sx.value = window.innerWidth - 20;
  sy.value = window.innerHeight;
  const element = document.querySelector('.main') as HTMLElement;
  mainh.value = element.clientHeight;

  const element1 = document.querySelector('.layout') as HTMLElement;
  layouth.value = element1.clientHeight;

  const element2 = document.querySelector('.footer') as HTMLElement;
  footero.value = element2.offsetHeight;
}

onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
  if (hasAsideLeft.value) {
    handleWidth('.resizeL', true);
  }
  if (hasAsideRight.value) {
    handleWidth('.resizeR', false);
  }
});

// ------------------------------------------ 页面样式 ------------------------------------------------
// layout页面的样式
const layoutStyle = computed(() => {
  return `
    margin: 0px;
    width: ${sx.value}px;
    position: relative;
		background-color: #ddeeaa
  `;
});
// header 的样式
const headerStyle = computed(() => {
  const { hPosition, hTop, hLeft, hRight, hBottom, hzIndex, hWidth, hHeight } = props;
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
// tab 的样式
const tabStyle = computed(() => {
  const { tPosition, tTop, tLeft, tRight, tBottom, tzIndex, tWidth, tHeight } = props;
  return `
		width: ${sx.value}px;
		height: ${headerHeight.value}px;
		position: ${tPosition};
		top: 0px;
		left: 0px;
		z-index: 3001;
		background-color: #ae4423;
	`;
});

const footerStyle = computed(() => {
  const { fPosition, fTop, fLeft, fRight, fBottom, fzIndex, fWidth, fHeight } = props;
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
	width:${mWidth.value / 10}px;
	top:0px;
	right:0px;
	bottom:0px;
	background-color: #886655;
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
