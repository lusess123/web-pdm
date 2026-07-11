import type {
  IWebPdmProps,
  ModelConfig,
  ModuleConfig,
  WebPdmLocale,
  WebPdmThemeMode,
} from 'web-pdm';

const models: ModelConfig[] = [
  {
    name: 'user',
    label: '用户',
    module: 'identity',
    fields: [{ name: 'id', label: 'ID', type: 'string' }],
  },
];

const modules: ModuleConfig[] = [{ name: 'identity', label: '身份' }];

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
  darkness: true,
  intl: 'CH',
} satisfies IWebPdmProps;
