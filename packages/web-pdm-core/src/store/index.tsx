import { useState } from 'react'
import { ModelConfig, ModuleConfig, FieldConfig, SysConfig, IComponentConfig } from '../type/config';
import { createContainer } from "unstated-next"
import { map } from 'lodash'
import { arraryToMap } from '../util'
import { renderModelTitle } from '../util/label'

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function NewGuid() {
    return S4()
    //return globaIndex ++
}

export type Dict<T> = Record<string, T>;
export type Data<T> = T

export type TModel = {
    moduleId?: string
} & ModelConfig

export type TUI = Partial<{

    themeColor: String,
    selectedColor: String,
    darkness: boolean,
    height: number

}> & Partial<IComponentConfig>

export type TStore = {
    Modules: Dict<Data<ModuleConfig>>,
    Models: Dict<TModel>,
    Fields: Dict<Data<FieldConfig>>,
    sys: Partial<SysConfig> & { toggleTabOrTree?: () => void },
    graph: any,
    Ui: TUI,
    intl: any,
    Nodes: any[],
    edges: any[],

    initConfig: (config: IComponentConfig, modules: Data<ModuleConfig>[], models: Data<ModelConfig>[]) => void,
    setCheckedKeys: (keys: string[]) => void,
    filterModel: (model: Data<ModelConfig>) => boolean,
    getModelsByModule: (moduleId: string) => Data<ModelConfig>[],
    renderModelTitle: (model: Data<ModelConfig>) => any

}

function useValue<T = any>(initValue: T) {
    const State = useState<T>(initValue)
    return {
        get: State[0],
        set: State[1]
    }
}

const useInnerStore: () => TStore = () => {

    const UiState = useValue<IComponentConfig>({

    })
    const TabOrTree = useValue<boolean>(false)
    const Modules = useValue<Dict<Data<ModuleConfig>>>({});
    const CheckedKeys = useValue<string[]>([]);
    const CurrentModule = useValue<string>('');
    const Models = useValue<Dict<TModel>>({});

    const Search = useValue('');
    const ShowNameOrLabel = useValue(false);
    const ExpandedKeys = useValue<string[]>([])

    return {

        Modules: Modules.get,
        Models: Models.get,
        Fields: {},

        Nodes: [],
        edges: [],

        sys: {
            tabOrTree: TabOrTree.get,
            checkedKeys: CheckedKeys.get,
            currentModule: CurrentModule.get,
            search: Search.get,
            showNameOrLabel: ShowNameOrLabel.get,
            expandedKeys: ExpandedKeys.get,

            changeModuleValue: (val) => {
                CurrentModule.set(val);
            },
            toggleTabOrTree: () => {
                if (TabOrTree.get) {
                    CurrentModule.set('')
                }
                TabOrTree.set(!TabOrTree.get)
            },
            setExpandedKeys: (expandedKeys: string[]) => {
                ExpandedKeys.set(expandedKeys)
            },

            toggleShowNameOrLabel: () => {
                ShowNameOrLabel.set(!ShowNameOrLabel.get)
            },
            setSearch: Search.set


        },
        graph: {},
        Ui: UiState.get,
        intl: (text) => text,

        initConfig: (config: TUI, modules: Data<ModuleConfig>[], models: Data<ModelConfig>[]) => {
            config && UiState.set(config)
            let moduleDict: Record<string, string> = {}
            modules && Modules.set(arraryToMap(modules, (_) => {

                const id = NewGuid().toString()
                if (!moduleDict[_.name]) {
                    moduleDict[_.name] = id
                }
                return id;

            }, (m, _) => {
                return m
            }))
            models && Models.set(arraryToMap(models, (_) => {
                const id = NewGuid().toString()
                return id

            }, (m, _) => {
                return {
                    ...m,
                    moduleId: moduleDict[m.module]
                }
            }))
        },
        setCheckedKeys: (keys: string[]) => {
            CheckedKeys.set(keys)
        },

        filterModel: (model: Data<ModelConfig>) => {
            if (CurrentModule.get) {
                const m = Modules.get[CurrentModule.get];
                if (m && m.name != model.module) {
                    return false
                }
            }
            if (Search.get) {
                if ((!ShowNameOrLabel.get ? model.label : model.name).indexOf(Search.get) === -1) {
                    return false
                }
            }
            return true;
        },

        getModelsByModule: (moduleId: string) => {
            const name = Modules.get[moduleId]?.name;
            if (name) {
                return map(Models.get).filter(m => m.module === name)
            }
            return []
        },
        renderModelTitle: (model: TModel) => {
            return renderModelTitle(model.label, Search.get, ShowNameOrLabel.get, model.name);
        }



    }
}

export const StoreContent = createContainer(useInnerStore)
export const useStore = StoreContent.useContainer

