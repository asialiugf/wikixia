<template>
  <admin-layout
    @update:widthL="setWidthL"
    @update:widthR="setWidthR"
    :hasCover="false"
    :hasHidden="!hashiddenn"
    :hasHeader="true"
    :hasTab="true"
    :hasAsideLeft="true"
    :hasAsideRight="true"
    :hasMinimap="true"
    :hasFooter="false"
    :hPosition="'relative'"
    :hTop="top0"
    :tPosition="'sticky'"
    :tHeight="'auto'"
    :tzIndex="1021"
    :tTop="top1"
    :aLtop="aLtop"
    :aLheight="500"
    :aLwidth="aLwidth"
    :aRtop="aLtop"
    :aRheight="500"
    :aRwidth="aRwidth"
    :mWidth="mWidth"
  >
    <template #header>
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
      <div v-if="!headerTimeOut1" class="zxx-scroll">
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
    </template>
    <template #main>
      <ul id="example-2">
        <p>
          跟绝大多数的小说不同，跟绝大多数的小说不同在这部小说里面，直接采用第一人称写法，会有一些挑战，但也会带来一些非常有趣的展现形式。
        </p>
        <li v-for="n in 100" :key="n">adfsafd {{ n }} <br /></li>
        <div class="zxx-scroll">
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
        <li v-for="n in 100" :key="n">adfsafd {{ n }} <br /></li>
      </ul>
    </template>
    <template #asideL>
      <ul class="example-2">
        <li v-for="n in 100" :key="n">adfsafd {{ n }} <br /></li>
        <div class="zxx-scroll">
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
        <li v-for="n in 10" :key="n">adfsafd {{ n }} <br /></li>
      </ul>
    </template>
    <template #asideR>
      <ul class="example-2">
        <li v-for="n in 0" :key="n">adfsafd {{ n }} <br /></li>
        <div class="zxx-scroll">
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
        <li v-for="n in 10" :key="n">adfsafd {{ n }} <br /></li>
      </ul>
    </template>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminLayout from '@asialine/xia-ui/lay';
import { useTimeout } from '@vueuse/core';

const headerTimeOut = useTimeout(8000); // 设置一个定时器
const headerTimeOut1 = useTimeout(4000); // 设置一个定时器
const hashiddenn = useTimeout(16000); // 设置一个定时器

type Position = 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
const position0 = ref<Position>('sticky');
const position1 = ref<Position>('sticky');

type Auto = number | 'auto';
const top0 = ref<Auto>(0);
const top1 = ref<Auto>(0);
const aLtop = ref<Auto>(100);
const aLwidth = ref<number>(200);
const aRwidth = ref<number>(300);
const mWidth = ref<number>(500);

function setWidthL(width: number) {
  aLwidth.value = width;
}
function setWidthR(width: number) {
  aRwidth.value = width;
}
</script>

<style>
.ttt div {
  padding: 8px;
  display: inline-block;
}

.zxx-scroll {
  position: sticky;
  top: 60px;
  bottom: 100px;
  display: block;
  width: 350px;
  height: 200px;
  /* padding: 0.5em 1em; */
  /* margin: 5em auto; */
  border: solid deepskyblue;
  overflow: auto;
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;
  white-space: normal;
}
.example-2 {
  white-space: nowrap;
}
ul li {
  padding: 0;
}
</style>
