import { withInstall } from '@asialine/utils/with-install';
import LayDemo from './src/XLayout.vue';
// import type { asideType } from './src/XLayout.vue';
// import asideType from './src/XLayout.vue';

const YLayout = withInstall(LayDemo);
export { YLayout };
export default YLayout;
// export type { asideType };

// 两种导出方式
//-----------------------------------------------------------------------

export interface LayoutProps {
  /** 开启fixed布局 */
  position: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  top?: number | 'auto';
  left?: number | 'auto';
  right?: number | 'auto';
  bottom?: number | 'auto';
  /** fixed布局的层级 */
  zIndex?: number;
  /** 最小宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡时间 */
  transitionTimingFunction?: string;
}

export interface asideItem {
  slotPosition: 'absolute' | 'sticky'; // LayoutAside使用 ： 从应用程序传过来，并将其传至 LayoutAside子组件中。
  key: string; // 侧边栏的key，slot的name会用这个key  要唯一，不能重复
  header: 'cover' | 'hidden' | 'header' | 'tab' | 'none'; // 是否覆盖 header ?
  footer: boolean; // 是否覆盖 footer
  side: 'left' | 'right'; // 停靠方式： 'left' 左对齐 'right' 右对齐 'mainl' 主区 左对齐 'mainr' 主区 右对齐 'isolated' 单独定位
  display?: boolean; // 是否显示
  draggbale?: boolean; // 是否可以移动
  width: number;
  height?: number;
  start?: number;
  end?: number;
  top?: number | 'auto';
  left?: number | 'auto';
  right?: number | 'auto';
  bottom?: number | 'auto';
  zIndex?: number;
  coverType?: number; // 覆盖类型，0:-cover，1:-hidden，2:-header，3:-tab，4:-none 用于排序
  slotTop?: number;
  slotHeight?: number;
}
