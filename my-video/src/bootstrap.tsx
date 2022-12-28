import {registerRoot} from 'remotion';
import ReactDOM from "react-dom";
import {RemotionRoot} from './Root';
import { MyComposition } from './Composition';

registerRoot(RemotionRoot);

export default {
  mount: (ref: string | HTMLElement) => {
    const container = ref instanceof HTMLElement ? ref : document.getElementById(ref);
    if (!container) {
      throw new Error("No container found")
    }
    ReactDOM.render(<MyComposition />, container)
  }
}
