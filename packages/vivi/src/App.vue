<template>
  <admin-layout
    :has-cover="false"
    :has-hidden="false"
    :has-header="false"
    :has-tab="false"
    :has-footer="true"
    :hidden-position="'relative'"
    :h-position="'relative'"
    :t-position="'sticky'"
    :f-position="'sticky'"
    :h-top="top0"
    :t-height="'auto'"
    :t-top="top1"
    :a-ltop="aLtop"
    :a-lheight="500"
    :a-lwidth="aLwidth"
    :a-rtop="aLtop"
    :a-rheight="500"
    :a-rwidth="aRwidth"
    :m-width="mWidth"
    :aside-array="asideArray"
    @update:widthL="setWidthL"
    @update:widthR="setWidthR"
  >
    <template #cover> </template>
    <template #header> </template>

    <template #main>
      {{ winSize.width }} -- == -- {{ winSize.height }} == {{ t }}
      <ul class="example-2">
        <li v-for="n in 0" :key="n">adfsafd {{ n }} <br /></li>
        <li v-for="n in 4" :key="n">adfsafd {{ n }} <br /></li>
      </ul>
    </template>
    <template #asidea> </template>
    <template #asideb> </template>
    <template #footer> </template>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AdminLayout from '@asialine/xia-ui/layout';
import type { asideItem } from '@asialine/xia-ui/layout';
import { useTimeout, useWindowSize } from '@vueuse/core';
import LayoutHeader from './components/layout/LayoutHeader.vue';

const winSize = useWindowSize();
const t = ref<number>(0);
watch(
  () => [winSize.width],
  () => {
    console.log('kkkkkkkkkkkkkkkkk');
    t.value = winSize.width.value + 10; // charmi  sx要处理
  },
  { immediate: true, deep: true }
);
// import Editor from '../components/Editor';
// import type { ChangePayload, EditorInstance } from '../components/Editor';
// // import type { ChangeInterface } from '@aomao/engine';

// import Editor from '@asialine/editor'; // charmi
// import type { ChangePayload, EditorInstance } from '@asialine/editor';
// import '../../../packages/editor/dist/style.css';

// const editor = ref<EditorInstance | null>(null);
// const content = ref('<h1>Hello Editor</h1>');

// const style = ref({
//   padding: '0',
//   background: '#fff',
//   width: '100%',
//   height: 'auto'
// });

// const onChange = ({ html, json }: ChangePayload) => {
//   console.log('html content: ', html);
//   console.log('json content: ', json);
// };

const headerTimeOut = useTimeout(6000); // 设置一个定时器
const tabTimeOut = useTimeout(113000); // 设置一个定时器
const hashiddenn = useTimeout(1119000); // 设置一个定时器
const asideArray = ref<asideItem[]>([]);

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
.example-2 {
  white-space: nowrap;
  /* height: 3000px; */
}
ul li {
  padding: 0;
}
body {
  margin: 0px;
  padding: 0px;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  border-radius: 4px;
  overflow-y: scroll;
}
::-webkit-scrollbar-thumb {
  background: red;
}
body::-webkit-scrollbar-track {
  background: blue;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
