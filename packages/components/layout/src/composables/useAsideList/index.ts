import { ref } from 'vue';
import { tryOnMounted, useEventListener, defaultWindow } from '@vueuse/core';
import type { ConfigurableWindow } from '@vueuse/core';
import type { asideItem } from '@asialine/xia-ui/layout';

// 侧边栏列表， 接口的内容一部分是从应用程序中传过来。一部分是计算出来。
// 侧边栏显示，分为两部分，一部分在本VUE中，position为absolute,参见 【:style="asideStyle(item)"】
// 另一部分，在LayoutAside子组件中，position 即为interface asideItem中的position，从应用程序中传过来，
// 需要传给子组件LayoutAside,  其值只能 为 sticky 或 absolute. sticky 表示: 侧边栏的内容会被固定在页面的某个位置，
// absolute 表示: 但是不会被stick在屏幕中，而是固定在页面的某个位置，跟随页面的滚动条滚动。
// 需和index.ts里的一致
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

// interface asideItem {
//   slotPosition: 'absolute' | 'sticky'; // 【应用程序传值】LayoutAside使用 ： 从应用程序传过来，并将其传至 LayoutAside子组件中。
//   key: string; // ------------------------【应用程序传值】侧边栏的key，slot的name会用这个key  要唯一，不能重复
//   header: 'cover' | 'hidden' | 'header' | 'tab' | 'none'; // 【应用程序传值】是否覆盖 header ?
//   footer: boolean; // --------------------【应用程序传值】 是否覆盖 footer
//   side: 'left' | 'right'; // -------------【应用程序传值】 停靠方式： 'left' 左对齐 'right' 右对齐 'mainl' 主区 左对齐 'mainr' 主区 右对齐 'isolated' 单独定位
//   display?: boolean; // ------------------【应用程序传值】 是否显示
//   draggbale?: boolean; // 是否可以移动
//   width: number;
//   height?: number;
//   start?: number;
//   end?: number;
//   top?: number | 'auto';
//   left?: number | 'auto';
//   right?: number | 'auto';
//   bottom?: number | 'auto';
//   zIndex?: number;
//   coverType?: number; // 覆盖类型，0:-cover，1:-hidden，2:-header，3:-tab，4:-none 用于排序
//   slotTop?: number;
//   slotHeight?: number;
// }

// {a: 0, b: true}
const asideMap = new Map<string, { a: number; b: boolean }>();
asideMap.set('cover', { a: 0, b: true });
asideMap.set('hidden', { a: 1, b: true });
asideMap.set('header', { a: 2, b: true });
asideMap.set('tab', { a: 3, b: true });
asideMap.set('none', { a: 4, b: true });

export function asideSort(li: asideItem[]) {
  if (li.length <= 1) {
    return;
  }
  li.sort((a: asideItem, b: asideItem) => {
    const x1 = a.coverType!;
    const y1 = b.coverType!;
    if (x1 < y1) {
      return -1;
    }
    if (x1 > y1) {
      return 1;
    }
    return 0;
  });
}

export const item0: asideItem = {
  key: '',
  side: 'left',
  header: 'none',
  footer: false,
  coverType: 4,
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
