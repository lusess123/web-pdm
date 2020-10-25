import { register } from './model-node';
import lineRegister from './line';
export default (mst) => {
    register(mst);
    lineRegister();
};
