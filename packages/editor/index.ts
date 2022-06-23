import { withInstall } from '@asialine/utils/with-install';
import Edito from './src';
// import type { asideType } from './src/XLayout.vue';
// import asideType from './src/XLayout.vue';

const Editor = withInstall(Edito);
export { Editor };
export default Editor;
export * from './src';
