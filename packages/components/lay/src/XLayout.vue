<template>
  <div class="wikixia-admin-layout">
    <layout-header
      :position="props.hPosition"
      :top="props.hTop"
      :left="props.hLeft"
      :right="props.hRight"
      :bottom="props.hBottom"
      :z-index="1001"
      :width="1200"
      :height="48"
      :padding-left="0"
    >
      <slot name="header"></slot>
    </layout-header>

    <layout-header
      :position="props.tPosition"
      :top="props.tTop"
      :left="props.tLeft"
      :right="props.tRight"
      :bottom="props.tBottom"
      :z-index="1001"
      :width="1200"
      :height="48"
      :padding-left="0"
    >
      <slot name="tab"></slot>
    </layout-header>

    <layout-header
      :position="props.aLposition"
      :top="props.aLtop"
      :left="props.aLleft"
      :right="props.aLright"
      :bottom="props.aLbottom"
      :z-index="1001"
      :width="props.aLwidth"
      :height="props.aLheight"
      :padding-left="0"
    >
      <slot name="asideL"></slot>
    </layout-header>

    <layout-header
      :position="props.aRposition"
      :top="props.aRtop"
      :left="props.aRleft"
      :right="props.aRright"
      :bottom="props.aRbottom"
      :z-index="1001"
      :width="props.aRwidth"
      :height="props.aRheight"
      :padding-left="0"
    >
      <slot name="asideR"></slot>
    </layout-header>

    <layout-header
      :position="props.tPosition"
      :top="props.tTop"
      :left="props.tLeft"
      :right="props.tRight"
      :bottom="props.tBottom"
      :z-index="1001"
      :width="1200"
      :height="48"
      :padding-left="0"
    >
      <slot name="main"></slot>
    </layout-header>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { useCssRender, useFixedTransformStyle } from '../../../hooks';
import LayoutHeader from './LayoutHeader.vue';
// import LayoutTab from './LayoutTab.vue';
// import LayoutSider from './LayoutSider.vue';
// import LayoutContent from './LayoutContent.vue';
// import LayoutFooter from './LayoutFooter.vue';

interface Props {
  /** 开启fixed布局 */
  hPosition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  hTop?: number | 'auto';
  hLeft?: number | 'auto';
  hRight?: number | 'auto';
  hBottom?: number | 'auto';
  hzIndex?: number | 'auto';
  hWidth?: number | 'auto';
  hHeight?: number | 'auto';
  hPaddingLeft?: number | 'auto';
  tPosition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  tTop?: number | 'auto';
  tLeft?: number | 'auto';
  tRight?: number | 'auto';
  tBottom?: number | 'auto';
  tzIndex?: number | 'auto';
  tWidth?: number | 'auto';
  tHeight?: number | 'auto';
  tPaddingLeft?: number | 'auto';
  /* Aside Left */
  aLposition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  aLtop?: number | 'auto';
  aLleft?: number | 'auto';
  aLright?: number | 'auto';
  aLbottom?: number | 'auto';
  aLzIndex?: number | 'auto';
  aLwidth?: number | 'auto';
  aLheight?: number | 'auto';
  aLpaddingLeft?: number | 'auto';
  /* Aside Right */
  aRposition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  aRtop?: number | 'auto';
  aRleft?: number | 'auto';
  aRright?: number | 'auto';
  aRbottom?: number | 'auto';
  aRzIndex?: number | 'auto';
  aRwidth?: number | 'auto';
  aRheight?: number | 'auto';
  aRpaddingLeft?: number | 'auto';
  /* Footer */
  fFposition: 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
  fFtop?: number | 'auto';
  fFleft?: number | 'auto';
  fFright?: number | 'auto';
  fFbottom?: number | 'auto';
  fFzIndex?: number | 'auto';
  fFwidth?: number | 'auto';
  fFheight?: number | 'auto';
  fFpaddingLeft?: number | 'auto';

  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡时间 */
  transitionTimingFunction?: string;
}
const props = withDefaults(defineProps<Props>(), {
  /* Header */
  hPosition: 'relative',
  hTop: 'auto',
  hLeft: 'auto',
  hRight: 'auto',
  hBottom: 'auto',
  hzIndex: 1001,
  hWidth: 1200,
  hHeight: 48,
  hPaddingLeft: 0,
  /* Tab */
  tPosition: 'relative',
  tTop: 'auto',
  tLeft: 'auto',
  tRight: 'auto',
  tBottom: 'auto',
  tzIndex: 1001,
  tWidth: 1200,
  tHeight: 48,
  tPaddingLeft: 0,
  /* Aside Left */
  aLposition: 'relative',
  aLtop: 'auto',
  aLleft: 'auto',
  aLright: 'auto',
  aLbottom: 'auto',
  aLzIndex: 1001,
  aLwidth: 1200,
  aLheight: 48,
  aLpaddingLeft: 0,
  /* Aside Right */
  aRposition: 'relative',
  aRtop: 'auto',
  aRleft: 'auto',
  aRright: 'auto',
  aRbottom: 'auto',
  aRzIndex: 1001,
  aRwidth: 1200,
  aRheight: 48,
  aRpaddingLeft: 0,
  /* Footer */
  fFposition: 'relative',
  fFtop: 'auto',
  fFleft: 'auto',
  fFright: 'auto',
  fFbottom: 'auto',
  fFzIndex: 1001,
  fFwidth: 1200,
  fFheight: 48,
  fFpaddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out'
});

// const commonProps = computed(() => {
//   const { transitionDuration, transitionTimingFunction } = props;
//   return {
//     transitionDuration,
//     transitionTimingFunction
//   };
// });

// type Position = 'relative' | 'static' | 'fixed' | 'absolute' | 'sticky';
// const position = ref<Position>('absolute');

// type Auto = number | 'auto';
// const auto = ref<Auto>('auto');
console.log(props);
</script>
<style>
.wikixia-admin-layout {
  position: relative;
  height: 1000px;
}
</style>
