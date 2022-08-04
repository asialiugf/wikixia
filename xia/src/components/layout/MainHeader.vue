<script setup lang="ts">
import { useTimeout } from '@vueuse/core';
const headerTimeOut = useTimeout(6000); // 设置一个定时器
</script>

<template>
  <div class="flex-center h-full bg-#e2e2e2">
    <nav class="ttt">
      <div>夏记</div>
      <RouterLink
        to="/"
        class="py-2 px-3 shadow-md text-sm text-blue-gray-900 hover:text-warm-gray-200 hover:bg-orange-500"
        >Home</RouterLink
      >
      <RouterLink
        to="/homeview"
        class="py-2 px-3 shadow-md text-sm text-blue-gray-900 hover:text-warm-gray-200 hover:bg-orange-500"
        >HomeVeiw</RouterLink
      >
      <RouterLink to="/about">About</RouterLink>
      <div>我的天</div>
      <button class="py-2 px-3 shadow-md text-sm text-blue-gray-900 hover:text-warm-gray-200 hover:bg-orange-500">
        Click me
      </button>
      <RouterLink
        class="py-2 px-3 shadow-md text-sm text-blue-gray-900 hover:text-warm-gray-200 hover:bg-orange-500"
        to="/layfirst"
      >
        layout测试
      </RouterLink>
      <RouterLink
        class="float:right-4 py-2 px-4 font-semibold rounded-lg shadow-md text-gray-900 bg-gray-300 hover:bg-gray-500 border-none cursor-pointer"
        to="/editor"
      >
        editor测试
      </RouterLink>
      <RouterLink
        to="/mainscroll"
        class="py-2 px-3 shadow-md text-sm text-blue-gray-900 hover:text-warm-gray-200 hover:bg-orange-500"
        >滚动</RouterLink
      >
      <RouterLink
        class="py-2 px-4 font-semibold rounded-lg shadow-md text-gray-900 bg-gray-300 hover:bg-gray-500 border-none cursor-pointer"
        to="/dispnone"
      >
        display none测试
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped></style>
