import React, { useEffect, useState, FunctionComponent, ReactNode } from 'react'
import { createContainer } from "unstated-next"
import { applySnapshot, onSnapshot, withoutUndo } from 'mobx-keystone'
import { useMst } from './context'
import { observer } from 'mobx-react-lite'
import { Provider, createRootStore } from './context'
import { StoreContent, useStore } from './store'
import MSTPage from './components'
// import { TIconRendersKeys } from './components/model-toolbar'
import {
    ModelConfig,
    ModuleConfig,
    FieldConfig,
    IComponentConfig,
    TData
} from './type/config'
export * from './type/config'
// import './style.scss'

// type FF = InstanceType<typeof {aa:}>


type TIconRendersKeys = {

    undo: ReactNode,
    redo: ReactNode,
    min: ReactNode,
    max: ReactNode,
    full: ReactNode,
    miniMap: ReactNode,
    miniMapNo: ReactNode,
    dagreLayout: ReactNode,
    relationLayout: ReactNode,
    reload: ReactNode,
    image: ReactNode,
    darkness: ReactNode,
    light: ReactNode,
    colorClose: ReactNode,
    colorOpen: ReactNode
}
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
    components?: IComponentConfig
    onModelDetail?: (model: ModelConfig) => void
    themeColor?: string
    darkness?: boolean
    onReload?: () => TData
    intl?: 'CH' | 'EN'
    onIntl?: (string) => string
    IconRenders?: Partial<TIconRendersKeys>,
    disableIcons?: string[],
    onlyMode?: boolean
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
        components,
        IconRenders
    }) => {
        // const data = useMst()
        const store = useStore()

        // useEffect(() => {
        //     // onSnapshot(data, snapshot => {
        //     //     sessionStorage.setItem(
        //     //         'web-pdm' + erdkey,
        //     //         JSON.stringify(snapshot)
        //     //     )
        //     //     sessionStorage.setItem(
        //     //         'web-pdm-fields' + erdkey,
        //     //         JSON.stringify(Array.from(data.Fields.entries()))
        //     //     )
        //     // })
        //     const localdata = sessionStorage.getItem('web-pdm' + erdkey)
        //     if (!localdata) {
        //         withoutUndo(() => data.initData(models, modules))
        //     } else {
        //         const sdata = JSON.parse(localdata)
        //         sdata.sys.height = height
        //         withoutUndo(() => {
        //             const localFieldsdata = sessionStorage.getItem(
        //                 'web-pdm-fields' + erdkey
        //             )
        //             if (localFieldsdata) {
        //                 data.setFields(new Map(JSON.parse(localFieldsdata)))
        //             }
        //             applySnapshot(data, sdata)
        //             data.sys.setOnIgnoreEdge(onIgnoreEdge)
        //             data.sys.setOnModelDetail(onModelDetail)
        //             data.Ui.registComponents(components, IconRenders)
        //             data.setOnReload(onReload!)
        //             data.onIntl = onIntl!
        //         })
        //     }
        // }, [])

        // useEffect(() => {
        //     data.Models.clear()
        //     data.Modules.clear()
        //     data.Fields.clear()
        //     withoutUndo(() => data.initData(models, modules))
        // }, [models])

        // const store = useStore()

        useEffect(() => {
            store.initConfig({ ...components || {}, height: 500 }, modules, models)

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
    // const store = useStore()
    // const [rootStore] = useState(() => {
    //     return createRootStore({
    //         sys: {
    //             height: props.height,
    //             onIgnoreEdge: props.onIgnoreEdge,
    //             onModelDetail: props.onModelDetail,
    //             intl: props.intl,
    //             onlyMode: props.onlyMode
    //         },
    //         Ui: {
    //             themeColor: props.themeColor,
    //             darkness: props.darkness
    //         },
    //         components: props.components,
    //         onReload: props.onReload,
    //         onIntl: props.onIntl,
    //         IconRenders: props.IconRenders,
    //         disableIcons: props.disableIcons
    //     })
    // })



    return (
        // <Provider value={rootStore}>
        //     {rootStore && <Page {...props} />}
        // </Provider>
        <StoreContent.Provider>
            <Page {...props} />
        </StoreContent.Provider>
    )
}

export default WebPDM
