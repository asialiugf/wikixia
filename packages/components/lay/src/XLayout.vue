<template>
  <div class="layout" :style="layoutStyle">
    <Transition>
      <div v-show="coverOut" id="xia-layout-cover" class="xia-layout-cover info" :style="coverStyle">
        <slot name="cover"></slot>
        <div>{{ x }} --- {{ y }}</div>
      </div>
    </Transition>
    <Transition name="xia-layout-hidden">
      <div v-show="props.hasHidden" id="xia-layout-hidden" class="xia-layout-hidden info" :style="hiddenStyle">
        <slot name="hidden">这里是广告区</slot>
      </div>
    </Transition>
    <header v-show="props.hasHeader" id="xia-layout-header" class="xia-layout-header info" :style="headerStyle">
      <slot name="header"></slot>
      <div>{{ x }} --- {{ y }}</div>
    </header>
    <div v-show="props.hasTab" id="xia-layout-tab" class="xia-layout-tab info" :style="tabStyle">
      <slot name="tab"
        >sx:sy========={{ appWidth }}=={{ appHeight }}===={{ mainT }}======== {{ sx }} - {{ sy }} -- main height:
        {{ mainh }} -- footero {{ footero }}
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

    <main id="xia-layout-main" class="main info" :style="mainStyle">
      <slot name="main"></slot>
      <div v-if="props.hasMinimap" class="minimap" :style="ministyle"></div>
    </main>

    <component :is="'aside'" v-for="(item, index) of asideList" :key="index" :style="asideStyle(item)">
      <layout-aside
        :id="index"
        :aside-position="item.slotPosition"
        :aside-top="item.slotTop"
        :aside-height="mainMinHeight"
        :aside-width="item.width"
        @update:width-l="setWidthL"
        @update:width-r="setWidthR"
      >
        <template #aside>
          <slot :name="`${item.key}`"> 无法无天 </slot>
          <div>## id : {{ myid }}</div>
          <div>## L?R : {{ lorr }}</div>
          <div>## {{ rtnWidthL }}</div>
          <div>###################################################### {{ rtnWidthR }}</div>
        </template>
      </layout-aside>
    </component>

    <footer v-if="props.hasFooter" id="xia-layout-footer" class="footer info" :style="footerStyle">
      <slot name="footer"></slot>
    </footer>
  </div>

  <!-- <div style="position: absolute; top: 0px; left: 350px; height: 1000px; z-index: 9988">
    <div style="position: sticky; top: 200px; width: 200px; height: 200px; background-color: #ee0066"></div>
  </div> -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeMount } from 'vue';
import { isString, useWindowScroll, useElementSize, useResizeObserver, useWindowSize } from '@vueuse/core';
import LayoutAside from './LayoutAside.vue';

interface asideType {
  position: 'absolute' | 'sticky';
  key: string; // slots name
  // 针对头部的覆盖 header and footer are covered or not by admin-layout
  header: 'cover' | 'hidden' | 'header' | 'tab' | 'none';
  footer: boolean; // 是否覆盖 footer
  // side: 停靠方式： 'left' 左对齐 'right' 右对齐 'mainl' 主区 左对齐 'mainr' 主区 右对齐 'isolated' 单独定位
  side: 'left' | 'right' | 'mainl' | 'mainr' | 'isolated';
  width: number;
  display: boolean; // 是否显示
  draggbale: boolean; // 是否可以移动
}

// 侧边栏列表， 接口的内容一部分是从应用程序中传过来。一部分是计算出来。
// 侧边栏显示，分为两部分，一部分在本VUE中，position为absolute,参见 【:style="asideStyle(item)"】
// 另一部分，在LayoutAside子组件中，position 即为interface asideItem中的position，从应用程序中传过来，
// 需要传给子组件LayoutAside,  其值只能 为 sticky 或 absolute. sticky 表示: 侧边栏的内容会被固定在页面的某个位置，
// absolute 表示: 但是不会被stick在屏幕中，而是固定在页面的某个位置，跟随页面的滚动条滚动。

interface asideItem {
  key: string; // 侧边栏的key，slot的name会用这个key
  side: 'left' | 'right' | 'mainl' | 'mainr' | 'isolated';
  // 是否覆盖 header ?
  header: 'cover' | 'hidden' | 'header' | 'tab' | 'none';
  // 是否覆盖 footer ?
  footer: boolean; // 是否覆盖 footer
  display: boolean; // 是否显示
  draggbale: boolean; // 是否可以移动
  width: number;
  height: number;
  start: number;
  end: number;
  top: number | 'auto';
  left: number | 'auto';
  right: number | 'auto';
  bottom: number | 'auto';
  zIndex: number;
  slotPosition: 'absolute' | 'sticky'; // LayoutAside使用 ： 从应用程序传过来，并将其传至 LayoutAside子组件中。
  slotTop: number;
  slotHeight: number;
}

// import { useCssRender, useFixedTransformStyle } from '../../../hooks';
// import LayoutBlock from './LayoutBlock.vue';
// :parent-width="nameSiteMapping.get(item.key)"
//   :parent-left="item.start"

const sideWidth = ref(200);
const sideStart = ref(300);

interface rtnType {
  state: 'start' | 'move' | 'end';
  id: number;
  side: 'left' | 'right';
  pos: number;
  pageX: number;
}

// 侧边栏数组：用于主程序在调用这个组件时，传入侧边栏数组，以及其他的参数=====================

//  +-----------------------------------------------------------------------------------+
//  |                                 hidden  广告区 可隐藏                              |
//  +-------------------------------------------------------------------+---------------+
//  |                             header                                |               |
//  +-----------------------------------------------------+-------------+               |
//  |                       tab                           |             |               |
//  +-----------------------------------------------------+             |               |
//  |                                                     |             |               |
//  |                                                     |    aside    |    aside      |
//  |                                                     |             |               |
//  |                                                     |             |               |
//  |                                                     |             |               |
//  |                                                     |             |               |
//  +-----------------------------------------------------+-------------+---------------+
//  |                                 hidden  广告区 可隐藏                              |
//  +-----------------------------------------------------------------------------------+
interface Props {
  asideArray?: asideType[];

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

  hiddenPosition: 'relative' | 'sticky'; // 'relative'
  hPosition: 'relative' | 'sticky'; // 'relative'
  tPosition: 'relative' | 'sticky';
  hTop?: number | 'auto';
  hLeft?: number | 'auto';
  hRight?: number | 'auto';
  hBottom?: number | 'auto';
  hzIndex?: number | 'auto';
  hWidth?: number | 'auto';
  hHeight?: number | 'auto';
  hMinHeight?: number | 'auto';
  hPaddingLeft?: number | 'auto';
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
  aLposition?: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
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
  aRposition?: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
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
  fPosition?: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
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
  asideArray: () => [], // 对象或数组需要使用函数，不能直接写默认值
  hasCover: false,
  hasHidden: false,

  hasHeader: true,
  hasTab: true,
  hasAsideLeft: false,
  hasAsideRight: false,
  hasMinimap: true,
  hasFooter: true,

  headerTimeout: false,
  /* 顶部隐藏的广告区 */
  hiddenPosition: 'relative',
  /* Header */
  hPosition: 'sticky',
  hTop: 'auto',
  hLeft: 'auto',
  hRight: 'auto',
  hBottom: 'auto',
  hzIndex: 1001,
  hWidth: 1200,
  hHeight: 'auto',
  hMinHeight: 50,
  hPaddingLeft: 0,
  /* Tab */
  tPosition: 'relative',
  tTop: 'auto',
  tLeft: 'auto',
  tRight: 'auto',
  tBottom: 'auto',
  tzIndex: 1003,
  tWidth: 1200,
  tHeight: 'auto',
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
  fPosition: 'sticky',
  fTop: 'auto',
  fLeft: 'auto',
  fRight: 'auto',
  fBottom: 0,
  fzIndex: 1001,
  fWidth: 1200,
  fHeight: 148
});

// ------------------------------ 变量定义 -----------------------------------------------------
const sx = ref(0);
const sy = ref(0);
sx.value = window.innerWidth - 20;
sy.value = window.innerHeight;
const coverHH = ref(0);
const hiddenHH = ref(0);
const headerHH = ref(0);
const tabHH = ref(0);
const mainh = ref(0);
const mainT = ref(0);
const footerHH = ref(0);

const { x, y } = useWindowScroll();
const coverOut = computed(() => {
  const { hasCover } = props;
  return hasCover && y.value > 400;
});

const appWidth = computed(() => {
  return sx.value;
});

const appHeight = computed(() => {
  return sy.value;
});

const mainMinHeight = computed(() => {
  const hi = hiddenHH.value;
  const he = headerHH.value;
  const ta = tabHH.value;
  const fo = footerHH.value;
  const a = sy.value - hi - he - ta - fo;
  console.log('mainMinHeight-----------------------------aaaaaaaaaaa', a);
  return a;
});

// ------------- 为aside sticky情形 提供top值 会通过props传给 LayoutAside.vue ---------------------------------------------

// 侧边栏aside覆盖hidden
const hiddenTop = computed(() => {
  return coverOut.value ? coverHH.value : 0; // 当 cover出现时，top的值为cover的高度
});

// 侧边栏aside覆盖header
const hT = computed(() => {
  const { hiddenPosition } = props;
  return hiddenPosition === 'sticky' ? hiddenHH.value : 0;
});
const headerTop = computed(() => {
  if (coverOut.value) {
    // 当 cover出现时，如果cover的高度大于hT.value，则top的值为cover的高度
    return coverHH.value > hT.value ? coverHH.value : hT.value;
  }
  return hT.value;
});

// 侧边栏aside覆盖tab
const tT = computed(() => {
  const { hPosition } = props;
  return hPosition === 'sticky' ? hT.value + headerHH.value : headerTop.value; // 如果是sticky的话，那么tab的top就是header的高度
});
const tabTop = computed(() => {
  if (coverOut.value) {
    return coverHH.value > tT.value ? coverHH.value : tT.value;
  }
  return tT.value;
});

// 侧边栏aside 无覆盖
const noneTop = computed(() => {
  const { tPosition } = props;
  const t = tPosition === 'sticky' ? tT.value + tabHH.value : tabTop.value; // 如果是sticky的话，那么tab的top就是header的高度
  if (coverOut.value) {
    return coverHH.value > t ? coverHH.value : t;
  }
  return t;
});
// ------------------------------------------------- aside group 初始化 计算-----------------------------------
const item: asideItem = {
  key: '',
  side: 'left',
  header: 'none',
  footer: false,
  width: -1,
  height: -1,
  start: -1,
  end: -1,
  display: true,
  top: -1,
  left: 'auto',
  right: 'auto',
  bottom: 'auto',
  zIndex: -1,
  draggbale: true,
  slotPosition: 'absolute',
  slotTop: 0,
  slotHeight: 0
};
// 初始化 asideList
const asideList = computed<asideItem[]>(() => {
  const { asideArray } = props;
  const asideData = ref<asideItem[]>([]);
  let sumL = 0;
  let sumR = 0;
  for (let i = 0; i < asideArray.length; i += 1) {
    asideData.value.push({
      ...item
    });
    asideData.value[i].key = asideArray[i].key;
    asideData.value[i].side = asideArray[i].side;
    asideData.value[i].header = asideArray[i].header;
    asideData.value[i].footer = asideArray[i].footer;
    asideData.value[i].width = asideArray[i].width;
    asideData.value[i].display = asideArray[i].display;
    asideData.value[i].slotPosition = asideArray[i].position;
    if (asideArray[i].side === 'left') {
      // 停靠在左边
      asideData.value[i].start = sumL;
      asideData.value[i].end = sumL + asideArray[i].width;
      asideData.value[i].left = sumL; // position
      sumL += asideArray[i].width;
    } else if (asideArray[i].side === 'right') {
      // 停靠在右边
      asideData.value[i].start = sumR;
      asideData.value[i].end = appWidth.value - sumR - asideArray[i].width;
      asideData.value[i].right = sumR;
      sumR += asideArray[i].width;
    }
  }
  console.log('ssssssssssssssssssssssssssssss', asideArray);
  console.log('ssssssssssssssssssssssssssssss', asideData.value);
  return asideData.value;
});

const rtnWidthL = ref(0);
const rtnWidthR = ref(0);
const lorr = ref('');
const myid = ref(0);

const startX = ref<number | 'auto'>(0);
const tempWidth = ref<number>(0);

function setWidthL(rtn: rtnType): void {
  // sideWidth.value = rtn.width;
  if (rtn.state === 'move') {
    // 左边栏 拖动左侧
    if (asideList.value[rtn.id].side === 'left' && rtn.id > 0) {
      // alert(asideList.value[rtn.id].start);
      console.log('sumsmL:::::::::::::::::::::::::::::::::', asideList.value[rtn.id].start);
      const w = tempWidth.value - rtn.pageX + asideList.value[rtn.id].start;
      console.log('w:::::::::::::::::::::::::::::::::', w);
      asideList.value[rtn.id].width = w < 50 ? 50 : w;
      if (w >= 50) {
        asideList.value[rtn.id].left = rtn.pageX;
      } else {
        asideList.value[rtn.id].left =
          typeof asideList.value[rtn.id].start === 'number'
            ? tempWidth.value - 50 + asideList.value[rtn.id].start
            : `auto`;
      }
      // 右边栏 拖动左侧
    } else if (asideList.value[rtn.id].side === 'right') {
      const w = rtn.pageX - asideList.value[rtn.id].start;
    }
  } else if (rtn.state === 'start') {
    console.log('55555555555555555ssssssssssssssssssssssssssssss', asideList.value);
    if (asideList.value[rtn.id].side === 'left' && rtn.id > 0) {
      // asideList.value[rtn.id].start = asideList.value[rtn.id].left;
      tempWidth.value = asideList.value[rtn.id].width;
    } else {
      asideList.value[rtn.id].start = rtn.pageX;
    }
  } else if (rtn.state === 'end') {
    if (asideList.value[rtn.id].side === 'left' && rtn.id > 0) {
      asideList.value[rtn.id].left = rtn.pageX;
    } else {
    }
  }
}
function setWidthR(rtn: rtnType): void {
  // sideWidth.value = rtn.width;
  sideStart.value -= 0;
  // rtnWidthR.value = rtn.width;
  // lorr.value = rtn.lr;
  myid.value = rtn.id;
  console.log('from sub aside: ============', rtn);
  // asideList.value[rtn.id].width = rtn.width;
  // asideList.value[rtn.id].width = rtn.width;
  // asideList.value[rtn.id].right = rtn.left - rtn.right + asideList.value[rtn.id].start;
  // asideList.value[rtn.id].start += rtn.left - rtn.right;
}

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

// ------------ 计算 cover 是否显示 -----------------
// ------------- cover 是指 隐藏的header，当鼠标向下移动超过下面的 198时，就会从顶部向下滑出  -------------
// ------------- coverOut 会传给 边栏子组件 每个边栏子组件都会用到 ------------
// y.value的值最好要大于 hiddenHH.value + headerHH.value + tabHH.value，否则会出现跳动

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
  // 当给 asideWidthR 赋值时，会触发 set 方法 通过下面的handleWidth()方法赋值
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
// -------------------------------- 折叠图标处理 ------------------------------------------
function changeWidth() {
  asideWidthL.value = 0;
}
// -------------------------------- resize处理 ------------------------------------------

// const layouth = ref(0);
const footero = ref(0);

const eleOb = ref<ResizeObserverEntry>();

const tt = computed(() => {
  return mainT.value;
});

interface allHeight {
  header: number;
  tab: number;
  footer: number;
}

const allHeightV: allHeight = {
  header: 0,
  tab: 0,
  footer: 0
};

// type Auto = number | 'auto';
// const headerHeight = ref<Auto>(0);

const info1 = ref(null);
const { height } = useElementSize(info1);
const headerHeight = computed(() => {
  return height.value;
});

// ResizeObserver 可以监听元素的变化，比如元素的高度变化，宽度变化，位置变化等等。
// ResizeObserver 监听所有 class 含有 .info的元素变化，并且记录其高度
// 包含：cover, hidden, header, tab, footer
// 下面的case里的 cover，表示 侧栏会覆盖 cover
// 下面的case里的 hidden，表示 侧栏会覆盖 hidden
// 下面的case的的 header，表示 侧栏会覆盖 header
// 下面的case的的 tab，表示 侧栏会覆盖 tab
// 下面的case的的 nono，表示 侧栏会被隐藏在tab之下
// 下面的case的的 footer，表示 侧栏会覆盖 footer

// https://www.yuque.com/asialine/zhiqix/sdg96x#wAVLr
// 侧边栏 有两级node， 上一级 position是absolute, 可以是 div, aside, ... 根据 应用程序 tag 传入
// 第二级，是一个slot子组件： LayoutAside.vue. 它根据应用程序的slotPosition传入的 值，来决定是否显示
// 第二级，如果 slotPosition 是 sticky ，那么它是一个div含slot
// 第二级，如果 slotPosition 如果是absolute，那么仅为一个slot。见LayoutAside.vue
// 下面的asideList.value[i].height，是指侧边栏上级的高度。供 【:style="asideStyle(item)"】使用
// 下面的asideList.value[i].slotHeight，是指侧边栏第二级的高度。供LayoutAside.vue用
//
//  侧边栏的两级div配置：
//  +-----------------+ <= asideList.value[i].height     position:absolute;
//  |+---------------+| <= asideList.value[i].slotHeight position: sticky ;
//  ||               ||
//  ||      slot     ||
//  ||               ||
//  ||               ||
//  |+---------------+| <=  由子组件 LayoutAside.vue 根据 slotPosition 来判断 如果是absolute，则没有里面的div
//  |                 |     如果是 sticky 则 有里面的div，其position  是 sticky
//  |                 |
//  |                 |
//  +-----------------+
onMounted(() => {
  // 只有 entries[0]有内容，虽然是观察多个，但是一个一个返回的。
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      // console.log('11111obobobobobobobobobobob', entry);
      eleOb.value = entry;
      if (entry.target.id === 'xia-layout-cover') {
        coverHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-hidden') {
        hiddenHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-header') {
        headerHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-tab') {
        tabHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-main') {
        mainh.value = entry.contentRect.height;
        // mainh.value = entry.contentRect.height < sy.value ? sy.value : entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-footer') {
        footerHH.value = entry.contentRect.height;
      }
      mainT.value = hiddenHH.value + headerHH.value + tabHH.value;

      // z-index :
      // cover 8000
      // hidden 7000
      // header 6000
      // tab    5000
      // main   4000
      // footer 3000

      for (let i = 0; i < asideList.value.length; i += 1) {
        // header:	'cover' | 'hidden' | 'header' | 'tab' | 'none';
        switch (props.asideArray[i].header) {
          case 'cover': {
            asideList.value[i].top = 0;
            asideList.value[i].slotTop = 0;
            asideList.value[i].zIndex = 8500;
            const w = coverHH.value + hiddenHH.value + headerHH.value + tabHH.value + mainh.value;
            asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w;
            break;
          }
          case 'hidden': {
            asideList.value[i].top = 0;
            asideList.value[i].slotTop = hiddenTop.value;
            asideList.value[i].zIndex = 7500;
            const w = coverHH.value + hiddenHH.value + headerHH.value + tabHH.value + mainh.value;
            asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w;
            break;
          }
          case 'header': {
            asideList.value[i].top = hiddenHH.value;
            asideList.value[i].slotTop = headerTop.value;
            asideList.value[i].zIndex = 6500;
            const w = coverHH.value + headerHH.value + tabHH.value + mainh.value;
            asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w;
            break;
          }
          case 'tab': {
            asideList.value[i].top = hiddenHH.value + headerHH.value;
            asideList.value[i].slotTop = tabTop.value;
            asideList.value[i].zIndex = 5500;
            const w = coverHH.value + tabHH.value + mainh.value;
            asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w;
            break;
          }
          case 'none': {
            asideList.value[i].top = hiddenHH.value + headerHH.value + tabHH.value;
            asideList.value[i].slotTop = noneTop.value;
            asideList.value[i].zIndex = 4000;
            const w = coverHH.value + mainh.value;
            asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w;
            break;
          }
          default: {
            asideList.value[i].top = mainT.value;
            asideList.value[i].zIndex = 4000;
            const w = coverHH.value + mainh.value;
            asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w;
            break;
          }
        }
      }
    });
  });
  const boxes = document.querySelectorAll('.info') as NodeListOf<Element>;
  boxes.forEach(box => {
    resizeObserver.observe(box);
  });
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

// 计算高度 --------------------------------------------------------------------------

// 计算高度 --------------------------------------------------------------------------

function onResize() {
  // 下面的 -20是为了让页面滚动条不占用宽度
  sx.value = window.innerWidth - 20;
  sy.value = window.innerHeight;
  console.log('999999999999999999999999999999999999999999999', sx.value);
  // const element = document.querySelector('.main') as HTMLElement;
  // mainh.value = element.offsetHeight < sy.value ? sy.value : element.offsetHeight;
  // console.log('ttttttttttttttttttttttttt', mainh.value);
}

// onBeforeMount(() => {
//   sx.value = window.innerWidth - 20;
//   sy.value = window.innerHeight;
//   console.log('ooooooooooooooooooo', sx.value, sy.value);
// });
const xaa = ref(0);
onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
  if (props.hasAsideLeft) {
    handleWidth('.resizeL', true);
  }
  // if (props.hasAsideRight) {
  //   handleWidth('.resizeR', false);
  // }
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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++ begin

// +++++++++++++++++++++++++++++++++++++++++++++++++++++ end

const coverStyle = computed(() => {
  // const { hPosition } = props;
  return `
		position: sticky;
		top: 0px;
		left: 0px;
		width: ${sx.value}px;
		min-height:140px;
		height: 48px;
		z-index: 8000;
    background-color: rgb(240, 121, 17);
	`;
});

const hiddenStyle = computed(() => {
  const { hiddenPosition } = props;
  return `
		width: ${sx.value}px;
		position: ${hiddenPosition};
		top: 0px;
		left: 0px;
		min-height:50px;
		z-index: 7000;
		background-color: #ae55ee;
	`;
});

// header 的样式
// header 的 position 从 应用程序 传过来。值为 fixed 和 absolute
const headerStyle = computed(() => {
  const { hiddenPosition, hPosition, hMinHeight } = props;
  const t = hiddenPosition === 'sticky' ? hiddenHH.value : 0;
  const h = hPosition === 'sticky' ? t : 0;
  return `
		width: ${sx.value}px;
		position: ${hPosition};
		min-height: ${hMinHeight}px;
		top: ${h}px;
		left: 0px;
		z-index: 6000;
		background-color: #e2e2e2;
	`;
});
// tab 的样式
const tabStyle = computed(() => {
  const { hiddenPosition, hPosition, tPosition, tHeight, tMinHeight } = props;
  const height1 = isString(tHeight) ? tHeight : `${tHeight}px`;
  const m = hiddenPosition === 'sticky' ? hiddenHH.value : 0;
  const t = hPosition === 'sticky' ? m + headerHH.value : m;
  const h = tPosition === 'sticky' ? t : 0;
  return `
		width: ${sx.value}px;
		height: ${height1};
		min-height: ${tMinHeight}px;
		position: ${tPosition};
		top: ${h}px;
		left: 0px;
		z-index: 5000;
		background-color: #ae4423;
	`;
});

const mainStyle = computed(() => {
  const { tTop, aLwidth, tRight } = props;
  console.log(
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa mainh.value',
    mainMinHeight.value
  );
  return `
		width: ${mainWidth.value}px;
		position: relative;
		top: 0px;
		left: ${aLwidth + 10}px;
		right: ${tRight}px;
		z-index: 1001;
		min-height: ${mainMinHeight.value}px;

		background-color: #f1f1f1;
	`;
});

const asideLStyle = computed(() => {
  const { aLleft, aLright } = props;
  return `
		position: absolute;
		top: ${asideLTop.value}px;
		left: ${aLleft}px;
		right: ${aLright}px;
		bottom: 0px;
		width: ${widthL.value}px;
    height: 30px;
		z-index: 1001;
	`;
});

const asideStyle = computed(() => (it: asideItem) => {
  return `
		position: absolute;
		top: ${it.top}px;
		left: ${it.left}px;
		right: ${it.right}px;
		bottom: auto;
		width: ${it.width}px;
    height: ${it.height}px;
		z-index:  ${it.zIndex};
		background-color: #f1f1f1;
	`;
});

const footerStyle = computed(() => {
  const { fPosition, fzIndex, fBottom } = props;
  return `

		position: ${fPosition};
		bottom: 0px;
		z-index: ${fzIndex};
		background-color: #ae4423;
		min-height:50px;
		width: ${sx.value}px;
		height: ${footerHH.value}px;
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
.xia-layout-cover {
}

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

.v-enter-active {
  transition: opacity 0.8s ease;
}

.v-enter-from {
  opacity: 0;
}

.xia-layout-hidden-enter-active,
.xia-layout-hidden-leave-active {
  transition: opacity 0.8s ease;
}

.xia-layout-hidden-enter-from,
.xia-layout-hidden-leave-to {
  opacity: 0;
}
/*
.xia-layout-hidden-leave-active {
  transition: opacity 0.8s ease;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
} */
</style>
