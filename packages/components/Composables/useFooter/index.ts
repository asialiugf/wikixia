import { ref, computed } from 'vue';
import type { Ref } from 'vue';

export interface optionA {
  x: Ref<number>;
  y: Ref<number>;
}

export function useFooter(
  opt: optionA = {
    x: ref(0),
    y: ref(0)
  }
) {
  const xx = computed(() => opt.x.value + 1);
  const yy = ref(0);
  return { xx, yy };
}

export type UseFooterReturn = ReturnType<typeof useFooter>;
