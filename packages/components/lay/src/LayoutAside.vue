<template>
  <!-- <component :is="user === false ? 'div' : 'main'" :style="style"></component> -->

  <div class="xia-layout-aside" :style="parentStyle">
    <div v-show="props.hasCover" :style="coverStyle"></div>
    <div v-show="props.hasHidden" :style="hiddenStyle"></div>
    <header v-show="props.hasHeader" :style="headerStyle"></header>
    <div v-show="props.hasTab" :style="tabStyle"></div>
    <component :is="tag" class="aside" :style="asideStyle">
      <div class="resize resizeR"></div>
      <slot name="aside">qeqerqwer</slot>
      <slot name="aside1">qeqerqwer</slot>
    </component>
    <footer v-show="props.hasFooter"></footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { isString } from '@vueuse/core';

interface asideProps {
  tag?: string; // 可以是 div | main | aside | header | footer | section | article | nav  | content | footer
  hasCover?: boolean; //
  hasHidden?: boolean; //
  hasHeader?: boolean; //
  hasTab?: boolean; //
  hasFooter?: boolean; //

  parentPosition?: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  parentTop?: number | 'auto';
  parentLeft?: number | 'auto';
  parentRight?: number | 'auto';
  parentBottom?: number | 'auto';
  parentWidth: number | string;

  coverPosition?: string;
  coverTop?: number | string;
  coverLeft?: number | string;
  coverRight?: number | string;
  coverBottom?: number | string;
  coverMinHeight?: number | string;
  coverHeight?: number | string;
  coverZIndex?: number;

  hiddenPosition?: string;
  hiddenTop?: number | string;
  hiddenLeft?: number | string;
  hiddenRight?: number | string;
  hiddenBottom?: number | string;
  hiddenMinHeight?: number | string;
  hiddenHeight?: number | string;
  hiddenZIndex?: number;

  headerPosition?: string;
  headerTop?: number | string;
  headerLeft?: number | string;
  headerRight?: number | string;
  headerBottom?: number | string;
  headerMinHeight?: number | string;
  headerHeight?: number | string;
  headerZIndex?: number;

  tabPosition?: string;
  tabTop?: number | string;
  tabLeft?: number | string;
  tabRight?: number | string;
  tabBottom?: number | string;
  tabMinHeight?: number | string;
  tabHeight?: number | string;
  tabZIndex?: number | string;

  asidePosition?: string;
  asideTop?: number | string;
  asideLeft?: number | string;
  asideRight?: number | string;
  asideBottom?: number | string;
  asideMinHeight?: number | string;
  asideHeight?: number | string;
  asideZIndex?: number;

  footerPosition?: string;
  footerTop?: number | string;
  footerLeft?: number | string;
  footerRight?: number | string;
  footerBottom?: number | string;
  footerMinHeight?: number | string;
  footerHeight?: number | string;
  footerZIndex?: number;
}

const props = withDefaults(defineProps<asideProps>(), {
  tag: 'div', // 可以是 div | main | aside | header | footer | section | article | nav  | content | footer
  hasCover: false, //
  hasHidden: false, //
  hasHeader: true, //
  hasTab: false, //
  hasFooter: false, //

  parentPosition: 'absolute',
  parentTop: 0,
  parentLeft: 'auto',
  parentRight: 'auto',
  parentBottom: 0,
  parentWidth: 100,

  coverPosition: 'sticky',
  coverTop: 0,
  coverLeft: 0,
  coverRight: 0,
  coverBottom: 0,
  coverMinHeight: 50,
  coverHeight: 50,
  coverZIndex: 1,

  hiddenPosition: 'relative',
  hiddenTop: 0,
  hiddenLeft: 0,
  hiddenRight: 0,
  hiddenBottom: 0,
  hiddenMinHeight: 50,
  hiddenHeight: 50,
  hiddenZIndex: 0,

  headerPosition: 'relative',
  headerTop: 0,
  headerLeft: 0,
  headerRight: 0,
  headerBottom: 0,
  headerMinHeight: 50,
  headerHeight: 150,
  headerZIndex: 0,

  tabPosition: 'sticky',
  tabTop: 0,
  tabLeft: 0,
  tabRight: 0,
  tabBottom: 0,
  tabMinHeight: 50,
  tabHeight: 50,
  tabZIndex: 0,

  asidePosition: 'relative',
  asideTop: 0,
  asideLeft: 0,
  asideRight: 0,
  asideBottom: 0,
  asideMinHeight: 0,
  asideHeight: 0,
  asideZIndex: 1,

  footerPosition: 'relative',
  footerTop: 0,
  footerLeft: 0,
  footerRight: 0,
  footerBottom: 0,
  footerMinHeight: 0,
  footerHeight: 0,
  footerZIndex: 0
});

// layout页面的样式
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++ begin

const parentStyle = computed(() => {
  const { parentPosition, parentTop, parentLeft, parentRight, parentBottom, parentWidth } = props;
  const w = isString(parentWidth) ? parentWidth : `${parentWidth}px`;
  console.log('-----------------pppppppppppp', parentLeft);
  return `
    position: ${parentPosition};
		top: ${parentTop};
		left: ${parentLeft}px;
		right: ${parentRight};
		bottom: ${parentBottom};
		width: ${w};
		z-index: 1002;
		background-color: rgba(255,00,00,0)
  `;
});

const coverStyle = computed(() => {
  const { parentWidth, coverPosition, coverTop, coverLeft, coverRight, coverBottom, coverHeight } = props;
  const w = isString(parentWidth) ? parentWidth : `${parentWidth}px`;
  const h = isString(coverHeight) ? coverHeight : `${coverHeight}px`;
  return `
		position: ${coverPosition};
		top: ${coverTop};
		left: ${coverLeft};
		right: ${coverRight};
		bottom: ${coverBottom};
		width: ${w};
	  height: ${h};
		background-color: rgba(255,00,00,0);
		z-index: 1;
	`;
});

const hiddenStyle = computed(() => {
  const { parentWidth, hiddenPosition, hiddenTop, hiddenLeft, hiddenRight, hiddenBottom, hiddenHeight } = props;
  const w = isString(parentWidth) ? parentWidth : `${parentWidth}px`;
  const h = isString(hiddenHeight) ? hiddenHeight : `${hiddenHeight}px`;
  console.log('hhhhhhhhhhidden:--------------', h);
  return `
		position: ${hiddenPosition};
		top: ${hiddenTop};
		left: ${hiddenLeft};
		right: ${hiddenRight};
		bottom: ${hiddenBottom};
		width: ${w};
	  height: ${h};
		background-color: rgba(255,00,00,0);
		z-index: 1;
	`;
});

// header 的样式
const headerStyle = computed(() => {
  const { parentWidth, headerPosition, headerTop, headerLeft, headerRight, headerBottom, headerHeight } = props;
  const w = isString(parentWidth) ? parentWidth : `${parentWidth}px`;
  const h = isString(headerHeight) ? headerHeight : `${headerHeight}px`;
  return `
		position: ${headerPosition};
		top: ${headerTop};
		left: ${headerLeft};
		right: ${headerRight};
		bottom: ${headerBottom};
		width: ${w};
	  height: ${h};
		background-color: rgba(255,00,00,0);
		z-index: 8000;
	`;
});

// tab 的样式
const tabStyle = computed(() => {
  const { parentWidth, tabPosition, tabTop, tabLeft, tabRight, tabBottom, tabHeight } = props;
  const w = isString(parentWidth) ? parentWidth : `${parentWidth}px`;
  const h = isString(tabHeight) ? tabHeight : `${tabHeight}px`;
  return `
		position: ${tabPosition};
		top: ${tabTop};
		left: ${tabLeft};
		right: ${tabRight};
		bottom: ${tabBottom};
		width: ${w};
	  height: ${h};
		background-color: rgba(255,00,00,0);
		z-index: 1;
	`;
});

const asideStyle = computed(() => {
  const { parentWidth, asidePosition, asideTop, asideLeft, asideRight, asideBottom, asideHeight } = props;
  const w = isString(parentWidth) ? parentWidth : `${parentWidth}px`;
  const h = isString(asideHeight) ? asideHeight : `${asideHeight}px`;
  return `
		position: ${asidePosition};
		top: ${asideTop};
		left: ${asideLeft};
		right: ${asideRight};
		bottom: ${asideBottom};
		width: ${w};
	  height: ${h};
		background-color: #e1e1e1;
		z-index: 1;
	`;
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++ end
</script>
<style></style>
