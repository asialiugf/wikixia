<template>
  <i class="xbb-icon" :style="style">
    <slot></slot>
  </i>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { iconProps } from './icon';

export default defineComponent({
  name: 'XIcon',
  props: iconProps,
  setup(props) {
    const style = computed(() => {
      if (!props.size && !props.color) {
        return {};
      }
      const style1 = {
        ...(props.size ? { 'font-size': `${props.size}px` } : {}),
        ...(props.color ? { color: props.color } : {})
      };
      console.log('style', style1);
      return style;
    });
    return { style };
  }
});
</script>
