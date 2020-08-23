import { RootInstance } from '../type'
import { mapToArrary } from '../util'

export const createData = (root : RootInstance) => {
    const res = mapToArrary(root.Models).map( m => {
          return {
              id: 'model-' + m.id,
              data: m,
              type: 'console-model-Node',
              isKeySharp: true,
          }
    })
    if(res.length > 0 ) return res.concat([createSysNode() as any])
    return res
}

const createSysNode = () => {

  return  {
    id: 'model-SYS-CENTER-POINT',
    type: 'circle',
    isSys: true,
    isKeySharp: true,
    size:  10,
  }

}

export const createLinks = (root : RootInstance) => {
    const links = [...root.Models.values()].reduce((pre, model) => {

       const sysLink = {
        key: 'model-' + model.id +'~'+'model-SYS-CENTER-POINT',
        source: 'model-' + model.id,
        // target: 'model-' + relationModel!.id,
        visible: false,
        isSys : true,
        style: {
          visible: false,
        },
        target: 'model-SYS-CENTER-POINT',
        type: 'console-line',
      }
        
       const fieldLinks = (model.fields).reduce((fPre, field, i) => {
          const isRelation =   field.typeMeta && field.typeMeta.type === 'Relation' && field.typeMeta?.relationModel
          // const { id } = field
          if (isRelation) {

            const relationModel = root.findModelByName(field.typeMeta?.relationModel)     
            return [
              ...fPre,
              {
                key: 'model-' + model.id +'~'+'model-' + relationModel!.id,
                source: 'model-' + model.id,
                target: 'model-' + relationModel!.id,
                // sourceAnchor,
                // // targetAnchor: sourceAnchor,
                // targetAnchor:  model.key === field.typeMeta.relationModel ? (sourceAnchor - 1) : undefined,
                fieldIndex: i,
                // fieldsLength: l,
                type: 'console-line',
                label: field.type,
                labelAutoRotate: true,
                loopCfg: {
                  // position: 'top',
                  clockwise: true, // dist: 200,
                  dist: 100,
                },
              },
            ]
          } else return fPre
        }, [])
  
       return [
        ...pre,
        ...fieldLinks,
        sysLink
      ]
    }, [])
    return links
  }
  




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