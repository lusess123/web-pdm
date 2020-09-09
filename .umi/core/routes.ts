// @ts-nocheck
import { ApplyPluginsType } from '/Users/beiming/work/github/web-pdm/node_modules/@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/_demos/erd",
    "component": require('../../docs/erd.tsx').default,
    "exact": true
  },
  {
    "path": "/_demos/type-erd",
    "component": require('../../docs/type-erd.tsx').default,
    "exact": true
  },
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"README","meta":{"order":null}},{"path":"/api","title":"Api","meta":{}},{"path":"/er图demo","title":"ER图demo","meta":{}}]}},"locales":[],"navs":{},"title":"web-pdm","logo":"https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png","desc":"一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner","mode":"doc"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": require('../../README.md').default,
        "exact": true,
        "meta": {
          "locale": "en-US",
          "title": "README",
          "order": null
        },
        "title": "README"
      },
      {
        "path": "/er图demo",
        "component": require('../../docs/ER图demo.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/ER图demo.md",
          "updatedTime": 1599559908000,
          "slugs": [],
          "title": "ER图demo"
        },
        "title": "ER图demo"
      },
      {
        "path": "/api",
        "component": require('../../docs/api.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/api.md",
          "updatedTime": 1599621252000,
          "slugs": [],
          "title": "Api"
        },
        "title": "Api"
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
