import G6 from '@antv/g6'


const setNodeStateAttr = (state, s, cfg) => {
  if (cfg.config.styleConfig[state]) {
  Object.entries(cfg.config.styleConfig[state].node).forEach(([k, v]) => {
    s.attr(k, v)
  })
}
}

// const mapNodeStateAttr = (state, s, cfg, isMap) => {
//   if (cfg.config.styleConfig[state]) {
//   Object.entries(cfg.config.styleConfig[state].node).forEach(([k, v]) => {
//     s.attr(k, v)
//   })
// }
// }

const isEng = (str) => {
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    if (charCode < 0  || charCode > 128) {
      return false
    }
   }
  return true

}

const getSplitStrings = (str: string) => {
  if (isEng(str)) return getEngGroup(str)
  const reg = /.{5}/g
  const rs = str.match(reg) || [str]
  rs.push(str.substring(rs.join('').length))
  return rs
}

const getEngGroup = (str: string) => {
   const strs = str.replace(/(?<!^)([A-Z])/g, `-$1`)
   return strs.split('-')
}

const getLen = (str: string) => {
  /// <summary>获得字符串实际长度，中文2，英文1</summary>
  /// <param name="str">要获得长度的字符串</param>
  // tslint:disable-next-line: one-variable-per-declaration
  let realLength = 0,
      len = str.length,
      charCode = -1

  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) realLength += 1; else realLength += 2
  }

  return realLength
} // tslint:disable-next-line: interface-over-type-literal

const getTopAnch = (num, y = 0) => {
    let res = []
    for (let i = 0 ; i < num ; i ++) {
       res.push([(i + 1) / num, y])

    }
    return res
}

const getBottomAnch = (num, y = 1) => {
  let res = []
  for (let i = 0 ; i <= num ; i ++) {
     res.push([(i) / num, y])

  }
  return res
}

const getLeftAnch = (num, x= 0) => {
  let res = []
  for (let i = 0 ; i < num ; i ++) {
     res.push([x, (i + 1) / num])

  }
  return res
}

const getRightAnch = (num, x = 1) => {
let res = []
for (let i = 0 ; i <= num ; i ++) {
   res.push([x, (i) / num])

}
return res
}

export interface IModelNodeShapeCfg {
  config: {
    width: number;
    headerHeight: number;
    fieldHeight: number;
    labelSize: number;
    styleConfig: {
      default: {
        node: any;
        edge: any;
      };
      active: {
        node: any;
        edge: any;
      };
      selected: {
        node: any;
        edge: any;
      };
    };
  }
  data: {
    label: string;
    key: string;
    fields: IField[];
    name: string;
    aggregateRoot: boolean;
    aggregateModelKey: string ;
    belongAggregate: string;
    moduleKey: string;
    store: any;
  }
  style: any
  isNoModule?: boolean
  isKeySharp?: boolean
  active?: boolean
  selected?: boolean
  into?: boolean
  out?: boolean
  hide?: boolean
  inactive?: boolean
  isCardSharp?: boolean
}
export interface IField {
  key: string
  label: string
  originalKey: string
  type: string
  isForeign?: boolean
  relationModel?: string
}

const Relation = {
  ToOne: '1:1',
  ToMany: '1:n',
}

const getLength  = (length) => {
 return length >= 8 ? length : 8
}

export const register = ({ colors }) => {
  G6.registerEdge('console-line', {
    labelAutoRotate: true,
    update: null,
  }, 'cubic')

  G6.registerEdge('console-arrange-line', {
    labelAutoRotate: true,
    update: null,
  }, 'cubic')

  G6.registerNode('console-model-Node', {
    getAnchorPoints(cfg) {
      const {
        config,
        data,
      } = cfg
      const {
        fields,
      } = data
      const h = config.headerHeight + getLength(fields.length) * config.fieldHeight
      return [[0, config.headerHeight / 2 / h], // 左上方
      [1, config.headerHeight / 2 / h], // 右上方
      ...fields.map((field, index) => {
        const x = 10 / config.width
        const l = config.headerHeight + config.fieldHeight * (index + 1) - config.fieldHeight / 2
        const y = l / h
        return [x, y]
      }), ...fields.map((field, index) => {
        const x = (config.width - 10) / config.width
        const l = config.headerHeight + config.fieldHeight * (index + 1) - config.fieldHeight / 2
        const y = l / h
        return [x, y]
      }),
      ...getTopAnch(50),
     ...getBottomAnch(50),
     ...getLeftAnch(100),
     ...getRightAnch(100),
    ]
    },

    allRender(cfg: IModelNodeShapeCfg, item) {
          // cfg.data.store
    },

    update(cfg: IModelNodeShapeCfg, item, state) {
      // console.log(cfg.data.key)
      const {
        isKeySharp,
        active,
        selected,
        into,
        inactive,
        isCardSharp,
        out,
        isNoModule,
      } = cfg
      const group = item.getContainer()
      const children = group.get('children')
      children.forEach((s) => {
        const id = s.attr('id')

        this.allRender(cfg, s)

        // setNodeStateAttr('default', s, cfg)
        // isNoModule && setNodeStateAttr('isNoModule', s , cfg)
        s.attr('opacity', isNoModule ? 0.3 : 1)

        switch (id) {
          case 'keySharp':
            //  s.attr('fill', cfg.isKeySharp ? '#191919' : 'white')
            //  fill: '#CCFFFF',
            //   stroke: 'red',
            //   opacity: 0.2,
            setNodeStateAttr('default', s, cfg)
            // isNoModule && setNodeStateAttr('isNoModule', s , cfg)

            inactive && setNodeStateAttr('inactive', s, cfg)
            active && setNodeStateAttr('active', s, cfg)
            selected && setNodeStateAttr('selected', s, cfg)
            into && setNodeStateAttr('into', s, cfg)
            out && setNodeStateAttr('out', s, cfg)
            // const pointWidth = 200
            if (isCardSharp) {
              setNodeStateAttr('cardSharp', s, cfg)
              // if (!s.attr('old_height')) {
              //   s.attr('old_height', s.attr('height'))
              // }
              // s.attr('height', pointWidth)
              // if (!s.attr('old_width')) {
              //   s.attr('old_width', s.attr('width'))
              // }
              // s.attr('width', pointWidth)

              if (!s.attr('old_fill')) {
                s.attr('old_fill', s.attr('fill'))
              }
              s.attr('fill', cfg.data.aggregateRoot ? colors.blue : colors.head)

            } else {
              // if (s.attr('old_height')) {
              //   s.attr('height', s.attr('old_height'))
              // }
              // if (s.attr('old_width')) {
              //   s.attr('width', s.attr('old_width'))
              // }

              if (s.attr('old_fill')) {
                s.attr('fill', s.attr('old_fill'))
              }
            }
            break

    case 'headerlabel1.1':
    case 'headerlabel1.2':
            //  s.attr('opacity', !cfg.isKeySharp && active ? 1 : 0)
    s.set('visible', !cfg.isKeySharp && active && !cfg.isCardSharp)
            // s.attr('opacity', inactive && !into && !out && !active ? 0.2 : 1)
    break

    case 'headerlabel0':
    case 'headerlabel1':
    s.set('visible', !cfg.isKeySharp && !cfg.isCardSharp)
            // s.attr('opacity', 1)
    break
    case 'header':
            // s.attr('opacity', !cfg.isKeySharp ? 1 : 0)
    s.set('visible',  !cfg.isCardSharp)
            // s.attr('opacity', 1)
    break

    case 'headerlabel2':
    case 'headerlabel3':
            // s.attr('opacity', cfg.isKeySharp ? 1 : 0)
            // s.attr('opacity', inactive && !into && !out && !active ? 0.2 : 1)
    s.set('visible', cfg.isKeySharp && !cfg.isCardSharp)
    break

    case 'field':
            // s.attr('opacity', !cfg.isKeySharp && !s.attr('fieldHoverShow') ? 0.9 : 0)

    const isInactive = inactive && !into && !out && !active ? 0.2 : 1
    const isO = !cfg.isKeySharp && !s.attr('fieldHoverShow') ? isInactive : 0
            // s.attr('opacity', isO)
    s.set('visible', !cfg.isKeySharp) //   Object.entries(cfg.config.styleConfig.active.node).forEach(([k, v]) => {
            //     s.attr(k, v)
            // })

    break

    case 'field-text':
              // s.attr('opacity', inactive && !into && !out && !active ? 0.2 : 1)
            // s.attr('opacity', !cfg.isKeySharp ? 1 : 0)
    s.set('visible', !cfg.isKeySharp) // active && setNodeStateAttr('active', s , cfg)
            // selected && setNodeStateAttr('selected', s , cfg)

    break

    default: break
        }
      }) // this.render(cfg, group)

      if (cfg.hide) {
        item.hide()
      } else {
        item.show()
      }
    },

    // shouldUpdate(type) {
    //   alert(type)
    //   return false
    // },
    afterDraw(cfg, group) {
      if (cfg.hide) {
        group.hide()
      }
    },

    render: (cfg: IModelNodeShapeCfg, group) => {
      const {
        config,
        data,
      } = cfg

      const bg = data.aggregateRoot ? colors.blue : colors.head
      const font = data.aggregateRoot ? colors.white : colors.blue
      const mFront = data.aggregateRoot ? colors.white : colors.black

      const nodeColors = { bg , font, mFront }

      group.addShape('rect', {
        visible: false,
        name: data.key,
        draggable: true,
        attrs: {
          y: -(getLength(data.fields.length) * config.fieldHeight / 2) - config.headerHeight / 2  ,
          x: -(config.width / 2) ,
          width: config.width ,
          height: config.headerHeight,
          radius: [10, 10, 0, 0],
          // text: data.label,
          id: 'header',
          // fontSize: config.fieldHeight - 12,
          // opacity: !cfg.isKeySharp ? 1 : 0,
          className: 'header',
          shadowColor: 'rgba(0,0,0,0.06)',
          cursor: 'move',
          // shadowBlur: 1,
          // shadowOffsetX: 1,
          // shadowOffsetY: 2,
          // radius: [2, 4],
          fill: nodeColors.bg,
        },
      })

      group.addShape('text', {
        visible: !cfg.isKeySharp,
        name: data.key,
        fontFamily: '',
        draggable: true,
        attrs: {
          fontFamily: 'iconFont',
          x: -(config.width / 2) + 20,
          y: -(getLength(data.fields.length) * config.fieldHeight / 2),
          text: '😎',
          // text: '\ue6b2',
          id: 'headerlabel1',
          cursor: 'move',
          fontSize: config.headerHeight / 2,
          // opacity: !cfg.isKeySharp ? 1 : 0,
          className: 'headerlabel',
          textBaseline: 'middle',
          textAlign: 'left',
          // radius: [2, 4],
          fill: nodeColors.font,
        },
      })

      group.addShape('text', {
        visible: !cfg.isKeySharp,
        name: data.key,
        fontFamily: '',
        draggable: true,
        attrs: {
          // fontFamily: 'iconFont',
          x: -(config.width / 2) + 20 + 30,
          y: -(getLength(data.fields.length) * config.fieldHeight / 2),
          text:  data.label,
          // text: '\ue6b2',
          id: 'headerlabel1',
          cursor: 'move',
          fontSize: config.fieldHeight / 2 ,
          // opacity: !cfg.isKeySharp ? 1 : 0,
          className: 'headerlabel',
          textBaseline: 'middle',
          textAlign: 'left',
          fontWeight: 20,
          // radius: [2, 4],
          fill: nodeColors.mFront,
        },
      })

      cfg.data.aggregateModelKey && group.addShape('text', {
        visible: cfg.data.aggregateModelKey,
        name: data.key,
        fontFamily: '',
        draggable: true,
        attrs: {
          fontFamily: 'iconFont',
          x: (config.width / 2) - 100,
          y: -(getLength(data.fields.length) * config.fieldHeight / 2),
          text: '聚合关系',
          arg: cfg.data.aggregateModelKey,
          // text: cfg.data.aggregateModelKey,
          // text: '\ue6b2',
          id: 'headerlabel1',
          cursor: 'pointer',
          click: 'arrangeShow',
          // cursor: 'move',
          fontSize: config.labelSize,
          // opacity: !cfg.isKeySharp ? 1 : 0,
          className: 'headerlabel',
          textBaseline: 'middle',
          textAlign: 'left',
          // radius: [2, 4],
          fill: nodeColors.font,
        },
      })

      group.addShape('text', {
        visible: !cfg.isKeySharp,
        name: data.key,
        fontFamily: '',
        draggable: true,
        attrs: {
          fontFamily: 'iconFont',
          x: (config.width / 2) - 40,
          y: -(getLength(data.fields.length) * config.fieldHeight / 2),
          text: '查看',
          // text: '\ue6b2',
          id: 'headerlabel1',
          cursor: 'pointer',
          click: 'modelEdit',
          // cursor: 'move',
          fontSize: config.labelSize,
          // opacity: !cfg.isKeySharp ? 1 : 0,
          className: 'headerlabel',
          textBaseline: 'middle',
          textAlign: 'left',
          // radius: [2, 4],
          fill: nodeColors.font,
        },
      })

      // group.addShape('text', {
      //   visible: !cfg.isKeySharp,
      //   attrs: {
      //     x: config.width / 2 - 40,
      //     y: -(data.fields.length * config.fieldHeight / 2),
      //     text: '✎',
      //     click: 'modelEdit',
      //     fontSize: config.headerHeight - 6,
      //     id: 'headerlabel1.1',
      //     className: 'headerlabel',
      //     textBaseline: 'middle',
      //     textAlign: 'left',
      //     cursor: 'pointer',
      //     fill: 'black',
      //   },
      // })

      // group.addShape('text', {
      //   visible: !cfg.isKeySharp,
      //   attrs: {
      //     x: (config.width) / 2 - 40 ,
      //     y:  -((data.fields.length * config.fieldHeight) / 2) ,
      //     text: '✘',
      //     click: 'modelDel',
      //     id: 'headerlabel1.2',
      //     fontSize: config.headerHeight - 6 ,
      //     className: 'headerlabel',
      //     textBaseline: 'middle',
      //     textAlign: 'left',
      //     cursor: 'pointer',
      //     fill: 'red',
      //   },
      // })
      // group.addShape('text', {
      //     visible: cfg.isKeySharp,
      //     attrs: {
      //       x: 0,
      //       y: -(config.headerHeight + data.fields.length * config.fieldHeight) / 6,
      //       fontSize: config.width * 2 / (getLen(data.name)),
      //       text: data.name ,
      //       opacity: cfg.isKeySharp ? 1 : 0,
      //       id: 'headerlabel2',
      //       className: 'headerlabel',
      //       textBaseline: 'middle',
      //       textAlign: 'center',
      //       // radius: [2, 4],
      //       fill: 'black',
      //     },
      //   })

      const nameList = ((data.name.replace(/\(/, '-').replace(/\)/, '')) || '').split('_').flatMap((nameStr) => nameStr.split('-')).flatMap((nameStr) => nameStr.split('/')).flatMap((a) => getSplitStrings(a)).filter((a) => a)

      const height = config.headerHeight + (data.fields.length >= 12 ? data.fields.length  : 12) * config.fieldHeight
      const nameLength = nameList.length
      nameList.forEach((nameText, index) => {
        group.addShape('text', {
          visible: cfg.isKeySharp,
          name: nameText,
          draggable: true,
          attrs: {
          x: 0,
          y: - height / 2 + height / (nameLength + 1) * (index + 1),
          fontSize: config.width / 5,
          text: nameText,
            // opacity: index === nameLength - 1 ? 1 : 0.3,
          id: 'headerlabel2',
          className: 'headerlabel',
          textBaseline: 'middle',
          textAlign: 'center',
            // radius: [2, 4],
          fill: 'black',
          },
        })
      }) // group.addShape('text', {
      //     visible: cfg.isKeySharp,
      //     attrs: {
      //       x: 0,
      //       y: (config.headerHeight + data.fields.length * config.fieldHeight) / 6,
      //       fontSize: 20,
      //       text: data.key,
      //       id: 'headerlabel3',
      //       opacity: cfg.isKeySharp ? 1 : 0,
      //       className: 'headerlabel',
      //       textBaseline: 'middle',
      //       textAlign: 'center',
      //       // radius: [2, 4],
      //       fill: 'black',
      //     },
      //   })
      // group.addShape('text', {
      //     attrs: {
      //       x: (config.width),
      //       y: (config.headerHeight + data.fields.length * config.fieldHeight) / 6,
      //       fontSize: 20,
      //       text: data.key,
      //       id: 'headerlabel4',
      //       opacity: cfg.isKeySharp ? 1 : 0,
      //       className: 'headerlabel',
      //       textBaseline: 'middle',
      //       textAlign: 'center',
      //       // radius: [2, 4],
      //       fill: 'black',
      //     },
      //   })

      data.fields.forEach((field, index) => {
        const {
          relationModel,
          type,
          isForeign,
        } = field

        const y = -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2  - 2
        group.addShape('rect', {
          visible: !cfg.isKeySharp,
          name: field.key,
          draggable: true,
          attrs: {
            x: -(config.width / 2) + 2 ,
            fieldName: field.key,
            name: field.key,
            draggable: true,
            fieldBg: true,
            arg: field.originalKey,
            fieldHover: true,
            y: -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index,
            // stroke: 'black',
            width: config.width - 4,
            id: 'field',
            height: config.fieldHeight,
            // click: 'fieldEdit',
            // radius: [2, 4],
            // fill: field.isForeign ?  '#dee1e6' : 'white',
            // ...cfg.style || {},
            // fill: field.isForeign ?  '#dee1e6' : 'white',
            fill: 'white',
            cursor: 'move',
            // ...cfg.style || {},
          },
        })

        group.addShape('path', {
          // visible: !cfg.isKeySharp,
          draggable: true,
          name: field.key,
          attrs: {
            draggable: true,
            fieldName: field.key,
            name: field.key,
            // startArrow: {
            //   path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
            //   d: 10,
            // },
            // endArrow: {
            //   path: 'M 10,0 L -10,-10 L -10,10 Z',  // 自定义箭头为中心点在(0, 0)，指向 x 轴正方向的path
            //   d: 10,
            // },
            path: [
               [ 'M', - config.width / 2 + 20, y + 2   ],
               [ 'L', config.width / 2 - 40 , y  + 2   ],
            ],
            // stroke: colors.head,
            stroke: colors.head,
            // stroke: isForeign ? colors.blue : colors.head,
            lineWidth: 1,
            lineDash: [ 5, 5 ],
            opacity: 0.1,
          },
        })

        isForeign && group.addShape('circle', {
          visible: false,
          name: field.key,
          draggable: true,
          attrs: {
            x: -(config.width / 2) + 10,
            fieldName: field.key,
            name: field.key,
            draggable: true,
            arg: field.originalKey,
            fieldHover: true,
            y: -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2  - 2 ,
            // stroke: 'black',
            // width: 4,
            id: 'field',
            r: 2,
            // height: 4,
            // click: 'fieldEdit',
            // radius: [2, 4],
            // fill: field.isForeign ?  '#dee1e6' : 'white',
            // ...cfg.style || {},
            // fill: field.isForeign ?  '#dee1e6' : 'white',
            fill: colors.blue,
            cursor: 'move',
            // ...cfg.style || {},
          },
        })

        group.addShape('text', {
          visible: !cfg.isKeySharp,
          name: field.key,
          draggable: true,
          attrs: {
            x: -config.width / 2 + 20,
            fieldHover: true,
            name: field.key,
            draggable: true,
            // click: 'fieldEdit',
            y: -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2,
            text: field.label,
            fieldName: field.key,
            arg: field.originalKey,
            fontSize: config.labelSize,
            textBaseline: 'middle',
            cursor: 'move',
            id: 'field',
            textAlign: 'start',
            // opacity: !cfg.isKeySharp ? 1 : 0,
            // radius: [2, 4],
            fill: isForeign ? colors.blue : 'rgba(0,0,0,0.60)', // fill: 'rgb(153,153,153)',
            // fill: field.isForeign ?   'black' : 'black',

          },
        })

        group.addShape('text', {
          visible: !cfg.isKeySharp,
          name: field.key,
          draggable: true,
          attrs: {
            x: config.width / 2 - 20,
            fieldHover: !isForeign,

            // click: 'fieldEdit',
            y: -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2,
            text: isForeign ? `${relationModel}(${Relation[field.type]})` : `[${field.type}]`,
            id: 'field',
            textBaseline: 'middle',
            fieldName: field.key,
            arg: field,
            fontSize: config.labelSize,
            click: 'fieldSelect',
            textAlign: 'right',
            cursor: 'pointer',
            // opacity: !cfg.isKeySharp ? 1 : 0,
            // radius: [2, 4],
            // fill: field.isForeign ?   'black' : 'black',
            fill: isForeign ? colors.blue : 'rgba(0,0,0,0.30)',
          },
        })
        // group.addShape('text', {
        //   visible: !cfg.isKeySharp,
        //   name: field.key,
        //   draggable: true,
        //   attrs: {

        //     x: config.width / 2 - 30,
        //     y: -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2,
        //     text: '✎',
        //     click: 'fieldEdit',
        //     arg: field.originalKey,
        //     fieldHoverShow: true,
        //     fieldHover: true,
        //     fieldName: field.key,
        //     fontSize: config.fieldHeight - 16,
        //     // fontSize: config.headerHeight - 6 ,
        //     id: 'field',
        //     // cursor: 'pointer',
        //     opacity: 0,
        //     // className: 'headerlabel',
        //     textBaseline: 'middle',
        //     textAlign: 'left',
        //     cursor: 'pointer',
        //     // radius: [2, 4],
        //     fill: 'black',
        //   },
        // })

        isForeign && group.addShape('circle', {
          visible: false,
          name: field.key,
          draggable: true,
          attrs: {
            x: config.width / 2 - 10,
            fieldName: field.key,
            name: field.key,
            draggable: true,
            arg: field.originalKey,
            fieldHover: true,
            y: -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * index + config.fieldHeight / 2 - 2,
            // stroke: 'black',
            // width: 4,
            id: 'field',
            r: 2,
            // height: 4,
            // click: 'fieldEdit',
            // radius: [2, 4],
            // fill: field.isForeign ?  '#dee1e6' : 'white',
            // ...cfg.style || {},
            // fill: field.isForeign ?  '#dee1e6' : 'white',
            fill: colors.blue,
            cursor: 'move',
            // ...cfg.style || {},
          },
        })

      })

      // const h = config.headerHeight + data.fields.length * config.fieldHeight

      const diffLength = getLength(data.fields.length) - data.fields.length
      if (diffLength) {
        for (let i = 0 ; i < diffLength ; i ++) {
           // ---
           group.addShape('rect', {
            name: i,
            draggable: true,
            visible: !cfg.isKeySharp,
            attrs: {
              x: -(config.width / 2) + 2,
              // fieldBg: true,
              // fieldHover: true,
              y: -((config.headerHeight + getLength(data.fields.length) * config.fieldHeight) / 2) + config.headerHeight + config.fieldHeight * (data.fields.length + i),
              // stroke: 'black',
              width: config.width - 4,
              id: 'field',
              height: config.fieldHeight,
              // click: 'fieldEdit',
              // radius: [2, 4],
              // fill: field.isForeign ?  '#dee1e6' : 'white',
              // ...cfg.style || {},
              // fill: field.isForeign ?  '#dee1e6' : 'white',
              fill: 'white',
              cursor: 'move',
              // ...cfg.style || {},
            },

           // ---
        })
      }
    }

      // const anchors = [
      //   [0, 0], // 左上方
      //   ...data.fields.map((_, i) => {
      //     if (_.isForeign) {
      //     const x = 0
      //     const l = config.headerHeight +  data.fields.length * (i + 1)
      //     const y = l / h
      //     return [x, y, i]
      //     } else return null
      //   }),
      // ].filter((a) => a)
      // group.addShape('circle', {
      //   attrs: {
      //     x: -config.width / 2,
      //     y:  (config.headerHeight / 2) - h / 2,
      //     r: 2,
      //     fill: 'green',
      //   },
      // })
      // anchors.forEach(([x, y, i ]) => {
      //   group.addShape('circle', {
      //     attrs: {
      //       x: -config.width / 2,
      //       y:  (config.headerHeight + config.fieldHeight * (i) + (config.fieldHeight / 2)) -  h / 2,
      //       r: 2,
      //       fill: 'red',
      //     },
      //   })
      // })
    },

    setState(name, value, item) {// const names = name.split('-')
      // if (names[0] === 'fieldHover' && value) {
      //   let target = null
      //   item.getContainer().findAll((sharp) => sharp.attr('fieldBg')).forEach((sharp) => {
      //     if (sharp.attr('fieldName') === names[1]) target = sharp
      //     if (sharp.attr('fill-old')) {
      //     sharp.attr('fill', sharp.attr('fill-old'))
      //     sharp.attr('fill-old', undefined)
      //    }
      //  })
      //   if (target) {
      //     if (!target.attr('fill-old')) {
      //         target.attr('fill-old', target.attr('fill'))
      //     }
      //     target.attr('fill', 'blue')
      //   }
      // }
    },

    draw: function drawShape(cfg: IModelNodeShapeCfg, group) {
      const {
        config,
        data,
      } = cfg
      const height = config.headerHeight + getLength(data.fields.length) * config.fieldHeight

      // group.addShape('rect', {
      //   name: data.key,
      //   draggable: true,
      //   attrs: {
      //     id: 'keySharpBord',
      //     x: -(config.width / 2),
      //     y: - height / 2,
      //     width: config.width,
      //     cursor: 'move',
      //     stroke: colors.blue,
      //     // opacity: 0.85,
      //     height,
      //     ...cfg.config.styleConfig.default.node,
      //   },
      // })

      let keyShape = group.addShape('rect', {
        name: data.key,
        draggable: true,
        attrs: {
          id: 'keySharp',
          x: -(config.width / 2) ,
          y: - height / 2,
          width: config.width,
          cursor: 'move',

          // opacity: 0.85,
          height : height + 10,
          ...cfg.config.styleConfig.default.node,
        },
      })

      this.render(cfg, group)
      return keyShape
    },
  }, 'single-shape')
}
