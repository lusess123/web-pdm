import { register } from "./model-node";
import lineRegister from "./line";
export default (function (mst) {
  register(mst);
  lineRegister();
});