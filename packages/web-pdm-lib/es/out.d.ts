import React, { FunctionComponent } from 'react';
import { ModelConfig, ModuleConfig, FieldConfig, IComponentConfig, TData } from './type/config';
export * from './type/config';
declare type TIcon = 'container' | 'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right' | 'retweet' | 'pdm' | 'lock' | 'unlock' | 'image' | 'min' | 'max' | 'reload' | 'miniMap' | 'miniMapNo';
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
    IconRenders?: Record<TIcon, React.ReactNode>;
}
/**
 *组件定义
 *
 * @param {*} props 属性接口
 * @return {*}
 */
declare const WebPDM: FunctionComponent<IWebPdmProps>;
export default WebPDM;
