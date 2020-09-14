// import mst from '@antv/g6/lib/algorithm/mst'
import { getSnapshot } from 'mobx-keystone';
// import { mapToArrary } from '../util'
import { initStyle } from './item/style';
const getLength = (length) => {
    return length >= 20 ? length : 20;
};
export const createData = (root) => {
    const { style, colors } = initStyle({ primaryColor: root.Ui.themeColor });
    const res = [...root.Models.values()].map(m => {
        return {
            id: 'model-' + m.id,
            type: 'console-model-Node',
            isKeySharp: root.graph.zoom <= 0.4,
            visible: !!root.sys.checkedKeys.find(a => a === m.id),
            selected: m.id === root.sys.currentModel,
            showNameOrLabel: root.sys.showNameOrLabel,
            config: {
                width: 300,
                headerHeight: 48,
                fieldHeight: 32,
                labelSize: 14,
                styleConfig: style,
                colors
            },
            data: {
                moduleKey: m.moduleId,
                label: m.label,
                fields: m.fields.map(a => (Object.assign(Object.assign({}, getSnapshot(a)), { relationModel: getSnapshot(a.relationModel) }))),
                key: m.id,
                name: m.name,
                tag: 'aggregate',
                aggregateRoot: m.aggregateRoot,
                aggregateModelKey: m.aggregateModelKey,
                belongAggregate: m.belongAggregate,
                nodeSize: ((48 + getLength(m.fields.length) * 48) / 6) * 6 / 6,
            },
            themeColor: colors.blue,
            darkness: root.Ui.darkness,
            size: ((48 + getLength(m.fields.length) * 48) / 6) * 6,
        };
    }).filter(a => a.visible);
    // console.log(res)
    if (res.length > 0)
        return res.concat([createSysNode()]);
    return res;
};
const createSysNode = () => {
    return {
        id: 'model-SYS-CENTER-POINT',
        type: 'circle',
        isSys: true,
        visible: true,
        isKeySharp: true,
        size: 10,
        style: {
            opacity: 0
        }
    };
};
const Relation = {
    ToOne: '1:1',
    ToMany: '1:n',
    lookup: '查找'
};
export const createLinks = (root) => {
    const { style } = initStyle({ primaryColor: root.Ui.themeColor });
    const links = [...root.Models.values()].reduce((pre, model) => {
        if (!root.sys.checkedKeys.find(a => a === model.id))
            return pre;
        const sysLink = {
            key: 'model-' + model.id + '~' + 'model-SYS-CENTER-POINT',
            source: 'model-' + model.id,
            // target: 'model-' + relationModel!.id,
            // visible: false,
            isSys: true,
            // style: {
            //   visible: false,
            // },
            target: 'model-SYS-CENTER-POINT',
            type: 'console-line',
            style: {
                opacity: 0
            }
        };
        const fieldLinks = (model.fields).reduce((fPre, field, i) => {
            var _a;
            const isRelation = field.typeMeta && field.typeMeta.type === 'Relation' && ((_a = field.typeMeta) === null || _a === void 0 ? void 0 : _a.relationModel);
            // const { id } = field
            if (isRelation) {
                if (root.sys.onIgnoreEdge && root.sys.onIgnoreEdge(field))
                    return fPre;
                //if(field?.typeMeta?.relationModel === 'base_User' && (confirmEnding(field.name, 'createdBy') || confirmEnding(field.name,'updatedBy')  ) ) return fPre
                const relationModel = root.findModelByName(field.typeMeta.relationModel);
                if (!relationModel || !root.sys.checkedKeys.find(a => a === relationModel.id))
                    return fPre;
                const isTo = true;
                const l = model.fields.length;
                const sourceAnchor = !isTo ? (i + 2) : (2 + i + l);
                return [
                    ...fPre,
                    {
                        key: 'model-' + model.id + '~' + 'model-' + relationModel.id,
                        source: 'model-' + model.id,
                        target: 'model-' + relationModel.id,
                        sourceAnchor,
                        // // targetAnchor: sourceAnchor,
                        targetAnchor: model.id === relationModel.id ? (sourceAnchor - 1) : undefined,
                        fieldIndex: i,
                        tooltip: `<div>从 <span class='text'>${relationModel === null || relationModel === void 0 ? void 0 : relationModel.label}</span> 到 <span class='text'>${model === null || model === void 0 ? void 0 : model.label}</span> ${Relation[field.type] || field.type} 关系</div>`,
                        fieldsLength: l,
                        style: style.default.edge,
                        type: 'console-line',
                        // label: field.type,
                        labelAutoRotate: true,
                        loopCfg: {
                            // position: 'top',
                            clockwise: true,
                            dist: 100,
                        },
                    },
                ];
            }
            else
                return fPre;
        }, []);
        return [
            ...pre,
            ...fieldLinks,
            sysLink
        ];
    }, []);
    return links.filter(a => !!a);
};
// export const getNodes = (models, styleConfig) => {
//     // const _key = stateConfig.model_keys.key
//     const nodeRes = models
//       .map((model, i) => {
//         return {
//           id: 'model-' + model.key,
//           hide: checkedKeys.indexOf('model-' + model.key) === -1,
//           // groupId: `module-${model.moduleKey}`,
//           config: {
//             width: 300,
//             headerHeight: 48,
//             fieldHeight: 32,
//             labelSize: 14 ,
//             hide: checkedKeys.indexOf('model-' + model.key) === -1,
//             styleConfig,
//           },
//           data: {
//             moduleKey: `module-${model.moduleKey}`,
//             label: showLable(model),
//             fields: fields(model, models),
//             key: model.key,
//             name: model.name || model.key,
//             tag: 'aggregate',
//             aggregateRoot:  model.aggregateRoot,
//             aggregateModelKey: model.aggregateModelKey,
//             belongAggregate: model.belongAggregate,
//             nodeSize:  ((48 +  getLength(model.fields.length) * 48) / 6) *
//             6  / 6,
//           },
//           type: 'console-model-Node',
//           isKeySharp: true,
//           size:   ((48 +  getLength(model.fields.length) * 48) / 6) *
//           6 ,
//         }
//       })
//     return nodeRes.length > 0 ? nodeRes.concat([createSysNode()]) : nodeRes
//     // })
//   }
