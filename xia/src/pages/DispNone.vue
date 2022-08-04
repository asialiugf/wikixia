<script setup lang="ts">
import { rand } from '@vueuse/shared';
import { ref } from 'vue';
import { TransitionPresets, useTransition } from '@vueuse/core';
import { useCssVar } from '@vueuse/core';
import { computed } from '@vue/reactivity';

const color1 = useCssVar('--color-v1');
color1.value = '#ffa998';
const color2 = useCssVar('--color-v2');
color2.value = '#ff0098';

const duration = 1000;
const baseNumber = ref(0);
const baseVector = ref([0, 0]);
const isK = ref(false);
const ttt = ref('100px');

const easeOutElastic = (n: number) => {
  return n === 0 ? 0 : n === 1 ? 1 : 2 ** (-10 * n) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
};
const cubicBezierNumber = useTransition(baseNumber, {
  duration,
  transition: TransitionPresets.easeInOutCubic,
  onStarted() {
    isK.value = false;
    ttt.value = '200px';
  },

  onFinished() {
    isK.value = false;
    ttt.value = '200px';
  }
});

const customFnNumber = useTransition(baseNumber, {
  duration,
  transition: easeOutElastic
});
const vector = useTransition(baseVector, {
  duration,
  transition: TransitionPresets.easeOutExpo
});
const toggle = () => {
  baseNumber.value = baseNumber.value === 500 ? 0 : 500;
  baseVector.value = [rand(0, 100), rand(0, 100)];
};

// const ttt = computed(() => {
//   return `200px`;
// });
</script>

<template>
  <div>
    <button
      class="py-2 px-4 font-semibold rounded-lg shadow-md text-gray-900 bg-gray-300 hover:bg-gray-500 border-none cursor-pointer"
      @click="toggle"
    >
      Transition
    </button>

    <div class="track number">
      <div class="relative">
        <div class="sled" :style="{ top: `${cubicBezierNumber}px` }" />
      </div>
      <div class="relative">
        <div
          class="sled1"
          :class="{ kkk: isK }"
          :style="{ left: `${cubicBezierNumber}px`, top: `-0px`, height: `${cubicBezierNumber}px` }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.track {
  background: rgba(125, 125, 125, 0.3);
  border-radius: 0.5rem;
  max-width: 40rem;
  width: 100%;
}
.sled {
  background: var(--color-v1);
  border-radius: 0%;
  height: 21rem;
  width: 11rem;
  position: absolute;
}
.kkk {
  display: none;
}

.sled1 {
  background: var(--color-v2);
  border-radius: 0%;
  height: v-bind('ttt');
  width: 11rem;
  position: absolute;
}
.number.track {
  height: 2rem;
  margin: 0.5rem 0;
  padding: 0 0.5rem;
}
</style>
