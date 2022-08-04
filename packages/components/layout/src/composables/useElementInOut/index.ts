import { ref } from 'vue';
import type { Ref } from 'vue';
import { useElementSize } from '@vueuse/core';

export interface UseElementInOutOptions {
  /** true表示In false表示out */
  InOrOut?: boolean;
  /** 显隐动画时长 */
  Time?: number;
  Direction?: 'left' | 'right' | 'up' | 'down';
  Start?: number;
  End?: number;
  /** 在动画前返回宽高，还是在动画后返回宽高 */
  Before?: boolean;
}

export function useElementInOut(el: Ref<HTMLElement | null>, options: UseElementInOutOptions = {}) {
  const { width, height } = useElementSize(el);
  height.value = options.Before ? height.value : 0;
  el.value?.classList.add('overflow-hidden');
  return {
    el,
    width,
    height
  };
}
