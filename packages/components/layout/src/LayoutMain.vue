<template>
  <div class="layout" :style="layoutStyle">
    <div v-show="coverOut" id="xia-layout-cover" class="xia-layout-cover xiaLayoutInfo" :style="coverStyle">
      <slot name="cover"></slot>
    </div>

    <Transition name="xia-layout-hidden">
      <div
        v-show="props.hasHidden"
        id="xia-layout-hidden"
        class="xia-layout-hidden xiaLayoutInfo asideClass"
        :style="hiddenStyle"
      >
        <slot name="hidden">这里是广告区</slot>
      </div>
    </Transition>

    <header
      v-show="props.hasHeader"
      id="xia-layout-header"
      class="xia-layout-header xiaLayoutInfo asideClass"
      :style="headerStyle"
    >
      <slot name="header"></slot>
    </header>
    <div v-show="props.hasTab" id="xia-layout-tab" class="xia-layout-tab xiaLayoutInfo asideClass" :style="tabStyle">
      <slot name="tab"> </slot>
    </div>

    <main
      id="xia-layout-main"
      class="xiaLayoutInfo asideClass"
      :style="mainStyle"
      :class="{ footeradClass1: !props.hasFooterAd }"
    >
      <slot name="main"></slot>
      <div v-if="fPos === 'fixed' && props.pageScroll" :style="mainLastStyle">
        <slot name="mainlast"> 还好吗,这里是主显示区的底部区域,感谢使用 {{}} -- {{ appWidth }} -- {{}}</slot>
      </div>
    </main>

    <component
      :is="'aside'"
      v-for="(item, index) of asideList"
      :key="index"
      :style="asideStyle(item)"
      :class="{ asideClass: item.display === 2, asideClass1: item.display != 2 }"
    >
      <layout-aside
        :id="index"
        :aside-position="item.slotPosition"
        :aside-top="item.slotTop"
        :aside-height="item.slotHeight"
        :aside-width="item.width"
        :is-left="item.side === 'left'"
        :is-right="item.side === 'right'"
        :is-toggle="item.toggle"
        :is-draggbale="item.draggbale"
        :on-toggle="onToggle"
        :toggle-postion="togglePos"
        @update:width-l="setWidthL"
        @update:width-r="setWidthR"
        @update:toggle="setToggle"
      >
        <template #aside>
          <slot :name="`${item.key}`"> slot-name: {{ item.key }}无天 </slot>
        </template>
      </layout-aside>
    </component>

    <footer
      v-show="props.hasFooter"
      id="xia-layout-footer"
      ref="footerRef"
      class="footer xiaLayoutInfo"
      :class="{ footeradClass1: !props.hasFooterAd }"
      :style="footerStyle"
    >
      <div v-show="fPos === 'fixed'" ref="resizeF" class="f-resize"></div>
      <slot name="footer"></slot>
      <div>$$$$$$$$$$: {{ appWidth }} {{ appHeight }} ==== {{ winSize.width }}</div>
    </footer>

    <div
      id="xia-layout-footer-ad"
      :class="{ footeradClass: !props.hasFooterAd, xiaLayoutInfo: true }"
      :style="footerAdStyle"
    >
      <slot name="footer-ad"></slot>
    </div>

    <div v-for="(item, index) of dispLeft" :key="index" :style="toggleStyleL" @click="toggleAsideL(item)">
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
            d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
          ></path>
        </svg>
      </div>
    </div>

    <div v-for="(item, index) of dispRight" :key="index" :style="toggleStyleR" @click="toggleAsideR(item)">
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
            d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { truncate } from 'fs';
import { ref, computed, onMounted, watch } from 'vue';
import { isString, useDraggable, useWindowScroll, useWindowSize } from '@vueuse/core';
import type { asideItem, barsType } from '@asialine/xia-ui/layout';
import type { Position } from '@vueuse/core';
import { stubTrue } from 'lodash-es';
import { asideWidth, useAsideList } from './composables/useAsideList';
import LayoutAside from './LayoutAside.vue';

interface rtnType {
  state: 'start' | 'move' | 'end';
  id: number;
  side: 'left' | 'right';
  pos: number;
  pageX: number;
}

// 侧边栏数组：用于主程序在调用这个组件时，传入侧边栏数组，以及其他的参数======================

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
//  |                                 footer  广告区 可隐藏                              |
//  +-----------------------------------------------------------------------------------+
interface Props {
  /** 侧边栏数组 */
  asideArray?: asideItem[];
  /** 顶部冒出区 */
  hasCover?: boolean;
  /** 顶部隐藏的广告区 */
  hasHidden?: boolean;
  hasHeader?: boolean;
  hasTab?: boolean;
  hasFooter?: boolean;
  /** 底部广告区 */
  hasFooterAd?: boolean;

  hiddenPosition: 'relative' | 'sticky'; // 'relative'
  hPosition: 'relative' | 'sticky'; // 'relative'
  tPosition: 'relative' | 'sticky';
  fPosition?: 'relative' | 'fixed';
  /** 主页面滚动还是不变。true:主页面滚动，main区不滚动。 false: 主页面不滚动，main区滚动 */
  pageScroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  asideArray: () => [], // 对象或数组需要使用函数，不能直接写默认值
  hasCover: false,
  hasHidden: false,
  hasHeader: true,
  hasTab: true,
  hasFooter: false,
  hasFooterAd: false,

  hiddenPosition: 'relative',
  hPosition: 'sticky',

  /* Tab */
  tPosition: 'relative',

  /* Footer */
  fPosition: 'relative',

  pageScroll: true
});

// ------------------------------ 变量定义 -----------------------------------------------------
/** isTransition 侧边栏过渡动画，初始值是关闭的 */
const isTransition = ref(false);

/** Toggle 侧边栏显隐按钮被点击时，侧边栏会有一个动画过渡，过渡时，不显示这个按钮  */
const onToggle = ref(true);

/** 过渡动画时长（秒） */
const onToggleTime = 20;

const winSize = useWindowSize();

const coverHH = ref(0);
const hiddenHH = ref(0);
const headerHH = ref(0);
const tabHH = ref(0);
const mainHH = ref(0);
const footerHH = ref(0);
// const footerAdHH = ref(0);
const footerAdHH0 = ref(0);
const footerAdHH1 = ref(200);

const footerAdHH = computed(() => {
  return props.hasFooterAd ? footerAdHH0.value : 0;
});

watch(
  () => [footerAdHH0],
  () => {
    footerAdHH1.value = footerAdHH0.value;
  },
  { immediate: true, deep: true }
);

watch(
  () => [props.hasFooterAd],
  () => {
    setTimeout(() => {
      footerAdHH1.value = footerAdHH.value;
    }, onToggleTime * 1000);
  },
  { deep: true }
);

/**  appWidth  整个应用的宽度  charmi 滚动条宽度需要计算出来 */
const appWidth = computed(() => {
  return props.pageScroll ? winSize.width.value - 17 : winSize.width.value;
});

/** 整个应用程序高度(可见部分) - 底部广告区域部分  */
const appHeight = computed(() => {
  return winSize.height.value - footerAdHH.value;
});

/** 容器的高度 即main区域可见部分高度 */
const containerHH = computed(() => {
  return appHeight.value - hiddenHH.value - headerHH.value - tabHH.value;
});

/** pageScroll为固定(false)的情况下 main的高度 */
const mainHeight = computed(() => {
  return containerHH.value - footerHH.value < 20 ? 20 : containerHH.value - footerHH.value;
});

// ------------ 计算 cover 是否显示 -----------------
// ------------- cover 是指 隐藏的header，当鼠标向下移动超过下面的 400 时，就会从顶部向下滑出  -------------
// ------------- coverOut 会传给 边栏子组件 每个边栏子组件都会用到 ------------
// y.value的值最好要大于 hiddenHH.value + headerHH.value + tabHH.value，否则会出现跳动
const { y } = useWindowScroll();
// const newXY = useWindowScroll({ eventFilter: debounceFilter(100) });
// const update = debounce(useWindowScroll(), 100);

const coverOut = computed(() => {
  const { hasCover } = props;
  return hasCover && y.value > 400;
});

// ------------------------------------------------- aside group 初始化 计算-----------------------------------

const { asideList } = useAsideList(props.asideArray, props.pageScroll);
/**  bars 用于记录 cover,hidden,header,tab,main,footer 的宽度及起点 */
const bars = ref<barsType>({
  cover: { left: 0, width: 0 },
  hidden: { left: 0, width: 0 },
  header: { left: 0, width: 0 },
  tab: { left: 0, width: 0 },
  main: { left: 0, width: 0 },
  footer: { left: 0, width: 0 }
});

const dispLeft = ref<number[]>([]);
const dispRight = ref<number[]>([]);
for (let i = 0; i < asideList.value.length; i += 1) {
  if (asideList.value[i].display === 0) {
    if (asideList.value[i].side === 'left') {
      dispLeft.value.push(i);
    } else if (asideList.value[i].side === 'right') {
      dispRight.value.push(i);
    }
  }
}

// asideWidth(asideList, winSize.width, bars);

// ---【aside sticky的 top值】-------计算  通过props传给 LayoutAside.vue ------
// *************************************************************************
// 侧边栏aside覆盖 hidden
const hiddenTop = computed(() => {
  return coverOut.value ? coverHH.value : 0; // 当 cover出现时，top的值为cover的高度
});

// 侧边栏aside覆盖 header
const hT = computed(() => {
  const { hiddenPosition } = props;
  return hiddenPosition === 'sticky' ? hiddenHH.value : 0;
});
const headerTop = computed(() => {
  if (coverOut.value) {
    // 当 cover出现时，如果cover的高度大于hT.value(hidden的高度)，则top的值为cover的高度，要下移。
    return coverHH.value > hT.value ? coverHH.value : hT.value;
  }
  return hT.value;
});

// 侧边栏aside覆盖 tab
const tT = computed(() => {
  const { hPosition } = props;
  return hPosition === 'sticky' ? hT.value + headerHH.value : hT.value;
});
const tabTop = computed(() => {
  if (coverOut.value) {
    return coverHH.value > tT.value ? coverHH.value : tT.value;
  }
  return tT.value;
});

// 侧边栏aside 无覆盖 none
const noneTop = computed(() => {
  const { tPosition } = props;
  const t = tPosition === 'sticky' ? tT.value + tabHH.value : tT.value;
  if (coverOut.value) {
    return coverHH.value > t ? coverHH.value : t;
  }
  return t;
});

const togglePos = computed(() => {
  return winSize.height.value / 2 - 20;
});
// *************************************************************************

/** 如果 main区是固定的话,则底部只能是fixed */
const fPos = computed(() => {
  const { pageScroll, fPosition } = props;
  return pageScroll ? fPosition : 'fixed';
});

// -----【计算侧边栏sticky时的高度 不低于20】计算---- 为aside sticky情形 提供计算aside高度 通过props传给 LayoutAside.vue
const asideHeighCalc = () => {
  const { hiddenPosition, hPosition, tPosition } = props;
  const t0 = hiddenPosition === 'relative' ? hiddenHH.value : 0;
  const t1 = hPosition === 'relative' ? headerHH.value : 0;
  const t2 = tPosition === 'relative' ? tabHH.value : 0;

  for (let i = 0; i < asideList.value.length; i += 1) {
    switch (asideList.value[i].header) {
      case 'cover': {
        const hr = appHeight.value;
        if (fPos.value === 'relative') {
          asideList.value[i].slotHeight = hr;
        } else if (fPos.value === 'fixed') {
          const hrr = hr - footerHH.value < 20 ? 20 : hr - footerHH.value;
          asideList.value[i].slotHeight = asideList.value[i].footer ? hr : hrr;
        }

        break;
      }
      case 'hidden': {
        let hr = appHeight.value - hiddenTop.value;
        if (!props.pageScroll) {
          hr = appHeight.value;
        }
        if (fPos.value === 'relative') {
          asideList.value[i].slotHeight = hr;
        } else if (fPos.value === 'fixed') {
          const hrr = hr - footerHH.value < 20 ? 20 : hr - footerHH.value;
          asideList.value[i].slotHeight = asideList.value[i].footer ? hr : hrr;
        }

        break;
      }
      case 'header': {
        const hh = t0 - y.value > 0 ? t0 - y.value : 0;
        let hr = appHeight.value - headerTop.value - hh;
        if (!props.pageScroll) {
          hr = appHeight.value - hiddenHH.value;
        }
        if (fPos.value === 'relative') {
          asideList.value[i].slotHeight = hr;
        } else if (fPos.value === 'fixed') {
          const hrr = hr - footerHH.value < 20 ? 20 : hr - footerHH.value;
          asideList.value[i].slotHeight = asideList.value[i].footer ? hr : hrr;
        }

        break;
      }
      case 'tab': {
        const hh = t0 + t1 - y.value > 0 ? t0 + t1 - y.value : 0;
        let hr = appHeight.value - tabTop.value - hh;
        if (!props.pageScroll) {
          hr = appHeight.value - hiddenHH.value - headerHH.value;
        }
        if (fPos.value === 'relative') {
          asideList.value[i].slotHeight = hr;
        } else if (fPos.value === 'fixed') {
          const hrr = hr - footerHH.value < 20 ? 20 : hr - footerHH.value;
          asideList.value[i].slotHeight = asideList.value[i].footer ? hr : hrr;
        }

        break;
      }
      case 'none': {
        const hh = t0 + t1 + t2 - y.value > 0 ? t0 + t1 + t2 - y.value : 0;
        let hr = appHeight.value - noneTop.value - hh;
        if (!props.pageScroll) {
          hr = appHeight.value - hiddenHH.value - headerHH.value - tabHH.value;
        }
        if (fPos.value === 'relative') {
          asideList.value[i].slotHeight = hr;
        } else if (fPos.value === 'fixed') {
          const hrr = hr - footerHH.value < 20 ? 20 : hr - footerHH.value;
          asideList.value[i].slotHeight = asideList.value[i].footer ? hr : hrr;
        }

        break;
      }
      default: {
        break;
      }
    }
  }
};

const ttmm = computed(() => {
  return coverHH.value + hiddenHH.value + headerHH.value + tabHH.value + 100;
});

// debouncedWatch(
watch(
  () => [appWidth, appHeight, coverHH, hiddenHH, headerHH, tabHH, footerHH],
  () => {
    asideHeighCalc();
  },
  {
    immediate: true,
    deep: true
    // debounce: 300
  }
);
watch(
  () => [y],
  () => {
    // 【 charmi 当鼠标下滑到 y.value 超过 coverHH.value + hiddenHH.value + headerHH.value + tabHH.value时
    // 屏幕变稳定了，所以不应该再计算高度了 】
    if (y.value > ttmm.value && y.value < mainHH.value - footerHH.value) {
      return;
    }
    asideHeighCalc();
  },
  {
    immediate: true,
    deep: true
    // debounce: 300
  }
);
// ---------------------------------拖动改变宽度-----------------------------------------

const startX = ref<number>(0);
const tempWidth = ref<number>(0);
const tempMain = ref<number>(0);
function setWidthL(rtn: rtnType): void {
  if (rtn.state === 'move') {
    const aaa = startX.value - rtn.pageX;
    const bbb = aaa > tempMain.value - 600 ? tempMain.value - 600 : aaa;
    const tt = tempWidth.value + bbb;
    asideList.value[rtn.id].width = tt < 50 ? 50 : tt;
  } else if (rtn.state === 'start') {
    isTransition.value = false;
    startX.value = rtn.pageX;
    tempWidth.value = asideList.value[rtn.id].width;
    tempMain.value = bars.value.main.width;
  } else if (rtn.state === 'end') {
    isTransition.value = true;
    // need to save charmi
    // 在这里最后改变main的宽度
  }
}
function setWidthR(rtn: rtnType): void {
  if (rtn.state === 'move') {
    const aaa = rtn.pageX - startX.value;
    const bbb = aaa > tempMain.value - 600 ? tempMain.value - 600 : aaa;
    const tt = tempWidth.value + bbb;
    asideList.value[rtn.id].width = tt < 50 ? 50 : tt;
  } else if (rtn.state === 'start') {
    /** isTransition 侧边栏拖动之前，将侧边栏过渡动画关闭 */
    isTransition.value = false;
    startX.value = rtn.pageX;
    tempWidth.value = asideList.value[rtn.id].width;
    tempMain.value = bars.value.main.width;
  } else if (rtn.state === 'end') {
    /** isTransition 侧边栏拖动之后，将侧边栏过渡动画打开 */
    isTransition.value = true;
    // need to save
  }
}

function setToggle(id: number, side: string): void {
  /** onToggle 点击侧边栏显隐图标后，先让侧边栏显隐图标不显示 */
  onToggle.value = false;
  isTransition.value = true;
  asideList.value[id].display = 0;
  if (side === 'left') {
    dispLeft.value.push(id);
  } else {
    dispRight.value.push(id);
  }
  setTimeout(() => {
    /** onToggle 等待onToggleTime（秒）后，让侧边栏显隐图标显示出来 */
    onToggle.value = true;
    isTransition.value = false;
  }, onToggleTime * 1000);
}
function toggleAsideL(id: number): void {
  onToggle.value = false;
  isTransition.value = true;
  asideList.value[id].display = 2;
  dispLeft.value.pop();
  setTimeout(() => {
    onToggle.value = true;
    isTransition.value = false;
  }, onToggleTime * 1000);
}
function toggleAsideR(id: number): void {
  onToggle.value = false;
  isTransition.value = true;
  asideList.value[id].display = 2;
  dispRight.value.pop();
  setTimeout(() => {
    onToggle.value = true;
    isTransition.value = false;
  }, onToggleTime * 1000);
}

// function toggleAside(id: number): void {
//   asideList.value[id].display = 2;
// }

// -------------------------------- resize处理 -------------------------------------------
// type Auto = number | 'auto';
// const headerHeight = ref<Auto>(0);

// ResizeObserver 可以监听元素的变化，比如元素的高度变化，宽度变化，位置变化等等。
// ResizeObserver 监听所有 class 含有 .xiaLayoutInfo的元素变化，并且记录其高度
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

//  侧边栏的两级div配置：
//  +-----------------+ <= asideList.value[i].height     position: absolute;
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
  /**  只有 entries[0]有内容，虽然是观察多个，但是一个一个返回的。 */
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      if (entry.target.id === 'xia-layout-cover') {
        coverHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-hidden') {
        hiddenHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-header') {
        headerHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-tab') {
        tabHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-main') {
        mainHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-footer') {
        footerHH.value = entry.contentRect.height;
      } else if (entry.target.id === 'xia-layout-footer-ad') {
        footerAdHH0.value = entry.contentRect.height;
      }

      // 计算 aside的高度 【在absolute的情况下的高度，属于外层高度】
      for (let i = 0; i < asideList.value.length; i += 1) {
        // header:	'cover' | 'hidden' | 'header' | 'tab' | 'none';
        switch (asideList.value[i].header) {
          case 'cover': {
            asideList.value[i].top = 0;
            asideList.value[i].slotTop = 0;
            const w = coverHH.value + hiddenHH.value + headerHH.value + tabHH.value + mainHH.value;
            if (fPos.value === 'fixed') {
              asideList.value[i].height = props.pageScroll ? w : appHeight.value;
            } else {
              asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w - footerAdHH.value;
            }
            break;
          }
          case 'hidden': {
            asideList.value[i].top = 0;
            asideList.value[i].slotTop = hiddenTop.value;
            const m = coverHH.value;
            const w = coverHH.value + hiddenHH.value + headerHH.value + tabHH.value + mainHH.value;
            if (fPos.value === 'fixed') {
              asideList.value[i].height = props.pageScroll ? w : appHeight.value - m;
            } else {
              asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w - footerAdHH.value;
            }
            break;
          }
          case 'header': {
            asideList.value[i].top = hiddenHH.value;
            asideList.value[i].slotTop = headerTop.value;
            const m = coverHH.value + hiddenHH.value;
            const w = coverHH.value + headerHH.value + tabHH.value + mainHH.value;
            if (fPos.value === 'fixed') {
              asideList.value[i].height = props.pageScroll ? w : appHeight.value - m;
            } else {
              asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w - footerAdHH.value;
            }
            break;
          }
          case 'tab': {
            asideList.value[i].top = hiddenHH.value + headerHH.value;
            asideList.value[i].slotTop = tabTop.value;
            const m = coverHH.value + hiddenHH.value + headerHH.value;
            const w = coverHH.value + tabHH.value + mainHH.value;
            if (fPos.value === 'fixed') {
              asideList.value[i].height = props.pageScroll ? w : appHeight.value - m;
            } else {
              asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w - footerAdHH.value;
            }
            break;
          }
          case 'none': {
            asideList.value[i].top = hiddenHH.value + headerHH.value + tabHH.value;
            asideList.value[i].slotTop = noneTop.value;
            const m = coverHH.value + hiddenHH.value + headerHH.value + tabHH.value;
            const w = coverHH.value + mainHH.value;
            if (fPos.value === 'fixed') {
              asideList.value[i].height = props.pageScroll ? w : appHeight.value - m;
            } else {
              asideList.value[i].height = asideList.value[i].footer ? w + footerHH.value : w - footerAdHH.value;
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  });
  const boxes = document.querySelectorAll('.xiaLayoutInfo') as NodeListOf<Element>;
  boxes.forEach(box => {
    resizeObserver.observe(box);
  });
});

// watch(
//   () => [props.hasFooterAd, footerAdHH1],
//   () => {
//     footerAdHH.value = props.hasFooterAd ? footerAdHH1.value : 0;
//   },
//   {
//     immediate: true
//     // deep: true
//     // debounce: 300
//   }
// );

// 测试代码 --------------------------------------------------------------------------
// setTimeout(() => {
//   asideDisplay(asideList, 1);
// }, 6000);
// setTimeout(() => {
//   asideDisplay(asideList, 1);
// }, 2000);
// setTimeout(() => {
//   asideDisplay(asideList, 1);
//   asideList.value[3].width = 300;
// }, 4000);
// setTimeout(() => {
//   asideDisplay(asideList, 1);
//   asideList.value[7].width = 240;
// }, 5000);
// setTimeout(() => {
//   asideDisplay(asideList, 1);
// }, 3000);
// setTimeout(() => {
//   asideDisplay(asideList, 1);
// }, 7000);

// setTimeout(() => {
//   asideSwitch({ list: asideList, m: 1, n: 0, sy: winSize.width.value });
// }, 3000);

// 可以观察自己的属性 ---------------------------------------------------------------
watch(
  () => [asideList, appWidth],
  () => {
    asideWidth(asideList, appWidth, bars);
  },
  { immediate: true, deep: true }
);

// 底部可以拖动的高度 ---------------------------------------------------------------
const startY = ref<number>(0);
const tempHeight = ref<number>(0);

type Auto = number | 'auto';
const footerHeight = ref<Auto>('auto');
// const mainHeight = ref<Auto>('auto');
const resizeF = ref<HTMLElement | null>(null);
useDraggable(resizeF, {
  onStart: (position: Position, event: PointerEvent) => {
    /** isTransition 侧边栏拖动之前，将侧边栏过渡动画关闭 */
    isTransition.value = false;
    startY.value = event.pageY;
    tempHeight.value = footerHH.value;
  },
  onMove: (position: Position, event: PointerEvent) => {
    footerHeight.value = tempHeight.value + startY.value - event.pageY;
    footerHeight.value = footerHeight.value > containerHH.value ? containerHH.value : footerHeight.value;
  },
  onEnd: (position: Position, event: PointerEvent) => {
    /** isTransition 侧边栏拖动完成后，将侧边栏过渡动画打开 */
    isTransition.value = true;
    // state: 'start', id: props.id, side: 'right', pos: position.x, pageX: event.pageX
    // mainHeight.value = 'auto'; // charmi 还可以修改成不跳动
  },
  preventDefault: true
});

// mainLastHH 用于在main区内部 新加一个div,使main区变高,以免被底部区域遮挡
// 下面 -50,表示 main区域不被顶部区域遮挡的高度，如果是0，则向下滚动到底时, main区域会被顶部区域全部遮挡
const mainLastHH = computed(() => {
  const temp = winSize.height.value - noneTop.value;
  const x1 = temp < 50 ? 50 : temp;
  return fPos.value === 'fixed' ? x1 - 50 : x1;
});

// ------------------------------------------ 计算页面样式 ------------------------------------------------
// layout页面的样式
const layoutStyle = computed(() => {
  const layoutHei = props.pageScroll ? 'auto' : '100vh';
  return `
    margin: 0px;
    width: ${appWidth.value}px;
		height: ${layoutHei};
    position: relative;
		background-color: #fff;
  `;
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++ begin
const coverStyle = computed(() => {
  return `
		position: sticky;
		top: 0px;
		left: ${bars.value.cover.left}px;
		width: ${bars.value.cover.width}px;
		z-index: 8000;
    background-color: rgb(190, 181, 187);
	`;
});

const hiddenStyle = computed(() => {
  const { hiddenPosition } = props;
  return `
		position: ${hiddenPosition};
		top: 0px;
		left: ${bars.value.hidden.left}px;
		width: ${bars.value.hidden.width}px;
		min-height:50px;
		z-index: 7000;
		background-color: #ae55ee;
	`;
});

// header 的样式
// header 的 position 从 应用程序 传过来。值为 fixed 和 absolute
const headerStyle = computed(() => {
  const { hiddenPosition, hPosition } = props;
  const t = hiddenPosition === 'sticky' ? hiddenHH.value : 0;
  const h = hPosition === 'sticky' ? t : 0;
  return `
		position: ${hPosition};
		top: ${h}px;
		left: ${bars.value.header.left}px;
		width: ${bars.value.header.width}px;
		z-index: 6000;
		min-height: 80px;
		background-color: #fff;
	`;
});
// tab 的样式
const tabStyle = computed(() => {
  const { hiddenPosition, hPosition, tPosition } = props;
  const m = hiddenPosition === 'sticky' ? hiddenHH.value : 0;
  const t = hPosition === 'sticky' ? m + headerHH.value : m;
  const h = tPosition === 'sticky' ? t : 0;
  return `
		position: ${tPosition};
		top: ${h}px;
		left: ${bars.value.tab.left}px;
		width: ${bars.value.tab.width}px;
		z-index: 5000;
		background-color: #ae4423;
	`;
});

const mainStyle = computed(() => {
  // const mainHei = isString(mainHeight.value) ? mainHeight.value : `${mainHeight.value}px`;
  const mainHei = props.pageScroll ? 'auto' : `${mainHeight.value}px`;
  const minHei = fPos.value === 'relative' ? appHeight.value : 0;
  return `
		position: relative;
		top: 0px;
		left: ${bars.value.main.left}px;
		width: ${bars.value.main.width}px;
		z-index: 1000;
		height: ${mainHei};
		min-height: ${minHei}px;
		background-color: #f1f1f1;
		overflow: auto;
	`;
});

const mainLastStyle = computed(() => {
  return `
		position: relative;
		height:${mainLastHH.value}px;
		overlow: hidden;
		z-index: 1000;
	`;
});

/** aside 外层样式
 *  如果是sticky的话,里层的样式在 LayoutAside 组件中定义
 *
 *
 */
const asideStyle = computed(() => (it: asideItem) => {
  const asideL = isString(it.left) ? 'auto' : `${it.left}px`;
  const asideR = isString(it.right) ? 'auto' : `${it.right}px`;
  let xx: string;
  if (it.display === 2) {
    xx = 'none';
  } else {
    xx = it.side === 'left' ? `-${it.width}px` : `${it.width}px`;
  }
  return `
		position: absolute;
		top: ${it.top}px;
		left: ${asideL};
		right: ${asideR};
		bottom: 0px;
		width: ${it.width}px;
    height: ${it.height}px;
		z-index:  ${it.zIndex};
		background-color: #f1f1f1;
		transform: translateX(${xx});
	`;
});

const toggleStyleR = computed(() => {
  return `
		position: fixed;
		top: ${togglePos.value}px;
		right: 0px;
		width: 12px;
		height: 40px;
		z-index: 9999;
	`;
});

const toggleStyleL = computed(() => {
  return `
		position: fixed;
		top: ${togglePos.value}px;
		left: 0px;
		width: 12px;
		height: 40px;
		z-index: 9999;
	`;
});

const toggleStyle = computed(() => {
  // const { isRight, isLeft, togglePostion } = props;
  // const ll = isLeft ? 'auto' : `${-6}px`;
  // const rr = isRight ? 'auto' : `${-6 - ww}px`;
  // const radiusL = isLeft ? '0px' : '15px';
  // const radiusR = isRight ? '0px' : '15px';
  return `
		position: fixed;
		top: ${togglePos.value}px;
		width: 12px;
		height: 40px;
	`;
});

// const asideStyle1 = computed(() => (it: asideItem) => {
//   const top = isString(it.slotTop) ? 0 : it.slotTop;
//   return `
// 		position: fixed;
// 		top: ${400 - top!}px;
// 		width: 0px;
//     height: 30px;
// 		z-index:  ${it.zIndex};
// 		background-color: red;
// 	`;
// });

// width left right 要重新计算 charmi
const footerStyle = computed(() => {
  const { hasFooter } = props;
  const footerHei = isString(footerHeight.value) ? footerHeight.value : `${footerHeight.value}px`;
  const footerHe = hasFooter ? footerHei : '0px';
  return `
		position: ${fPos.value};
		left: ${bars.value.footer.left}px;
		width: ${bars.value.footer.width}px;
		right: 0px;
		bottom: ${footerAdHH1.value}px;
		z-index: 9000;
		background-color: #ae4423;
		height: ${footerHe};
		background-color:rgba(220,38,38,0.7);
    overflow: hidden;
	`;
});

// width: ${appWidth.value}px;
const footerAdStyle = computed(() => {
  const FH = props.hasFooterAd ? 'auto' : `${footerAdHH1.value}px`;
  return `
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: ${FH};
		z-index: 9999;
		background-color: #ae55ee;
		overflow: hidden;
	`;
});

const transitionV = computed(() => {
  return isTransition.value ? `all ${onToggleTime}s ease-in-out` : 'none';
});

const coverTrans = computed(() => {
  return `translateY(-${coverHH.value}px)`;
});
const footeradTrans = computed(() => {
  return `translateY(${footerAdHH1.value}px)`;
});

const footerAdTime = computed(() => {
  return `${onToggleTime}s`;
});

/** 变量 footerAd11 和 footerAd22，是用于footerAd消失时，与移动相关的位置 */
const footerAd11 = computed(() => {
  return `-${footerAdHH1.value}px`;
});

/** 变量 footerAd11 和 footerAd22，是用于footerAd消失时，与移动相关的位置 */
const footerAd22 = computed(() => {
  return `${footerAdHH1.value}px`;
});

// ------------------------------------------ 页面样式 ------------------------------------------------
</script>
t
<style>
.ll1 {
  background-color: rgb(0, 88, 0);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transform: perspective(6px) rotateX(0deg) rotateY(8deg) translateZ(0);
}
.rr1 {
  background-color: rgb(0, 88, 0);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  transform: perspective(6px) rotateX(0deg) rotateY(-8deg) translateZ(0);
}
.svgg {
  display: block;
  /* margin: auto; */
  height: 100%;
  width: 100%;
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

.footer {
  background-color: #368aff;
}

.asideL::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
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
    transparent 100%
  );
}
.asideL::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  /* transform: translateY(120px); */
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 1s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 1s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  /* transform: translateY(-20px); */
  transform: v-bind('coverTrans');
  opacity: 0;
}

.footerad-enter-active {
  transition: all 0.5s ease-in-out;
}

.footerad-leave-active {
  transition: all 0.5s ease-in-out;
}

.footerad-enter-from,
.footerad-leave-to {
  /* transform: translateY(20px); */
  transform: v-bind('footeradTrans');
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

.xia-layout-hidden-leave-active {
  transition: opacity 0.8s ease;
}

.f-resize {
  position: absolute;
  width: 100%;
  height: 6px;
  cursor: ns-resize;
  z-index: 9999;
  top: 0px;
  background-color: rgba(220, 38, 38, 0);
}

.f-resize:hover {
  background-color: hsl(213, 100%, 50%);
  transition: all 0.5s;
}
* {
  box-sizing: border-box;
}

.asideClass {
  opacity: 1;
  transition: v-bind('transitionV');
}
.asideClass1 {
  opacity: 0;
  transition: v-bind('transitionV');
}

/** footerad 消失动画 -------- begin --------------------------------- */
.footeradClass {
  animation: mymove v-bind('footerAdTime');
  -webkit-animation: mymove v-bind('footerAdTime'); /* Safari and Chrome */
  animation-fill-mode: forwards;
  animation-delay: 0.03s;
}
@keyframes mymove {
  from {
    bottom: 0px;
    /* opacity: 1; */
  }
  to {
    bottom: v-bind('footerAd11');
    /* opacity: 0; */
    /* height: 0px; */
  }
}

@-webkit-keyframes mymove {
  from {
    bottom: 0px;
  }
  to {
    bottom: v-bind('footerAd11');
  }
}
/** footerad 消失时 footer 需要跟着向下移动 --------- begin ----------- */
.footeradClass1 {
  animation: mymove1 v-bind('footerAdTime');
  -webkit-animation: mymove1 v-bind('footerAdTime'); /* Safari and Chrome */
  animation-fill-mode: forwards;
}

@keyframes mymove1 {
  from {
    bottom: v-bind('footerAd22');
  }
  to {
    bottom: 0px;
  }
}

@-webkit-keyframes mymove1 {
  from {
    bottom: v-bind('footerAd22');
  }
  to {
    bottom: 0px;
  }
}
/** footerad 消失时 footer 需要跟着向下移动 --------- end ----------- */

body {
  overflow-x: hidden;
}
</style>
