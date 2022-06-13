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
export interface asideType {
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
