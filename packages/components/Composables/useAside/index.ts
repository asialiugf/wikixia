import { ref } from 'vue';
import { tryOnMounted, useEventListener, defaultWindow } from '@vueuse/core';
import type { ConfigurableWindow } from '@vueuse/core';

export interface WindowSizeO extends ConfigurableWindow {
  initialWidth?: number;
  initialHeight?: number;
}

/**
 * Reactive window size.
 *
 * @see https://vueuse.org/useWindowSize
 * @param options
 */
//  输入是一个 WindowSizeO 类型的对象，其中包含了一个 initialWidth 和 initialHeight 属性，这两个属性是可选的。
//  默认输入是空。
export function useAside({
  window = defaultWindow,
  initialWidth = Infinity,
  initialHeight = Infinity
}: WindowSizeO = {}) {
  const width = ref(initialWidth);
  const height = ref(initialHeight);

  const update = () => {
    if (window) {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    }
  };

  update();
  tryOnMounted(update);
  useEventListener('resize', update, { passive: true });

  return { width, height };
}

export type UseWindowSizeReturn = ReturnType<typeof useAside>;
