// import mst from '@antv/g6/lib/algorithm/mst'
import { RootInstance } from '../type';
// import { mapToArrary } from '../util'
import { initStyle } from './item/style';

const getLength = (length: number) => {
  return length >= 20 ? length : 20;
};

export const createData = (root: RootInstance) => {
  const { style, colors } = initStyle({
    primaryColor: root.Ui.themeColor,
    darkness: root.Ui.darkness,
  });
  const res = [...root.Models.values()]
    .filter(
      (a) =>
        !root.sys.dagreLayout || (root.sys.dagreLayout && a.aggregateModelKey),
    )
    .map((m) => {
      return {
        id: 'model-' + m.id,
        type: 'console-model-Node',
        isKeySharp: root.graph.zoom <= 0.4,
        visible: !!root.sys.checkedKeys.find((a) => a === m.id),
        selected: m.id === root.sys.currentModel,
        showNameOrLabel: root.sys.showNameOrLabel,
        config: {
          width: 300,
          headerHeight: 48,
          fieldHeight: 32,
          labelSize: 14,
          styleConfig: style,
          colors,
        },
        data: {
          moduleKey: m.moduleId,
          aggregateRelationLabel: root.intl('graph.aggregateRelation'),
          label: m.label,
          fields: m.fields.map((a) => ({
            // ...getSnapshot(a) ,
            // relationModel: getSnapshot(a.relationModel)
            ...a,
            relationModel: a.relationModel,
          })),
          key: m.id,
          name: m.name,
          relationLabels: createRelationLabels(root),
          viewDetailsLabel: root.intl('graph.viewDetails'),
          tag: 'aggregate',
          aggregateRoot: m.aggregateRoot,
          aggregateModelKey: m.aggregateModelKey,
          belongAggregate: m.belongAggregate,
          nodeSize: (((48 + getLength(m.fields.length) * 48) / 6) * 6) / 6,
        },
        themeColor: colors.blue,
        darkness: root.Ui.darkness,
        size: ((48 + getLength(m.fields.length) * 48) / 6) * 6,
      };
    })
    .filter((a) => a.visible);
  //const t1 = +new Date()
  // console.log(res)
  //alert(res.length +  '   ' + (t1 - t0))
  if (res.length > 0) return res.concat([createSysNode() as any]);

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
      opacity: 0,
    },
  };
};

const createRelationLabels = (root: RootInstance): Record<string, string> => ({
  ToOne: '1:1',
  ToMany: '1:n',
  lookup: root.intl('graph.lookupRelation'),
  toOne: '1:1',
  toMany: '1:n',
  Lookup: root.intl('graph.lookupRelation'),
});

const escapeHtml = (value: string | number | undefined) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const createLinks = (root: RootInstance) => {
  const relationLabels = createRelationLabels(root);
  const { style, palette } = initStyle({
    primaryColor: root.Ui.themeColor,
    darkness: root.Ui.darkness,
  });
  const links = [...root.Models.values()].reduce((pre, model) => {
    if (!root.sys.checkedKeys.find((a) => a === model.id)) return pre;

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
        opacity: 0,
      },
    };

    const fieldLinks = model.fields.reduce((fPre, field, i) => {
      const tempfPre = fPre;
      // const { id } = field
      if (Array.isArray(field.typeMeta)) {
        field.typeMeta.forEach((element: any) => {
          const isRelation =
            element.type === 'Relation' && element?.relationModel;

          if (isRelation) {
            if (root.sys.onIgnoreEdge && root.sys.onIgnoreEdge(field))
              return fPre;
            const relationModel = root.findModelByName(element!.relationModel);
            if (
              !relationModel ||
              !root.sys.checkedKeys.find((a) => a === relationModel!.id)
            )
              return fPre;

            const l = model.fields.length;
            const sourceAnchor = 2 + i + l;
            const targetTable = [...root.Models.values()].find(
              (pre) => pre.id === relationModel!.id,
            );
            const targetTableFieldIndex =
              targetTable?.fields.findIndex(
                (item) => item.name === element.field,
              ) + 2;
            const relationEdge = {
              key: 'model-' + model.id + '~' + 'model-' + relationModel!.id,
              source: 'model-' + model.id,
              target: 'model-' + relationModel!.id,
              sourceAnchor,
              targetAnchor: targetTableFieldIndex,
              fieldIndex: i,
              tooltip: `<div>${escapeHtml(
                root.intl('graph.fieldRelationTooltip', {
                  field: element.field,
                  relationType: relationLabels[field.type] || field.type || '',
                  source: relationModel?.label ?? '',
                  target: model.label,
                }),
              )}</div>`,
              fieldsLength: l,
              style: style.fieldRelation.edge,
              type: 'console-line',
              // label: field.type,
              labelAutoRotate: true,
              loopCfg: {
                // position: 'top',
                clockwise: true, // dist: 200,
                dist: 100,
              },
            };
            tempfPre.push(relationEdge);
            return tempfPre;
          } else return tempfPre;
        });
      } else {
        const isRelation =
          field.typeMeta &&
          field.typeMeta.type === 'Relation' &&
          field.typeMeta?.relationModel;
        if (isRelation) {
          if (root.sys.onIgnoreEdge && root.sys.onIgnoreEdge(field))
            return fPre;
          //if(field?.typeMeta?.relationModel === 'base_User' && (confirmEnding(field.name, 'createdBy') || confirmEnding(field.name,'updatedBy')  ) ) return fPre
          const relationModel = root.findModelByName(
            field.typeMeta!.relationModel,
          );
          if (
            !relationModel ||
            !root.sys.checkedKeys.find((a) => a === relationModel!.id)
          )
            return fPre;

          const l = model.fields.length;
          const sourceAnchor = 2 + i + l;

          return [
            ...fPre,
            {
              key: 'model-' + model.id + '~' + 'model-' + relationModel!.id,
              source: 'model-' + model.id,
              target: 'model-' + relationModel!.id,
              sourceAnchor,
              // // targetAnchor: sourceAnchor,
              targetAnchor:
                model.id === relationModel.id ? sourceAnchor - 1 : undefined,
              fieldIndex: i,
              tooltip: `<div>${escapeHtml(
                root.intl('graph.relationTooltip', {
                  relationType: relationLabels[field.type] || field.type || '',
                  source: relationModel?.label ?? '',
                  target: model.label,
                }),
              )}</div>`,
              fieldsLength: l,
              style: style.default.edge,
              type: 'console-line',
              label: relationLabels[field.type] || field.type,
              labelAutoRotate: true,
              loopCfg: {
                // position: 'top',
                clockwise: true, // dist: 200,
                dist: 100,
              },
              labelCfg: {
                style: {
                  fill: palette.fieldText,
                  stroke: palette.edgeLabelHalo,
                  lineWidth: 6,
                },
              },
            },
          ];
        }
      }
      return fPre;
    }, []);
    return [...pre, ...fieldLinks, sysLink];
  }, []);
  return links.filter((a) => !!a);
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
