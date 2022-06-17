# layout配置说明

## 侧边栏配置
```ts
export interface asideItem {
  slotPosition: 'absolute' | 'sticky'; // LayoutAside使用 ： 从应用程序传过来，并将其传至 LayoutAside子组件中。
  key: string; // 侧边栏的key，slot的name会用这个key  要唯一，不能重复
  header: 'cover' | 'hidden' | 'header' | 'tab' | 'none'; // 是否覆盖 header ?
  footer: boolean; // 是否覆盖 footer
  side: 'left' | 'right'; // 停靠方式： 'left' 左对齐 'right' 右对齐 'mainl' 主区 左对齐 'mainr' 主区 右对齐 'isolated' 单独定位
  display?: boolean; // 是否显示
  draggbale?: boolean; // 是否可以移动
  width: number;
  height?: number;
  start?: number;
  end?: number;
  top?: number | 'auto';
  left?: number | 'auto';
  right?: number | 'auto';
  bottom?: number | 'auto';
  zIndex?: number;
  coverType?: number; // 覆盖类型，0:-cover，1:-hidden，2:-header，3:-tab，4:-none 用于排序
  slotTop?: number;
  slotHeight?: number;
}


const asideArray = ref<asideItem[]>([
  {
    slotPosition: 'absolute',
    header: 'cover',
    footer: false,
    key: 'asidea',
    side: 'left',
    width: 100,
    display: true,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'hidden',
    footer: true,
    key: 'asideb',
    side: 'right',
    width: 100,
    display: true,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'header',
    footer: true,
    key: 'asidec',
    side: 'left',
    width: 100,
    display: true,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'tab',
    footer: true,
    key: 'asided',
    side: 'right',
    width: 100,
    display: true,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'none',
    footer: true,
    key: 'asidee',
    side: 'right',
    width: 100,
    display: true,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'none',
    footer: true,
    key: 'asidef',
    side: 'right',
    width: 100,
    display: false,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'cover',
    footer: true,
    key: 'asideg',
    side: 'right',
    width: 100,
    display: true,
    draggbale: true
  },
  {
    slotPosition: 'sticky',
    header: 'hidden',
    footer: true,
    key: 'asideg',
    side: 'right',
    width: 100,
    display: false,
    draggbale: true
  }
]);
```
