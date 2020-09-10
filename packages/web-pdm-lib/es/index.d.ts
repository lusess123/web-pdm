import React, { SFC } from 'react';
import { ModelConfig, ModuleConfig, FieldConfig } from './type/config';
export * from './type/config';
export interface IWebPdmProps {
    models: ModelConfig[];
    modules: ModuleConfig[];
    erdkey: string;
    className?: string;
    style?: any;
    height?: string | number;
    onIgnoreEdge?: (field: FieldConfig) => boolean;
}
export declare const Page: React.FunctionComponent<IWebPdmProps>;
declare const WebPDM: SFC<IWebPdmProps>;
export default WebPDM;
