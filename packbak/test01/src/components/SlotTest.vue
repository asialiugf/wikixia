<script lang="ts">
import { h, renderSlot, reactive } from 'vue';
import type { Slots } from 'vue';
interface SetupContext {
  slots: Slots;
}
interface Data {
  [key: string]: unknown;
}
interface listData {
  id: number;
  text: string;
}

export default {
  setup(props: Data, { slots }: SetupContext) {
    const list = reactive<listData[]>([
      {
        id: 1,
        text: 'hahaha'
      },
      {
        id: 2,
        text: 'hehehe'
      },
      {
        id: 3,
        text: 'kokokoko'
      }
    ]);
    return () => [
      h('div', { className: 'default_class' }, [renderSlot(slots, 'default')]),
      h('header', { className: 'header_class' }, [renderSlot(slots, 'header')]),
      list.map(item => {
        return h('p', { className: 'p_class' }, [renderSlot(slots, 'list', { item })]);
      })
    ];
  }
};
</script>
<style>
.default_class {
  font-size: 20px;
  color: aqua;
}
.header_class {
  font-size: 20px;
  color: green;
  font-weight: 700;
}
.p_class {
  font-size: 12px;
  color: red;
  font-weight: 700;
}
</style>
