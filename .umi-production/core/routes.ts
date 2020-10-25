// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/beiming/work/github/web-pdm/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/_demos/type-erd",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__type-erd' */'../../docs/type-erd.tsx')}),
    "exact": true
  },
  {
    "path": "/_demos/erd",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__erd' */'../../docs/erd.tsx')}),
    "exact": true
  },
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"web-pdm - 一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner","meta":{"order":10}}],"/config":[{"path":"/config","title":"props","meta":{"order":1}}],"/demo":[{"path":"/demo","title":"例子","meta":{"order":1}}],"/guide":[{"title":"介绍","children":[{"path":"/guide","title":"介绍"},{"path":"/guide/getting-started","title":"快速上手"}]},{"title":"模型定义","children":[{"path":"/guide/model","title":"Model"},{"path":"/guide/relation","title":"Relation"}]},{"title":"工具栏","children":[{"path":"/guide/toolbar","title":"基本操作"}]},{"title":"其他","children":[{"path":"/guide/migration","title":"从 0.0.X 迁移"},{"path":"/guide/faq","title":"FAQ"},{"path":"/guide/next","title":"踩坑和实践分享"},{"path":"/guide/ddd","title":"模型驱动前端开发"}]}]}},"locales":[],"navs":{"*":[{"path":"/guide","title":"指南","order":1},{"order":2,"title":"配置项","path":"/config"},{"order":3,"title":"例子","path":"/demo"},{"title":"API","path":"/typedoc/"},{"title":"GitHub","path":"https://github.com/lusess123/web-pdm"},{"title":"更新日志","path":"https://github.com/lusess123/web-pdm/blob/master/packages/web-pdm-lib/CHANGELOG.md"}]},"title":"web-pdm","logo":"http://zyking.xyz/logo.png","desc":"一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner","mode":"site"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.md' */'../../docs/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1603089395000,
          "title": "web-pdm - 一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner",
          "order": 10,
          "hero": {
            "title": "web-pdm",
            "desc": "<div class=\"markdown\"><p>一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner</p></div>",
            "actions": [
              {
                "text": "快速上手",
                "link": "/guide/getting-started"
              }
            ]
          },
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self</p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 2,
              "value": "快速体验",
              "heading": "快速体验"
            },
            {
              "depth": 2,
              "value": "反馈与共建",
              "heading": "反馈与共建"
            }
          ]
        },
        "title": "web-pdm - 一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner"
      },
      {
        "path": "/config",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__config__index.md' */'../../docs/config/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/config/index.md",
          "updatedTime": 1603636882000,
          "order": 1,
          "nav": {
            "order": 2,
            "title": "配置项",
            "path": "/config"
          },
          "toc": "menu",
          "slugs": [
            {
              "depth": 1,
              "value": "props",
              "heading": "props"
            },
            {
              "depth": 2,
              "value": "models",
              "heading": "models"
            },
            {
              "depth": 2,
              "value": "modules",
              "heading": "modules"
            },
            {
              "depth": 2,
              "value": "height",
              "heading": "height"
            },
            {
              "depth": 2,
              "value": "style",
              "heading": "style"
            },
            {
              "depth": 2,
              "value": "themeColor",
              "heading": "themecolor"
            },
            {
              "depth": 2,
              "value": "darkness",
              "heading": "darkness"
            },
            {
              "depth": 2,
              "value": "onIgnoreEdge",
              "heading": "onignoreedge"
            },
            {
              "depth": 2,
              "value": "onModelDetail",
              "heading": "onmodeldetail"
            },
            {
              "depth": 2,
              "value": "onReload",
              "heading": "onreload"
            },
            {
              "depth": 2,
              "value": "intl",
              "heading": "intl"
            },
            {
              "depth": 2,
              "value": "onIntl",
              "heading": "onintl"
            },
            {
              "depth": 2,
              "value": "components: IComponentConfig",
              "heading": "components-icomponentconfig"
            },
            {
              "depth": 2,
              "value": "IconRenders?: Record<TIcon, React.ReactNode>",
              "heading": "iconrenders-recordticon-reactreactnode"
            }
          ],
          "title": "props"
        },
        "title": "props"
      },
      {
        "path": "/demo",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__demo__index.md' */'../../docs/demo/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/demo/index.md",
          "updatedTime": 1603089395000,
          "order": 1,
          "title": "例子",
          "nav": {
            "order": 3,
            "title": "例子",
            "path": "/demo"
          },
          "toc": "menu",
          "slugs": []
        },
        "title": "例子"
      },
      {
        "path": "/guide/ddd",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__ddd.md' */'../../docs/guide/ddd.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/ddd.md",
          "updatedTime": 1603089395000,
          "legacy": "/ddd",
          "slugs": [
            {
              "depth": 1,
              "value": "模型驱动前端开发",
              "heading": "模型驱动前端开发"
            }
          ],
          "title": "模型驱动前端开发",
          "nav": {
            "path": "/guide",
            "title": "指南"
          },
          "group": {
            "title": "其他"
          }
        },
        "title": "模型驱动前端开发"
      },
      {
        "path": "/guide/faq",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__faq.md' */'../../docs/guide/faq.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/faq.md",
          "updatedTime": 1603089395000,
          "title": "FAQ",
          "slugs": [],
          "nav": {
            "path": "/guide",
            "title": "指南"
          },
          "group": {
            "title": "其他"
          }
        },
        "title": "FAQ"
      },
      {
        "path": "/guide/getting-started",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__getting-started.md' */'../../docs/guide/getting-started.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/getting-started.md",
          "updatedTime": 1603089395000,
          "title": "快速上手",
          "legacy": "/getting",
          "slugs": [],
          "nav": {
            "path": "/guide",
            "title": "指南"
          },
          "group": {
            "title": "介绍"
          }
        },
        "title": "快速上手"
      },
      {
        "path": "/guide",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__index.md' */'../../docs/guide/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/index.md",
          "updatedTime": 1603089395000,
          "title": "介绍",
          "nav": {
            "title": "指南",
            "order": 1,
            "path": "/guide"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "What?",
              "heading": "what"
            },
            {
              "depth": 1,
              "value": "Why?",
              "heading": "why"
            },
            {
              "depth": 2,
              "value": "业务设计 ≈ 模型设计  ≈ 数据库设计",
              "heading": "业务设计-≈-模型设计--≈-数据库设计"
            },
            {
              "depth": 2,
              "value": "定制化的 ER 图更有价值",
              "heading": "定制化的-er-图更有价值"
            },
            {
              "depth": 2,
              "value": "在线版本的 powerdesigner",
              "heading": "在线版本的-powerdesigner"
            },
            {
              "depth": 1,
              "value": "How?",
              "heading": "how"
            },
            {
              "depth": 2,
              "value": "技术选型",
              "heading": "技术选型"
            },
            {
              "depth": 3,
              "value": "SVG vs Canvas",
              "heading": "svg-vs-canvas"
            }
          ],
          "group": {
            "title": "介绍"
          }
        },
        "title": "介绍"
      },
      {
        "path": "/guide/migration",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__migration.md' */'../../docs/guide/migration.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/migration.md",
          "updatedTime": 1603089395000,
          "legacy": "/migration",
          "slugs": [
            {
              "depth": 1,
              "value": "从 0.0.X 迁移",
              "heading": "从-00x-迁移"
            }
          ],
          "title": "从 0.0.X 迁移",
          "nav": {
            "path": "/guide",
            "title": "指南"
          },
          "group": {
            "title": "其他"
          }
        },
        "title": "从 0.0.X 迁移"
      },
      {
        "path": "/guide/model",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__model.md' */'../../docs/guide/model.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/model.md",
          "updatedTime": 1603089395000,
          "slugs": [],
          "title": "Model",
          "nav": {
            "path": "/guide",
            "title": "指南"
          },
          "group": {
            "title": "模型定义"
          }
        },
        "title": "Model"
      },
      {
        "path": "/guide/next",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__next.md' */'../../docs/guide/next.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/next.md",
          "updatedTime": 1603089395000,
          "legacy": "/next",
          "slugs": [
            {
              "depth": 2,
              "value": "踩坑和实践分享",
              "heading": "踩坑和实践分享"
            },
            {
              "depth": 3,
              "value": "连接线",
              "heading": "连接线"
            },
            {
              "depth": 3,
              "value": "布局算法选择",
              "heading": "布局算法选择"
            },
            {
              "depth": 3,
              "value": "性能优化",
              "heading": "性能优化"
            }
          ],
          "title": "踩坑和实践分享",
          "nav": {
            "path": "/guide",
            "title": "指南"
          },
          "group": {
            "title": "其他"
          }
        },
        "title": "踩坑和实践分享"
      },
      {
        "path": "/guide/relation",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__relation.md' */'../../docs/guide/relation.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/relation.md",
          "updatedTime": 1603089395000,
          "slugs": [],
          "title": "Relation",
          "nav": {
            "path": "/guide",
            "title": "指南"
          },
          "group": {
            "title": "模型定义"
          }
        },
        "title": "Relation"
      },
      {
        "path": "/guide/toolbar",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__toolbar.md' */'../../docs/guide/toolbar.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/toolbar.md",
          "updatedTime": 1603089395000,
          "title": "基本操作",
          "slugs": [],
          "nav": {
            "path": "/guide",
            "title": "指南"
          },
          "group": {
            "title": "工具栏"
          }
        },
        "title": "基本操作"
      },
      {
        "path": "/ddd",
        "exact": true,
        "redirect": "/guide/ddd"
      },
      {
        "path": "/getting",
        "exact": true,
        "redirect": "/guide/getting-started"
      },
      {
        "path": "/migration",
        "exact": true,
        "redirect": "/guide/migration"
      },
      {
        "path": "/next",
        "exact": true,
        "redirect": "/guide/next"
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
