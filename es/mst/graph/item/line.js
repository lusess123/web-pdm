import G6 from '@antv/g6';
export default (function () {
  G6.registerEdge('console-line', {
    labelAutoRotate: true
  }, 'cubic');
  G6.registerEdge('console-arrange-line', {
    labelAutoRotate: true
  }, 'cubic');
});