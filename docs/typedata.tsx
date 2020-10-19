import { ModelConfig, ModuleConfig } from 'web-pdm'
export const modules: ModuleConfig[] = [
    {
        label: 'ER图',
        name: 'web-pdm'
    }
]

export const models: ModelConfig[] = [
    {
        name: 'model',
        label: '实体模型',
        module: 'web-pdm',
        type: '',
        fields: [
            {
                name: 'id',
                label: '主键',
                type: 'string'
            },
            {
                name: 'label',
                label: '标签',
                type: 'string'
            },
            {
                name: 'name',
                label: '名称',
                type: 'string'
            },
            {
                name: 'module',
                label: '模块',
                type: 'toOne',
                typeMeta: {
                    type: 'Relation',
                    relationModel: 'module'
                }
            },
            {
                name: 'fields',
                label: '拥有字段',
                type: 'toMany',
                typeMeta: {
                    type: 'Relation',
                    relationModel: 'field'
                }
            }
        ]
    },
    {
        name: 'module',
        label: '模块',
        module: 'web-pdm',
        type: '',
        fields: [
            {
                name: 'id',
                label: '主键',
                type: 'string'
            },
            {
                name: 'label',
                label: '标签',
                type: 'string'
            },
            {
                name: 'name',
                label: '名称',
                type: 'string'
            },
            {
                name: 'models',
                label: '拥有模型',
                type: 'toMany',
                typeMeta: {
                    type: 'Relation',
                    relationModel: 'model'
                }
            }
        ]
    },
    {
        name: 'field',
        label: '字段',
        module: 'web-pdm',
        type: '',
        fields: [
            {
                name: 'id',
                label: '主键',
                type: 'string'
            },
            {
                name: 'label',
                label: '标签',
                type: 'string'
            },
            {
                name: 'name',
                label: '名称',
                type: 'string'
            },
            {
                name: 'model',
                label: '模型',
                type: 'toOne',
                typeMeta: {
                    type: 'Relation',
                    relationModel: 'model'
                }
            },
            {
                name: 'metaType',
                label: '关联信息',
                type: 'toOne',
                typeMeta: {
                    type: 'Relation',
                    relationModel: 'metaType'
                }
            }
        ]
    },
    {
        name: 'metaType',
        label: '字段元数据',
        module: 'web-pdm',
        type: '',
        fields: [
            {
                name: 'id',
                label: '主键',
                type: 'string'
            },
            {
                name: 'label',
                label: '标签',
                type: 'string'
            },
            {
                name: 'name',
                label: '名称',
                type: 'string'
            }
        ]
    }
]
