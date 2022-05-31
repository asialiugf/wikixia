import { withInstall } from '@asialine/utils/with-install';
import LayDemo from './src/XLayout.vue';

const YLayout = withInstall(LayDemo);
export { YLayout };
export default YLayout;

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
