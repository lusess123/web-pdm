import { FunctionComponent, ReactNode } from 'react';
import { ModelConfig, ModuleConfig, FieldConfig, IComponentConfig, TData } from './type/config';
export * from './type/config';
declare type TIconRendersKeys = {
    undo: ReactNode;
    redo: ReactNode;
    min: ReactNode;
    max: ReactNode;
    full: ReactNode;
    miniMap: ReactNode;
    miniMapNo: ReactNode;
    dagreLayout: ReactNode;
    relationLayout: ReactNode;
    reload: ReactNode;
    image: ReactNode;
    darkness: ReactNode;
    light: ReactNode;
    colorClose: ReactNode;
    colorOpen: ReactNode;
};
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
    IconRenders?: Partial<TIconRendersKeys>;
    disableIcons?: string[];
    onlyMode?: boolean;
}
/**
 *组件定义
 *
 * @param {*} props 属性接口
 * @return {*}
 */
declare const WebPDM: FunctionComponent<IWebPdmProps>;
export default WebPDM;
