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
