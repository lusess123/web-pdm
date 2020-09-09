import { ModelConfig, ModuleConfig  } from 'web-pdm'
export const modules :ModuleConfig[]  = [
    {
        label: 'web-pdm模型定义',
        name:'web-pdm-modeldefine'
    }
]

export const models : ModelConfig[] = [
    {
        name: 'model',
        label: '实体模型',
        module:'web-pdm-modeldefine',
        type:'',
        fields: [
            {
                name: 'id',
                label:'主键',
                type:'string'
            }
        ]

    },
    {
        name: 'module',
        label: '模块',
        module:'web-pdm-modeldefine',
        type:'',
        fields: [
            {
                name: 'id',
                label:'主键',
                type:'string'
            }
        ]

    },
    {
        name: 'field',
        label: '字段',
        module:'web-pdm-modeldefine',
        type:'',
        fields: [
            {
                name: 'id',
                label:'主键',
                type:'string'
            }
        ]

    },
    {
        name: 'metaType',
        label: '字段元数据',
        module:'web-pdm-modeldefine',
        type:'',
        fields: [
            {
                name: 'id',
                label:'主键',
                type:'string'
            }
        ]

    },
]