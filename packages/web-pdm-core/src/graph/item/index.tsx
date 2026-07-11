import { registerModelNode } from './model-node';

let registered = false;

export default () => {
  if (registered) return;
  registerModelNode();
  registered = true;
};
