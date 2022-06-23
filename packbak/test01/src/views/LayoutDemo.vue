<template>
  <div class="layout" :style="style">
    <header class="header" :style="layoutHeader">
      header utyru {{ sx }} -- {{ sy }}
      <p>adsfasdfasdfasdf</p>

      <button v-if="isActive" class="orange" @click="pause">Pause</button>
      <!-- <button v-if="!isActive" @click="pause">Resume</button> -->

      <zxx-scroll-ad v-if="isActive">
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
      </zxx-scroll-ad>
    </header>
    <div class="tab" :style="layoutTab">
      <div></div>
    </div>
    <aside class="asidel" :style="layoutAsideL">aside left</aside>
    <main class="main" :style="layoutMain">
      <li v-for="n in 10">adfsafd {{ n }} {{ x }} {{ y }} {{ mainh }}<br /></li>
      <zxx-scroll>
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
      </zxx-scroll>
      <li v-for="n in 10">adfsafd {{ n }} {{ x }} {{ y }} {{ mainh }}<br /></li>
    </main>
    <aside class="asider" :style="layoutAsideR">
      <zxx-scroll>
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
      </zxx-scroll>
    </aside>
    <footer class="footer" :style="layoutFooter">fff</footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useWindowScroll, useIntervalFn } from '@vueuse/core';
import SlotTest from '../components/SlotTest.vue';

// ---------------------------------------------------------------------
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
// ---------------------------------------------------------------------

const sx = ref(0);
const sy = ref(0);
const mainh = ref(0);

function onResize() {
  sx.value = window.innerWidth - 0;
  sy.value = window.innerHeight;
  const element = document.querySelector('.main') as HTMLElement;
  mainh.value = element.offsetHeight;
}

onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});

// sx.value = window.innerWidth - 10;
// sy.value = window.innerHeight - 10;
//  transform: `translate3d(-${sx.value}px, -${sy.value}px, 0)`,
const style = computed(() => {
  return `
    margin: 0px;
    width: ${sx.value}px;
    position: relative;

  `;
});
// height: ${mainh.value + 150}px;
const layoutHeader = computed(() => {
  return `
    height: 150px;
    margin: 0px;
    position: relative;
		z-index: 10;
  `;
});
const layoutTab = computed(() => {
  return `
    width: ${sx.value - 250}px;
    height: 50px;
    margin: 0px;
    position: sticky;
    top: 0px;
		left:250px;
		right:auto;
		bottom:auto;
    z-index: 2;


  `;
});
const layoutMain = computed(() => {
  return `
    width: ${sx.value - 600}px;
    margin: 0px;
    position: relative;
    top: 0px;
    left: 250px;
		z-index: 1;
  `;
});
const layoutAsideL = computed(() => {
  return `
    width: 250px;
    margin: 0px;
    position: absolute;
    top: 50px;
    left: 0px;
		right: auto;


  `;
});
const layoutAsideR = computed(() => {
  return `
    width: 350px;
    margin: 0px;
    position: absolute;
    top: 0px;
		left: auto;
    right: 0px;


  `;
});

const layoutFooter = computed(() => {
  return `
    width: ${sx.value}px;
    height: 50px;
    margin: 0px;
    position: relative;
    top:  0px;
    left: 0px;
  `;
});

// const pShow = ref(true);
const { x, y } = useWindowScroll();
</script>
<style>
.layout {
  background-color: rgb(255, 140, 0);
}
.header {
  background-color: #e3e3e3;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.tab {
  background-color: #485ff7;
}
.asidel {
  background-color: #676666;
}
.asider {
  background-color: #52d1ff;
}
.main {
  background-color: #00bc55;
}
.footer {
  background-color: #ffa7a7;
}
zxx-scroll {
  position: sticky;
  top: 60px;
  bottom: 100px;
  display: block;
  width: 250px;
  height: 200px;
  padding: 0.5em 1em;
  margin: 5em auto;
  border: solid deepskyblue;
  overflow: auto;
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;
}

zxx-scroll-ad {
  position: sticky;
  top: 60px;
  bottom: 100px;
  display: block;
  width: 250px;
  height: 200px;
  padding: 0.5em 1em;
  margin: 5em auto;
  border: solid deepskyblue;
  overflow: auto;
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;
}
</style>
