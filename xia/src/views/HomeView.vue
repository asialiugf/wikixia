<template>
  <admin-layout
    :hPosition="position0"
    :hTop="top0"
    :tPosition="position1"
    :tTop="top1"
    :aLtop="top1"
    :aLheight="3000"
    :aLwidth="200"
  >
    <template #header>
      <div class="flex-center h-full bg-#1166ee">
        <nav class="ttt">
          <div>LOGO</div>
          <RouterLink
            to="/"
            class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 border-none cursor-pointer"
            >Home</RouterLink
          >
          <RouterLink to="/about">About</RouterLink>
          <div>我的天</div>
          <button
            class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 border-none cursor-pointer"
          >
            Click me
          </button>
        </nav>
      </div>
    </template>
    <template #tab>
      <div class="flex-center h-full bg-#1166ee">
        <nav class="ttt">
          <div>LOGO</div>
          <RouterLink
            to="/"
            class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 border-none cursor-pointer"
            >Home</RouterLink
          >
          <RouterLink to="/about">About</RouterLink>
          <div>新时代的计划</div>
          <button
            class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 border-none cursor-pointer"
          >
            Click me
          </button>
        </nav>
      </div>
    </template>
    <template #asideL> qwerqer </template>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminLayout from '@asialine/xia-ui/lay';

type Position = 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
const position0 = ref<Position>('absolute');
const position1 = ref<Position>('sticky');

type Auto = number | 'auto';
const top0 = ref<Auto>(100);
const top1 = ref<Auto>(60);
</script>

<style>
.ttt div {
  padding: 8px;
  display: inline-block;
}
</style>
