import React, { FunctionComponent } from 'react';
import { TIconRendersKeys } from './components/model-toolbar';
import { ModelConfig, ModuleConfig, FieldConfig, IComponentConfig, TData } from './type/config';
export * from './type/config';
/**
 *组件的props接口
 *
 * @export
 * @interface IWebPdmProps
 */
export interface IWebPdmProps {
    /**
     *传入的模型数据
     *
     * @type {ModelConfig[]}
     * @memberof IWebPdmProps
     */
    models: ModelConfig[];
    /**
     *传入的模块数据
     *
     * @type {ModuleConfig[]}
     * @memberof IWebPdmProps
     */
    modules: ModuleConfig[];
    erdkey: string;
    className?: string;
    style?: any;
    height?: string | number;
    onIgnoreEdge?: (field: FieldConfig) => boolean;
    components?: IComponentConfig;
    onModelDetail?: (model: ModelConfig) => void;
    themeColor?: string;
    darkness?: boolean;
    onReload?: () => TData;
    intl?: 'CH' | 'EN';
    onIntl?: (string: any) => string;
    IconRenders?: Record<TIconRendersKeys, React.ReactNode>;
}
/**
 *组件定义
 *
 * @param {*} props 属性接口
 * @return {*}
 */
declare const WebPDM: FunctionComponent<IWebPdmProps>;
export default WebPDM;
