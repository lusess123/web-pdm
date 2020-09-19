import { FunctionComponent } from 'react';
import { ModelConfig, ModuleConfig, FieldConfig, IComponentConfig, TData } from './type/config';
export * from './type/config';
export interface IWebPdmProps {
    models: ModelConfig[];
    modules: ModuleConfig[];
    erdkey: string;
    className?: string;
    style?: any;
    height?: string | number;
    onIgnoreEdge?: (field: FieldConfig) => boolean;
    components: IComponentConfig;
    onModelDetail?: (model: ModelConfig) => void;
    themeColor?: string;
    darkness?: boolean;
    onReload?: () => TData;
    intl?: 'CH' | 'EN';
    onIntl?: (string: any) => string;
}
declare const WebPDM: FunctionComponent<IWebPdmProps>;
export default WebPDM;
