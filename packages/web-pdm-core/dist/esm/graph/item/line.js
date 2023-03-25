import G6 from '@antv/g6/dist/g6.min.js';
export default (function () {
  G6.registerEdge('console-line', {
    labelAutoRotate: true,
    label: 'cubic-vertical'
  }, 'line');
  G6.registerEdge('console-arrange-line', {
    labelAutoRotate: true
  }, 'line');
});