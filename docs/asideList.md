```ts
// onBeforeMount(() => {
//   const { asideArray } = props;
//   for (let i = 0; i < asideArray.length; i += 1) {
//     asideList.value.push({
//       ...item0
//     });

//     asideList.value[i].key = asideArray[i].key;
//     asideList.value[i].side = asideArray[i].side;
//     asideList.value[i].header = asideArray[i].header;
//     asideList.value[i].footer = asideArray[i].footer;
//     asideList.value[i].width = asideArray[i].width;
//     asideList.value[i].display = asideArray[i].display;
//     asideList.value[i].slotPosition = asideArray[i].slotPosition;

//     const xz = asideMap.get(asideArray[i].header)!;
//     asideList.value[i].coverType = xz.a;

//     console.log('--ssssssssssssssssssssssssssssss', asideList);
//   }
//   // 调用之前，必须先初始化 asideList的 coverType
//   asideSort(asideList.value);

//   // 此循环完成两个动作：
//   // 1. 初始化 asideList的 footer是否被覆盖（true） 因为 asideList是根据 coverType进行排序的
//   //    所以，如果 asideList的某一项footer是false，则从此项目之后，均设置为false
//   // 2. asideMap 的值, 如果同类型有一项为false，则同类型所有均需设置为 false
//   let flagx = true;
//   for (let i = 0; i < asideList.value.length; i += 1) {
//     switch (asideList.value[i].header) {
//       case 'cover': {
//         asideList.value[i].zIndex = 8500;
//         break;
//       }
//       case 'hidden': {
//         asideList.value[i].zIndex = 7500;
//         break;
//       }
//       case 'header': {
//         asideList.value[i].zIndex = 6500;
//         break;
//       }
//       case 'tab': {
//         asideList.value[i].zIndex = 5500;
//         break;
//       }
//       case 'none': {
//         asideList.value[i].zIndex = 4000;
//         break;
//       }
//       default: {
//         asideList.value[i].zIndex = 4000;
//         break;
//       }
//     }
//     const xz = asideMap.get(asideList.value[i].header)!;
//     if (!flagx) {
//       // 如果上一项footer是false，则此项footer也设置为false
//       asideList.value[i].footer = false;
//       if (xz.b) {
//         xz.b = false;
//         asideMap.set(asideList.value[i].header, xz);
//       }
//     } else if (!asideList.value[i].footer) {
//       // 如果此项footer是false，则此项footer之后所有项 均设置为false，所以flagx设置为false
//       flagx = false;
//       if (xz.b) {
//         xz.b = false; // 同类型（asideList.value[i].header的值 cover,hidden,header,tab,none）的footer设置为false
//         asideMap.set(asideList.value[i].header, xz);
//       }
//     }
//   }

//   for (let i = 0; i < asideList.value.length; i += 1) {
//     const he = asideList.value[i].header;
//     const xz = asideMap.get(asideList.value[i].header)!;
//     if (!xz.b) {
//       while (asideList.value[i].header === he) {
//         asideList.value[i].footer = false;
//         i += 1;
//         if (i === asideList.value.length) {
//           break;
//         }
//       }
//       switch (asideList.value[i - 1].header) {
//         case 'cover': {
//           footerZIndex.value = 8600;
//           break;
//         }
//         case 'hidden': {
//           footerZIndex.value = 7600;
//           break;
//         }
//         case 'header': {
//           footerZIndex.value = 6600;
//           break;
//         }
//         case 'tab': {
//           footerZIndex.value = 5600;
//           break;
//         }
//         case 'none': {
//           footerZIndex.value = 4600;
//           break;
//         }
//         default: {
//           footerZIndex.value = 3600;
//           break;
//         }
//       }
//       break;
//     }
//   }

//   // let flag = true; // 用于判断是否为false，如果是false，则后面所有的footer的 coverType 均为 false
//   // let flag1 = false; // 标识 footerZIndex 是否已经设置过了
//   // for (let i = 0; i < asideList.value.length; i += 1) {
//   //   if (!flag) {
//   //     asideList.value[i].footer = false;
//   //   } else if (!asideList.value[i].footer) {
//   //     flag = false;
//   //     flag1 = true;
//   //   }
//   //   switch (asideList.value[i].header) {
//   //     case 'cover': {
//   //       asideList.value[i].zIndex = 8500;
//   //       if (flag1) {
//   //         footerZIndex.value = 8600;
//   //         flag1 = false;
//   //       }
//   //       break;
//   //     }
//   //     case 'hidden': {
//   //       asideList.value[i].zIndex = 7500;
//   //       if (flag1) {
//   //         footerZIndex.value = 7600;
//   //         flag1 = false;
//   //       }
//   //       break;
//   //     }
//   //     case 'header': {
//   //       asideList.value[i].zIndex = 6500;
//   //       if (flag1) {
//   //         footerZIndex.value = 6600;
//   //         flag1 = false;
//   //       }
//   //       break;
//   //     }
//   //     case 'tab': {
//   //       asideList.value[i].zIndex = 5500;
//   //       if (flag1) {
//   //         footerZIndex.value = 5600;
//   //         flag1 = false;
//   //       }
//   //       break;
//   //     }
//   //     case 'none': {
//   //       asideList.value[i].zIndex = 4000;
//   //       if (flag1) {
//   //         footerZIndex.value = 4600;
//   //         flag1 = false;
//   //       }
//   //       break;
//   //     }
//   //     default: {
//   //       asideList.value[i].zIndex = 4000;
//   //       if (flag1) {
//   //         footerZIndex.value = 3600;
//   //         flag1 = false;
//   //       }
//   //       break;
//   //     }
//   //   }
//   // }

//   // charmi 这一部分需要重新写，宽度算法不对，需要重新设置宽度

//   asideWidth(asideList, winSize.width);
//   console.log('---ssssssssssssssssssssssssssssss', asideList.value);
//   console.log(asideMap);
// });

```
