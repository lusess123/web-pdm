import React, { useEffect, useState, FunctionComponent } from 'react'
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone'
import { useMst } from './context'
import { observer } from 'mobx-react-lite'
import { Provider, createRootStore } from './context'
import MSTPage from './components'
import {
    ModelConfig,
    ModuleConfig,
    FieldConfig,
    IComponentConfig,
    TData
} from './type/config'
export * from './type/config'
// import './style.scss'

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
    models: ModelConfig[]

    /**
     *传入的模块数据
     *
     * @type {ModuleConfig[]}
     * @memberof IWebPdmProps
     */
    modules: ModuleConfig[]
    erdkey: string
    className?: string
    style?: any
    height?: string | number
    onIgnoreEdge?: (field: FieldConfig) => boolean
    components: IComponentConfig
    onModelDetail?: (model: ModelConfig) => void
    themeColor?: string
    darkness?: boolean
    onReload?: () => TData
    intl?: 'CH' | 'EN'
    onIntl?: (string) => string
}

const Page = observer<IWebPdmProps>(
    ({
        onIntl,
        onReload,
        onModelDetail,
        models,
        modules,
        erdkey,
        className,
        style,
        height,
        onIgnoreEdge,
        components
    }) => {
        const data = useMst()
        useEffect(() => {
            onSnapshot(data, snapshot => {
                sessionStorage.setItem(
                    'web-pdm' + erdkey,
                    JSON.stringify(snapshot)
                )
                sessionStorage.setItem(
                    'web-pdm-fields' + erdkey,
                    JSON.stringify(Array.from(data.Fields.entries()))
                )
            })
            const localdata = sessionStorage.getItem('web-pdm' + erdkey)
            if (!localdata) {
                withoutUndo(() => data.initData(models, modules))
            } else {
                const sdata = JSON.parse(localdata)
                sdata.sys.height = height
                withoutUndo(() => {
                    const localFieldsdata = sessionStorage.getItem(
                        'web-pdm-fields' + erdkey
                    )
                    if (localFieldsdata) {
                        data.setFields(new Map(JSON.parse(localFieldsdata)))
                    }
                    applySnapshot(data, sdata)
                    data.sys.setOnIgnoreEdge(onIgnoreEdge)
                    data.sys.setOnModelDetail(onModelDetail)
                    data.Ui.registComponents(components)
                    data.setOnReload(onReload!)
                    data.onIntl = onIntl!
                })
            }
        }, [])
        return <MSTPage className={className} style={style} />
    }
)
/**
 *组件定义
 *
 * @param {*} props 属性接口
 * @return {*}
 */
const WebPDM: FunctionComponent<IWebPdmProps> = props => {
    const [rootStore] = useState(() => {
        return createRootStore({
            sys: {
                height: props.height,
                onIgnoreEdge: props.onIgnoreEdge,
                onModelDetail: props.onModelDetail,
                intl: props.intl
            },
            Ui: {
                themeColor: props.themeColor,
                darkness: props.darkness
            },
            components: props.components,
            onReload: props.onReload,
            onIntl: props.onIntl
        })
    })
    return (
        <Provider value={rootStore}>
            {rootStore && <Page {...props} />}
        </Provider>
    )
}

export default WebPDM
