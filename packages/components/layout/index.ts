import { withInstall } from '@asialine/utils/with-install';
import Layout from './src/LayoutMain.vue';
import type { asideItem } from './src/composables/useAsideList';

const YLayout = withInstall(Layout);
export { YLayout };
export default YLayout;

export type { asideItem };

// export interface asideItem {
//   slotPosition: 'absolute' | 'sticky'; // LayoutAside使用 ： 从应用程序传过来，并将其传至 LayoutAside子组件中。
//   key: string; // 侧边栏的key，slot的name会用这个key  要唯一，不能重复
//   header: 'cover' | 'hidden' | 'header' | 'tab' | 'none'; // 是否覆盖 header ?
//   footer: boolean; // 是否覆盖 footer
//   side: 'left' | 'right'; // 停靠方式： 'left' 左对齐 'right' 右对齐 'mainl' 主区 左对齐 'mainr' 主区 右对齐 'isolated' 单独定位
//   display?: number; // 2:显示， 1：不显示：屏幕宽度变窄，0：不显示：人为设定不显示。默认为2。
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

export interface barsType {
  cover: { left: number; width: number };
  hidden: { left: number; width: number };
  header: { left: number; width: number };
  tab: { left: number; width: number };
  main: { left: number; width: number };
  footer: { left: number; width: number };
}
