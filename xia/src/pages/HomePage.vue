<template>
  <admin-layout
    :has-cover="true"
    :has-hidden="true"
    :has-header="true"
    :has-tab="true"
    :has-footer="true"
    :has-footer-ad="true"
    :hiddenPosition="'relative'"
    :hPosition="'sticky'"
    :tPosition="'relative'"
    :fPosition="'relative'"
    :aside-array="asideArray"
  >
    <template #cover>
      <nav class="ttt">
        <div>LOGO</div>
        <RouterLink
          to="/"
          class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700 border-none cursor-pointer"
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
    </template>

    <template #header>
      <main-header></main-header>
    </template>
    <template #tab>
      <div v-if="!tabTimeOut" class="zxx-scroll">
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
      <li v-for="n in 115" :key="n">adfsafd {{ n }} <br /></li>
      <li v-for="n in 0" :key="n">adfsafd {{ n }} <br /></li>
    </template>

    <template #asidea>
      <div style="height: 100%; overflow: scroll; margin-right: 6px">
        <el-row class="mb-4" style="overflow: hidden">
          <el-button disabled>Default</el-button>
          <el-button type="primary" disabled>Primary</el-button>
          <el-button type="success" disabled>Success</el-button>
          <el-button type="info" disabled>Info</el-button>
          <el-button type="warning" disabled>Warning</el-button>
          <el-button type="danger" disabled>Danger</el-button>
        </el-row>
        <el-row style="overflow: hidden">
          <el-button plain disabled>Plain</el-button>
          <el-button type="primary" plain disabled>Primary</el-button>
          <el-button type="success" plain disabled>Success</el-button>
          <el-button type="info" plain disabled>Info</el-button>
          <el-button type="warning" plain disabled>Warning</el-button>
          <el-button type="danger" plain disabled>Danger</el-button>
        </el-row>
        <div>p jfd 为什么不地 不好{{}}</div>
        <li v-for="n in 50" :key="n">adfsafd {{ n }} <br /></li>
      </div>
    </template>

    <template #asideb>
      <ul class="example-2">
        <li v-for="n in 10" :key="n">adfsafd {{ n }} <br /></li>
        <div class="zxx-scroll">
          <p>
            最近在自己博客<a href="https://www.zhangxinxu.com/life/">“生活与创造”</a>栏目那里开始连载<a
              href="https://www.zhangxinxu.com/life/category/light-novel/"
              >轻小说</a
            >，题目是“身为前端开发的我成为了一个渔民”。
          </p>
          <p>
            Some articles claim that the solution to this is to make sure that the ancestor or parent element has a
            specified height. However, that's not what you want to do (right?), because you don't want to set a fixed
            height on the sticky element's ancestor or parent elemen。
          </p>
          <p>这部连载轻小说采用月更方式，利用碎片时间完成，每次更新5000~6000字之间，预计两年完结。</p>
          <p>
            欢迎大家支持，如果觉得写的还不错啊，可以疯狂安利给周围小伙伴，目前已经有了两次更新，可以<a
              href="https://www.zhangxinxu.com/life/fisher-1/"
              >点击这里</a
            >开始阅读。
          </p>
        </div>
        <li v-for="n in 210" :key="n">adfsafd {{ n }} <br /></li>
      </ul>
    </template>
    <template #footer>
      <div v-if="!footerTimeOut" class="zxx-scroll">
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

    <template #footer-ad>
      <div v-if="!footerADout" class="zxx-scroll">
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
  </admin-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminLayout from '@asialine/xia-ui/layout';
import type { asideItem } from '@asialine/xia-ui/layout';
import { useTimeout } from '@vueuse/core';
import MainHeader from '../components/layout/MainHeader.vue';

import Editor from '../components/Editor';
import type { ChangePayload, EditorInstance } from '../components/Editor';
// import type { ChangeInterface } from '@aomao/engine';

// import Editor from '@asialine/editor'; // charmi
// import type { ChangePayload, EditorInstance } from '@asialine/editor';
// import '../../../packages/editor/dist/style.css';

const editor = ref<EditorInstance | null>(null);
const content = ref('<h1>Hello Editor</h1>');

const style = ref({
  padding: '0',
  background: '#fff',
  width: '100%',
  height: 'auto'
});

const onChange = ({ html, json }: ChangePayload) => {
  console.log('html content: ', html);
  console.log('json content: ', json);
};

const headerTimeOut = useTimeout(6000); // 设置一个定时器
const tabTimeOut = useTimeout(3000); // 设置一个定时器
// const hashiddenn = useTimeout(9000); // 设置一个定时器
const footerTimeOut = useTimeout(11113000); // 设置一个定时器
const footerADout = useTimeout(11115000);
const asideArray = ref<asideItem[]>([
  {
    key: 'asidea',
    side: 'left',
    header: 'cover',
    footer: false,
    slotPosition: 'absolute',
    width: 260,
    display: 2,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'none',
    footer: false,
    key: 'asideb',
    side: 'right',
    width: 200,
    display: 2,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'tab',
    footer: false,
    key: 'asidec',
    side: 'right',
    width: 200,
    display: 2,
    draggbale: true
  }
]);

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
  top: 30px;
  bottom: 100px;
  display: block;
  width: 350px;
  height: 100px;
  /* padding: 0.5em 1em; */
  /* margin: 5em auto; */
  border: solid deepskyblue;
  overflow: auto;
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;
  white-space: normal;
}
</style>
