import type { ComponentType, FunctionComponent, ReactNode } from 'react';

export type MetaTypeConfig = {
  relationModel: string;
  type: string;
};

export type FieldMetaTypeConfig = {
  relationModel: string;
  field: string;
  type?: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  typeMeta?: MetaTypeConfig | FieldMetaTypeConfig[];
  type?: string;
};

export type ModelConfig = {
  name: string;
  label: string;
  fields: FieldConfig[];
  module: string;
  type?: string;
  aggregateRoot?: boolean;
  aggregateModelKey?: string;
  belongAggregate?: string;
};

export type ModuleConfig = {
  name: string;
  label: string;
};

export type SysConfig = {
  search: string;
  currentModel: string;
  currentModule: string;
  checkedKeys: string[];
  showNameOrLabel: boolean;
  tabOrTree: boolean;
  height: number;
};

export type IComponentConfig = {
  Tree?: ComponentType;
  Input?: ComponentType;
  Button?: ComponentType;
  Dropdown?: ComponentType;
  Menu?: ComponentType;
  Select?: ComponentType;
  Tooltip?: ComponentType;
  Popover?: ComponentType;
};

export type TData = {
  models: ModelConfig[];
  modules: ModuleConfig[];
};

export type IconName =
  | 'undo'
  | 'redo'
  | 'min'
  | 'max'
  | 'full'
  | 'miniMap'
  | 'miniMapNo'
  | 'dagreLayout'
  | 'relationLayout'
  | 'reload'
  | 'image'
  | 'darkness'
  | 'light'
  | 'colorClose'
  | 'colorOpen';

export interface IWebPdmProps {
  models: ModelConfig[];
  modules: ModuleConfig[];
  erdkey: string;
  className?: string;
  style?: Record<string, unknown>;
  height?: string | number;
  onIgnoreEdge?: (field: FieldConfig) => boolean;
  components?: IComponentConfig;
  onModelDetail?: (model: ModelConfig) => void;
  themeColor?: string;
  darkness?: boolean;
  onReload?: () => TData;
  intl?: 'CH' | 'EN';
  onIntl?: (text: string) => string;
  IconRenders?: Partial<Record<IconName, ReactNode>>;
  disableIcons?: IconName[];
  onlyMode?: boolean;
}

declare const WebPdmCore: FunctionComponent<IWebPdmProps>;

export default WebPdmCore;
