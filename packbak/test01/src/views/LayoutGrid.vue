<template>
  <div id="container">
    <div class="item item-1">1</div>
    <div class="item item-2">2</div>
    <div class="item item-3">3</div>
    <div class="item item-4">4</div>
    <div class="item item-5">5</div>
    <div class="item item-6">6</div>
    <div class="item item-7">7</div>
    <div class="item item-7">8</div>
    <div class="item item-7">9</div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useWindowScroll, useIntervalFn } from '@vueuse/core';
//  --------------------------------------------------------------------------------------------------------------------
const timer = ref(1);
const interval = ref(2000);
const { pause, isActive } = useIntervalFn(() => {
  if (timer.value <= 0) {
    isActive.value = false;
    pause();
  } else {
    timer.value--;
  }
}, interval);
//  --------------------------------------------------------------------------------------------------------------------
</script>
<style>
#container {
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: auto auto auto auto;
}

.item {
  font-size: 4em;
  text-align: center;
  border: 1px solid #e5e4e9;
}

.item-1 {
  background-color: #ef342a;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 5;
}

.item-2 {
  background-color: #f68f26;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 4;
}

.item-3 {
  background-color: #4ba946;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 4;
}

.item-4 {
  background-color: #0376c2;
}

.item-5 {
  background-color: #c077af;
}

.item-6 {
  background-color: #f8d29d;
}

.item-7 {
  background-color: #b5a87f;
}

.item-8 {
  background-color: #d0e4a9;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}

.item-9 {
  background-color: #4dc7ec;
}
</style>
