<script setup lang="ts">
import { useTimeout } from '@vueuse/core';

const headerTimeOut = useTimeout(6000); // 设置一个定时器
</script>

<template>
  <div class="flex-center h-full bg-#e2e2e2">
    <div v-if="!headerTimeOut" class="zxx-scroll">
      <p>
        最近在自己博客<a href="https://www.zhangxinxu.com/life/">“生活与创造”</a>栏目那里开始连载<a
          href="https://www.zhangxinxu.com/life/category/light-novel/"
          >轻小说</a
        >，题目是“身为前端开发的我成为了一个渔民”。
      </p>
      <p>
        跟绝大多数的小说不同，在这部小说里面，直接采用第一人称写法，会有一些挑战，但也会带来一些非常有趣的展现形式。
      </p>
      <p>这部连载轻小说采用月更方式，利用碎片时间完成，每次更新5000~6000字之间，预计两年完结。</p>
      <p>
        欢迎大家支持，如果觉得写的还不错啊，可以疯狂安利给周围小伙伴，目前已经有了两次更新，可以<a
          href="https://www.zhangxinxu.com/life/fisher-1/"
          >点击这里</a
        >开始阅读。
      </p>
    </div>
    <nav class="ttt">
      <div>LOGO</div>
    </nav>
  </div>
</template>

<style scoped></style>
