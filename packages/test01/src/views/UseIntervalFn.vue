<script setup lang="ts">
import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import { rand } from '@vueuse/shared';
const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好'];
const word = ref('Hello');
const timer = ref(1);
const interval = ref(2500);
const { pause, resume, isActive } = useIntervalFn(() => {
  word.value = greetings[rand(0, greetings.length - 1)];
  if (timer.value <= 0) {
    // 停止定时任务
    isActive.value = false;
    pause();
  } else {
    // 单次定时任务执行的回调
    timer.value--;
  }
}, interval);
</script>

<template>
  <p>{{ word }}</p>
  <p>
    interval:
    <input v-model="interval" type="number" placeholder="interval" />
  </p>
  <button v-if="isActive" class="orange" @click="pause">Pause</button>
  <button v-if="!isActive" @click="resume">Resume</button>
</template>
