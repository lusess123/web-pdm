import type {
  IntlKey,
  IntlParams,
  IWebPdmProps,
  Locale,
  ModelConfig,
  ModuleConfig,
  WebPdmLocale,
  WebPdmThemeMode,
} from 'web-pdm';

export const publicIntl = {
  key: 'graph.relationTooltip' satisfies IntlKey,
  locale: 'en' satisfies Locale,
  params: { source: 'User', target: 'Order' } satisfies IntlParams,
};

const models: ModelConfig[] = [
  {
    name: 'user',
    label: '用户',
    module: 'identity',
    fields: [{ name: 'id', label: 'ID', type: 'string' }],
  },
];

const modules: ModuleConfig[] = [{ name: 'identity', label: '身份' }];
const legacyDisabledIcons: string[] = ['reload', 'image'];

export const publicProps = {
  models,
  modules,
  erdkey: 'type-check',
  locale: 'en' satisfies WebPdmLocale,
  showModelNavigation: true,
  style: { '--web-pdm-accent': '#2563eb' },
  theme: 'system' satisfies WebPdmThemeMode,
} satisfies IWebPdmProps;

export const legacyProps = {
  models,
  modules,
  erdkey: 'legacy-type-check',
  className: 'legacy-web-pdm',
  style: { height: 640 },
  height: 640,
  onIgnoreEdge: () => false,
  components: {
    Tree: () => null,
    Input: () => null,
    Button: () => null,
    Dropdown: () => null,
    Menu: () => null,
    Select: () => null,
    Tooltip: () => null,
    Popover: () => null,
  },
  onModelDetail: () => undefined,
  themeColor: '#1677ff',
  darkness: true,
  intl: 'CH',
  onReload: () => ({ models, modules }),
  onIntl: (text) => text,
  IconRenders: { undo: null, relationLayout: null },
  disableIcons: legacyDisabledIcons,
  onlyMode: false,
} satisfies IWebPdmProps;
