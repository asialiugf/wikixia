<template>
  <div class="layout" :style="style">
    <layout-block
      v-if="hasHeader"
      tag="header"
      :position="props.hPosition"
      :top="props.hTop"
      :left="props.hLeft"
      :right="props.hRight"
      :bottom="props.hBottom"
      :z-index="1001"
      :width="1200"
      :min-height="48"
      :padding-left="0"
    >
      <slot name="header"></slot>
    </layout-block>

    <layout-block
      v-if="hasTab"
      tag="div"
      :position="props.tPosition"
      :top="props.tTop"
      :left="props.tLeft"
      :right="props.tRight"
      :bottom="props.tBottom"
      :min-height="48"
      :z-index="props.tzIndex"
      :width="1200"
      :height="48"
      :padding-left="0"
    >
      <slot name="tab"></slot>
    </layout-block>

    <layout-block
      v-if="hasAsideLeft"
      tag="aside"
      class="asideL"
      :position="'absolute'"
      :top="props.aLtop"
      :left="props.aLleft"
      :right="props.aLright"
      :bottom="props.aLbottom"
      :z-index="1001"
      :width="widthX"
      :height="props.aLheight"
      :padding-left="0"
    >
      <slot name="asideL"> {{ xxx }} -- {{ yyy }} rlen: {{ rlen }}</slot>
      <div v-if="hasAsideLeft" class="resize resizeL"></div>
    </layout-block>

    <layout-block
      v-if="hasAsideRight"
      tag="aside"
      class="asideR"
      :position="'absolute'"
      :top="150"
      :left="'auto'"
      :right="0"
      :bottom="'auto'"
      :z-index="1001"
      :width="widthR"
      :height="500"
      :padding-left="0"
    >
      <div v-if="hasAsideLeft" class="resize resizeR"></div>
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
      :width="props.mWidth"
      :padding-left="0"
    >
      <slot name="main"> </slot>
    </layout-block>

    <layout-block
      v-if="hasFooter"
      tag="footer"
      class="footer"
      :position="props.tPosition"
      :top="props.tTop"
      :left="props.tLeft"
      :right="props.tRight"
      :bottom="props.tBottom"
      :min-height="348"
      :z-index="1001"
      :width="1200"
      :padding-left="0"
    >
      <slot name="footer"> </slot>
    </layout-block>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useWindowScroll, useIntervalFn } from '@vueuse/core';
// import { useCssRender, useFixedTransformStyle } from '../../../hooks';
import LayoutBlock from './LayoutBlock.vue';
import type { LayoutBlockProps } from './LayoutBlock.vue';

interface Props {
  /** 开启fixed布局 */
  hPosition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
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
  fFposition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  fFtop?: number | 'auto';
  fFleft?: number | 'auto';
  fFright?: number | 'auto';
  fFbottom?: number | 'auto';
  fFzIndex?: number | 'auto';
  fFwidth?: number | 'auto';
  fFheight?: number | 'auto';
  fFpaddingLeft?: number | 'auto';
  mWidth: number;
  // myFooter: footerType;
}

const props = withDefaults(defineProps<Props>(), {
  /* Header */
  hPosition: 'relative',
  hTop: 'auto',
  hLeft: 'auto',
  hRight: 'auto',
  hBottom: 'auto',
  hzIndex: 1001,
  hWidth: 1200,
  hHeight: 148,
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
  aLMinWidth: 200,
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
  aRMinWidth: 200,
  aRwidth: 1200,
  aRheight: 148,
  aRpaddingLeft: 0,
  /* Footer */
  fFposition: 'relative',
  fFtop: 'auto',
  fFleft: 'auto',
  fFright: 'auto',
  fFbottom: 'auto',
  fFzIndex: 1001,
  fFwidth: 1200,
  fFheight: 148,
  fFpaddingLeft: 0,
  mWidth: 500
});

// tag: 'footer',
// position: 'relative',
// top: 'auto',
// left: 'auto',
// right: 'auto',
// bottom: 'auto',
// zIndex: 1001,
// width: 1200,
// height: 148,
// paddingLeft: 0,
// minHeight: 0

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
  return props.hPosition !== 'static';
});

const hasAsideRight = computed(() => {
  return props.hPosition !== 'static';
});
// const commonProps = computed(() => {
//   const { transitionDuration, transitionTimingFunction } = props;
//   return {
//     transitionDuration,
//     transitionTimingFunction
//   };
// });

// type Position = 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
// const position = ref<Position>('absolute');

// type Auto = number | 'auto';
// const auto = ref<Auto>('auto');

const { x, y } = useWindowScroll();

const widthX = computed(() => {
  return props.aLwidth;
});
const widthR = computed(() => {
  return props.aRwidth;
});

// --------------------------------------------------------------------------

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
    emit('update:widthL', newValue);
  }
});

function handleWidth(className: string, isLeft: boolean): boolean {
  // asideWidth.value += 10;
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
        rlen.value = len;
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

// --------------------------------------------------------------------------

const sx = ref(0);
const sy = ref(0);
const mainh = ref(0);

function onResize() {
  sx.value = window.innerWidth - 20;
  sy.value = window.innerHeight;
  const element = document.querySelector('.main') as HTMLElement;
  mainh.value = element.clientHeight;
  // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  // console.log(sx.value, sy.value, mainh.value);
  // console.log(element);
}

onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
  // dragControllerDiv();
  handleWidth('.resizeL', true);
  handleWidth('.resizeR', false);
});

// 整个页面的宽度
const style = computed(() => {
  console.log('ssssssssssssssssssssssssssssssssss');
  console.log(mainh.value);
  return `
    margin: 0px;
    width: ${sx.value}px;
    position: relative;
		background-color: #ddeeaa
  `;
});
</script>
<style>
.resize {
  background-color: rgb(173, 173, 255);
  width: 4px;
  height: 100%;
  position: absolute;
  top: 0px;
  cursor: ew-resize;
}
.resizeL {
  right: -2px;
}
.resizeR {
  left: -2px;
}
.resize:hover {
  background-color: #0054c9;
  transition: all 0.5s;
}

.asideL {
  /* position: absolute;
	top: 0px;
	left: 0px;
	width: 100px;
	height: 100%; */
  background-color: #c3dcff;
}

.asideR {
  background-color: #c3dcff;
}
.footer {
  background-color: #368aff;
}
.main {
  background-color: aqua;
}
</style>
