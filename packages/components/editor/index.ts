import { withInstall } from '@asialine/utils/with-install';
import Comp from './src/main.vue';

const Editor = withInstall(Comp);
export { Editor };
export default Editor;

// import type { App } from 'vue';
// Comp.install = function (Vue: App) {
//   Vue.component(Comp.name, Comp);
// };

// export default Comp;
