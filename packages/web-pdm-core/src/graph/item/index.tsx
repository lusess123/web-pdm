import lineRegister from './line';
import { register } from './model-node';

let registered = false;

export default () => {
  if (registered) return;
  registered = true;
  register();
  lineRegister();
};
