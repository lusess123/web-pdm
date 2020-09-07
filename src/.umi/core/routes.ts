// @ts-nocheck
import { ApplyPluginsType } from '/Users/beiming/work/github/web-pdm/node_modules/@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/_demos/index",
    "component": require('../../../test/mst/index.tsx').default,
    "exact": true
  },
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"README","meta":{"order":null}}],"/demo":[{"path":"/demo","title":"Index","meta":{}}]}},"locales":[],"navs":{"*":[{"path":"/demo","title":"Demo"}]},"title":"web-pdm","logo":"https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png","mode":"site"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": require('../../../README.md').default,
        "exact": true,
        "meta": {
          "locale": "en-US",
          "title": "README",
          "order": null
        },
        "title": "README"
      },
      {
        "path": "/demo",
        "component": require('../../demo/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/demo/index.md",
          "updatedTime": 1599487997561,
          "slugs": [],
          "title": "Index",
          "nav": {
            "path": "/demo",
            "title": "Demo"
          }
        },
        "title": "Index"
      }
    ],
    "title": "web-pdm"
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
