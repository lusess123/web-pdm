import type { IWebPdmProps, ModelConfig, ModuleConfig } from 'web-pdm';

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
  intl: 'CH',
} satisfies IWebPdmProps;
