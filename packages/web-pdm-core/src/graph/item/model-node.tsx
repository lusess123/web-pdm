import { createThemePalette, type WebPdmPalette } from '../../theme';
import G6 from '../g6';
import { IModelNodeShapeCfg, Relation } from './type';

import {
  getBottomAnch,
  getLeftAnch,
  getLength,
  getRightAnch,
  getTopAnch,
  setNodeStateAttr,
} from './util';

type ThemeRole =
  | 'keyShape'
  | 'header'
  | 'headerText'
  | 'keyText'
  | 'fieldBackground'
  | 'fieldDivider'
  | 'fieldText'
  | 'fieldMeta'
  | 'relationPort';

const applyShapeTheme = (
  shape: any,
  role: ThemeRole | undefined,
  palette: WebPdmPalette,
  selected: boolean | undefined,
) => {
  if (shape.attr('fill-old')) shape.attr('fill-old', undefined);
  switch (role) {
    case 'keyShape':
      shape.attr({
        fill: palette.node,
        shadowColor: selected ? palette.accent : palette.shadow,
        stroke: selected ? palette.accent : palette.border,
      });
      break;
    case 'header':
      shape.attr('fill', selected ? palette.accent : palette.nodeHeader);
      break;
    case 'headerText':
      shape.attr('fill', selected ? palette.onAccent : palette.foreground);
      break;
    case 'keyText':
      shape.attr('fill', palette.accent);
      break;
    case 'fieldBackground':
      shape.attr('fill', palette.field);
      break;
    case 'fieldDivider':
      shape.attr('stroke', palette.divider);
      break;
    case 'fieldText':
      shape.attr(
        'fill',
        shape.get('isForeign') ? palette.accent : palette.fieldText,
      );
      break;
    case 'fieldMeta':
      shape.attr(
        'fill',
        shape.get('isForeign') ? palette.accent : palette.fieldMuted,
      );
      break;
    case 'relationPort':
      shape.attr('fill', palette.accent);
      break;
    default:
      break;
  }
};

export const register = () => {
  // const colors = {
  //     blue : '#495D9E',
  //     white: '#FFFFFF',
  //     head: 'rgba(7,10,26,0.06)',
  //     black: 'black',
  // }
  // const models = mst.onReload().models

  G6.registerNode(
    'console-model-Node',
    {
      getAnchorPoints(cfg: IModelNodeShapeCfg) {
        const { config, data } = cfg;
        const { fields } = data;
        const h =
          config.headerHeight + getLength(fields.length) * config.fieldHeight;
        return [
          [0, config.headerHeight / 2 / h], // 左上方
          [1, config.headerHeight / 2 / h], // 右上方
          ...fields.map((_, index) => {
            const x = 0;
            const l =
              config.headerHeight +
              config.fieldHeight * (index + 1) -
              config.fieldHeight / 2;
            const y = l / h;
            return [x, y];
          }),
          ...fields.map((_, index) => {
            const x = 1;
            const l =
              config.headerHeight +
              config.fieldHeight * (index + 1) -
              config.fieldHeight / 2;
            const y = l / h;
            return [x, y];
          }),
          ...getTopAnch(50),
          ...getBottomAnch(50),
          ...getLeftAnch(100),
          ...getRightAnch(100),
        ];
      },

      update(cfg: IModelNodeShapeCfg, item) {
        const {
          isKeySharp,
          active,
          selected,
          into,
          inactive,
          isCardSharp,
          out,
          isNoModule,
          showNameOrLabel,
          config,
          themeColor,
          darkness,
        } = cfg;
        const palette = createThemePalette(Boolean(darkness), themeColor);
        const group = item.getContainer();
        const children = group.get('children');

        children.forEach((s) => {
          const id = s.attr('id');
          const themeRole = s.get('themeRole') as ThemeRole | undefined;
          applyShapeTheme(s, themeRole, palette, selected);

          // this.allRender(cfg, s)

          // setNodeStateAttr('default', s, cfg)
          // isNoModule && setNodeStateAttr('isNoModule', s , cfg)
          // s.attr('opacity', isNoModule ? 0.3 : 1)

          switch (id) {
            case 'keySharp':
              //  s.attr('fill', cfg.isKeySharp ? '#191919' : 'white')
              //  fill: '#CCFFFF',
              //   stroke: 'red',
              //   opacity: 0.2,
              // isNoModule && setNodeStateAttr('isNoModule', s , cfg)

              inactive && setNodeStateAttr('inactive', s, cfg);
              active && setNodeStateAttr('active', s, cfg);

              into && setNodeStateAttr('into', s, cfg);
              out && setNodeStateAttr('out', s, cfg);
              // const pointWidth = 200
              if (isCardSharp) {
                setNodeStateAttr('cardSharp', s, cfg);
                // if (!s.attr('old_height')) {
                //   s.attr('old_height', s.attr('height'))
                // }
                // s.attr('height', pointWidth)
                // if (!s.attr('old_width')) {
                //   s.attr('old_width', s.attr('width'))
                // }
                // s.attr('width', pointWidth)

                if (!s.attr('old_fill')) {
                  s.attr('old_fill', s.attr('fill'));
                }

                // s.attr('fill', cfg.data.aggregateRoot ? colors.blue : colors.head)
              } else {
                // if (s.attr('old_height')) {
                //   s.attr('height', s.attr('old_height'))
                // }
                // if (s.attr('old_width')) {
                //   s.attr('width', s.attr('old_width'))
                // }

                if (s.attr('old_fill')) {
                  s.attr('fill', s.attr('old_fill'));
                }
              }

              applyShapeTheme(s, 'keyShape', palette, selected);

              if (cfg.data.aggregateModelKey || cfg.data.aggregateRoot) {
                // stroke: 'rgba(11,108,149)',
                // shadowColor: 'rgba(11,108,149)',
                s.attr('stroke', palette.accent);
                s.attr('shadowColor', palette.accent);
              }

              break;

            case 'headerlabel1.1':
            case 'headerlabel1.2':
              //  s.attr('opacity', !cfg.isKeySharp && active ? 1 : 0)
              s.set('visible', !cfg.isKeySharp && active && !cfg.isCardSharp);
              // s.attr('opacity', inactive && !into && !out && !active ? 0.2 : 1)
              break;

            case 'headerlabel0':
            case 'headerlabel1':
              const fieldLable1 = s.attr('fieldLable');
              if (fieldLable1) {
                s.attr(
                  'text',
                  showNameOrLabel ? fieldLable1 : s.attr('nameLable'),
                );
              }
              s.set('visible', !cfg.isKeySharp && !cfg.isCardSharp);
              s.attr('fill', selected ? palette.onAccent : palette.foreground);

              // s.attr('opacity', 1)
              break;
            case 'header':
              // s.attr('opacity', !cfg.isKeySharp ? 1 : 0)
              // s.attr('fill', selected ? cfg.config.styleConfig.selected.node.stroke : themeColor)
              // s.attr('fill', selected ? cfg.config.styleConfig.selected.node.stroke : 'rgba(7,10,26,0.06)')
              s.attr('fill', selected ? palette.accent : palette.nodeHeader);
              s.set('visible', !cfg.isCardSharp && !cfg.isKeySharp);
              // s.attr('opacity', 1)
              break;

            case 'headerlabel2':
            case 'headerlabel3':
              // s.attr('opacity', cfg.isKeySharp ? 1 : 0)
              // s.attr('opacity', inactive && !into && !out && !active ? 0.2 : 1)
              // s.set('visible', cfg.isKeySharp && !cfg.isCardSharp)

              const _showNameOrLabel = s.get('showNameOrLabel');
              s.attr('fill', palette.accent);
              if (_showNameOrLabel && showNameOrLabel) {
                s.set('visible', cfg.isKeySharp && !isCardSharp);
              } else {
                if (!_showNameOrLabel && !showNameOrLabel)
                  s.set('visible', cfg.isKeySharp && !isCardSharp);
                else {
                  s.set('visible', false);
                }
              }

              break;

            case 'field':
              // s.attr('opacity', !cfg.isKeySharp && !s.attr('fieldHoverShow') ? 0.9 : 0)

              const isInactive = inactive && !into && !out && !active ? 0.2 : 1;
              const isO =
                !cfg.isKeySharp && !s.attr('fieldHoverShow') ? isInactive : 0;
              // s.attr('opacity', isO)
              s.set('visible', !cfg.isKeySharp); //   Object.entries(cfg.config.styleConfig.active.node).forEach(([k, v]) => {
              //     s.attr(k, v)
              // })

              const fieldLable = s.attr('fieldLable');
              if (fieldLable) {
                s.attr(
                  'text',
                  showNameOrLabel ? fieldLable : s.attr('nameLable'),
                );
              }
              if (!!s.get('themeColor')) {
                s.attr('fill', palette.accent);
              }

              break;

            case 'field-text':
              // s.attr('opacity', inactive && !into && !out && !active ? 0.2 : 1)
              // s.attr('opacity', !cfg.isKeySharp ? 1 : 0)
              s.set('visible', !cfg.isKeySharp); // active && setNodeStateAttr('active', s , cfg)
            // selected && setNodeStateAttr('selected', s , cfg)
            case 'field-line':
              s.set('visible', !cfg.isKeySharp);
              break;
            case 'themeColor':
              s.attr('fill', palette.accent);
              break;

            default:
              break;
          }
        }); // this.render(cfg, group)

        if (cfg.hide) {
          item.hide();
        } else {
          item.show();
        }
      },

      render(cfg: IModelNodeShapeCfg, group: any) {
        const {
          config,
          data,
          selected,
          showNameOrLabel,
          themeColor,
          darkness,
        } = cfg;
        const palette = createThemePalette(Boolean(darkness), themeColor);
        const nodeColors = {
          bg: selected ? palette.accent : palette.nodeHeader,
          font: selected ? palette.onAccent : palette.foreground,
          mFront: selected ? palette.onAccent : palette.foreground,
        };

        group.addShape('rect', {
          themeRole: 'header',
          visible: !cfg.isKeySharp,
          name: data.key,
          draggable: true,
          attrs: {
            y:
              -((getLength(data.fields.length) * config.fieldHeight) / 2) -
              config.headerHeight / 2,
            x: -(config.width / 2),
            width: config.width,
            height: config.headerHeight,
            radius: [10, 10, 0, 0],
            // text: data.label,
            id: 'header',
            // fontSize: config.fieldHeight - 12,
            // opacity: !cfg.isKeySharp ? 1 : 0,
            className: 'header',
            shadowColor: palette.shadow,
            cursor: 'move',
            // shadowBlur: 1,
            // shadowOffsetX: 1,
            // shadowOffsetY: 2,
            // radius: [2, 4],
            fill: nodeColors.bg,
          },
        });

        group.addShape('text', {
          themeRole: 'headerText',
          visible: !cfg.isKeySharp,
          name: data.key,
          fontFamily: '',
          draggable: true,
          attrs: {
            // fontFamily: 'iconFont',
            x: -(config.width / 2) + 20,
            y: -((getLength(data.fields.length) * config.fieldHeight) / 2),
            text: showNameOrLabel ? data.name : data.label,
            fieldLable: data.name,
            nameLable: data.label,
            // text: '\ue6b2',
            id: 'headerlabel1',
            cursor: 'move',
            fontSize: config.fieldHeight / 2,
            // opacity: !cfg.isKeySharp ? 1 : 0,
            className: 'headerlabel',
            textBaseline: 'middle',
            textAlign: 'left',
            fontWeight: 20,
            // radius: [2, 4],
            fill: nodeColors.mFront,
          },
        });

        cfg.data.aggregateModelKey &&
          group.addShape('text', {
            themeRole: 'headerText',
            visible: cfg.data.aggregateModelKey,
            name: data.key,
            fontFamily: '',
            draggable: true,
            attrs: {
              fontFamily: 'iconFont',
              x: config.width / 2 - 100,
              y: -((getLength(data.fields.length) * config.fieldHeight) / 2),
              text: data.aggregateRelationLabel,
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
          });

        group.addShape('text', {
          themeRole: 'headerText',
          visible: !cfg.isKeySharp,
          name: data.key,
          fontFamily: '',
          draggable: true,
          attrs: {
            fontFamily: 'iconFont',
            x: config.width / 2 - 40,
            y: -((getLength(data.fields.length) * config.fieldHeight) / 2),
            text: data.viewDetailsLabel,
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
        });

        // const nameList = ((data.name.replace(/\(/, '-').replace(/\)/, '')) || '').split('_').flatMap((nameStr) => nameStr.split('-')).flatMap((nameStr) => nameStr.split('/')).flatMap((a) => getSplitStrings(a)).filter((a) => a)

        // const height = config.headerHeight + (data.fields.length >= 12 ? data.fields.length : 12) * config.fieldHeight
        // const nameLength = nameList.length
        // nameList.forEach((nameText, index) => {
        //     group.addShape('text', {
        //         visible: !cfg.isKeySharp,
        //         name: nameText,
        //         draggable: true,
        //         attrs: {
        //             x: 0,
        //             y: - height / 2 + height / (nameLength + 1) * (index + 1),
        //             fontSize: config.width / 5,
        //             text: nameText,
        //             // opacity: index === nameLength - 1 ? 1 : 0.3,
        //             id: 'headerlabel2',
        //             className: 'headerlabel',
        //             textBaseline: 'middle',
        //             textAlign: 'center',
        //             // radius: [2, 4],
        //             fill: 'black',
        //         },
        //     })
        // })

        const nameList = [data.label];
        const height =
          config.headerHeight +
          (data.fields.length >= 12 ? data.fields.length : 12) *
            config.fieldHeight;
        const nameLength = nameList.length;
        nameList.forEach((nameText, index) => {
          group.addShape('text', {
            themeRole: 'keyText',
            visible: cfg.isKeySharp && !showNameOrLabel && !cfg.isCardSharp,
            name: nameText,
            showNameOrLabel: false,
            draggable: true,
            attrs: {
              x: 0,
              y: -height / 2 + (height / (nameLength + 1)) * (index + 1),
              fontSize: config.width / 5,
              text: nameText,
              // opacity: index === nameLength - 1 ? 1 : 0.3,
              id: 'headerlabel2',
              className: 'headerlabel',
              textBaseline: 'middle',
              textAlign: 'center',
              // radius: [2, 4],
              fill: palette.accent,
            },
          });
        });

        // const nameList1 = ((data.key.replace(/\(/, '-').replace(/\)/, '')) || '').split('_').flatMap((nameStr) => nameStr.split('-')).flatMap((nameStr) => nameStr.split('/')).flatMap((a) => getSplitStrings(a)).filter((a) => a)
        const nameList1 = [data.name];
        const height1 =
          config.headerHeight +
          (data.fields.length >= 12 ? data.fields.length : 12) *
            config.fieldHeight;
        const nameLength1 = nameList.length;
        nameList1.forEach((nameText, index) => {
          group.addShape('text', {
            themeRole: 'keyText',
            visible: cfg.isKeySharp && showNameOrLabel && !cfg.isCardSharp,
            showNameOrLabel: true,
            name: nameText,
            draggable: true,
            attrs: {
              x: 0,
              y: -height1 / 2 + (height1 / (nameLength1 + 1)) * (index + 1),
              fontSize: config.width / 5,
              text: nameText,
              // opacity: index === nameLength - 1 ? 1 : 0.3,
              id: 'headerlabel2',
              className: 'headerlabel',
              textBaseline: 'middle',
              textAlign: 'center',
              // radius: [2, 4],
              fill: palette.accent,
            },
          });
        });

        data.fields.forEach((field, index) => {
          // const {
          //     relationModel,
          //     // isForeign,
          // } = field

          const isForeign = field.typeMeta;
          const relationModel = field?.typeMeta?.relationModel;
          const relationType =
            data.relationLabels?.[field.type] ?? Relation[field.type] ?? '';

          //字段是否存在关系
          // const hasRelation = models.some(item => {
          //     const arr = item.fields?.map(item => {
          //         const { typeMeta = [] } = item
          //         if (Array.isArray(typeMeta)) {
          //             const hasRelationTypeMeta = typeMeta.some(
          //                 item => field.name === item.field
          //             )
          //             return hasRelationTypeMeta
          //         }
          //     })
          //     return arr.includes(true)
          // })

          const y =
            -(
              (config.headerHeight +
                getLength(data.fields.length) * config.fieldHeight) /
              2
            ) +
            config.headerHeight +
            config.fieldHeight * index +
            config.fieldHeight / 2 -
            2;
          group.addShape('rect', {
            themeRole: 'fieldBackground',
            visible: !cfg.isKeySharp,
            name: field.id,
            draggable: true,
            attrs: {
              x: -(config.width / 2) + 2,
              fieldName: field.id,
              name: field.id,
              draggable: true,
              fieldBg: true,
              arg: field.name,
              fieldHover: true,
              y:
                -(
                  (config.headerHeight +
                    getLength(data.fields.length) * config.fieldHeight) /
                  2
                ) +
                config.headerHeight +
                config.fieldHeight * index,
              // stroke: 'black',
              width: config.width - 4,
              id: 'field',
              height: config.fieldHeight,
              fill: palette.field,
              cursor: 'move',
            },
          });

          group.addShape('path', {
            themeRole: 'fieldDivider',
            visible: !cfg.isKeySharp,
            draggable: true,
            name: field.id,

            attrs: {
              draggable: true,
              fieldName: field.id,
              id: 'field-line',
              name: field.id,
              path: [
                ['M', -config.width / 2 + 20, y + 2],
                ['L', config.width / 2 - 40, y + 2],
              ],
              stroke: palette.divider,
              lineWidth: 1,
              lineDash: [5, 5],
              opacity: 0.1,
            },
          });

          const showCircle = isForeign;
          //|| hasRelation

          showCircle &&
            group.addShape('circle', {
              themeRole: 'relationPort',
              visible: true,
              name: field.id,
              draggable: true,
              themeColor: true,
              attrs: {
                x: -(config.width / 2) + 10,
                fieldName: field.id,
                name: field.id,
                draggable: true,
                arg: field.name,
                fieldHover: true,
                y:
                  -(
                    (config.headerHeight +
                      getLength(data.fields.length) * config.fieldHeight) /
                    2
                  ) +
                  config.headerHeight +
                  config.fieldHeight * index +
                  config.fieldHeight / 2 -
                  2,
                id: 'field',
                r: 2,
                fill: palette.accent,
                cursor: 'move',
              },
            });

          group.addShape('text', {
            isForeign: Boolean(isForeign),
            themeRole: 'fieldText',
            visible: !cfg.isKeySharp,
            name: field.id,
            draggable: true,
            themeColor: isForeign,
            attrs: {
              x: -config.width / 2 + 20,
              fieldHover: true,
              name: field.id,
              draggable: true,
              // click: 'fieldEdit',
              y:
                -(
                  (config.headerHeight +
                    getLength(data.fields.length) * config.fieldHeight) /
                  2
                ) +
                config.headerHeight +
                config.fieldHeight * index +
                config.fieldHeight / 2,
              text: showNameOrLabel ? field.name : field.label,
              fieldLable: field.name,
              nameLable: field.label,
              fieldName: field.id,
              arg: field.name,
              fontSize: config.labelSize,
              textBaseline: 'middle',
              cursor: 'move',
              id: 'field',
              textAlign: 'start',
              fill: isForeign ? palette.accent : palette.fieldText,
            },
          });
          const relationModelText = showNameOrLabel
            ? field?.relationModel?.name
            : field?.relationModel?.label;
          // console.log(relationModelText)
          group.addShape('text', {
            isForeign: Boolean(isForeign),
            themeRole: 'fieldMeta',
            visible: !cfg.isKeySharp,
            name: field.id,
            draggable: true,
            themeColor: isForeign,
            attrs: {
              x: config.width / 2 - 20,
              fieldHover: !isForeign,

              // click: 'fieldEdit',
              y:
                -(
                  (config.headerHeight +
                    getLength(data.fields.length) * config.fieldHeight) /
                  2
                ) +
                config.headerHeight +
                config.fieldHeight * index +
                config.fieldHeight / 2,
              text:
                isForeign && relationModelText
                  ? relationModelText
                  : `${field.type || ''}`,
              fieldLable: isForeign
                ? field.type && relationType
                  ? `${field?.relationModel?.name}(${relationType})`
                  : field?.relationModel?.name
                : `${field.type || ''}`,
              nameLable: isForeign
                ? field.type && relationType
                  ? `${field?.relationModel?.label}(${relationType})`
                  : field?.relationModel?.label
                : `${field.type || ''}`,
              id: 'field',
              textBaseline: 'middle',
              fieldName: field.id,
              arg: field,
              fontSize: config.labelSize,
              click: isForeign ? 'fieldSelect' : undefined,
              textAlign: 'right',
              cursor: isForeign ? 'pointer' : 'undefined',
              fill: isForeign ? palette.accent : palette.fieldMuted,
            },
          });

          isForeign &&
            group.addShape('circle', {
              themeRole: 'relationPort',
              visible: true,
              name: field.id,
              draggable: true,
              themeColor: true,
              attrs: {
                x: config.width / 2 - 10,
                fieldName: field.id,
                name: field.id,
                draggable: true,
                arg: field.name,
                fieldHover: true,
                y:
                  -(
                    (config.headerHeight +
                      getLength(data.fields.length) * config.fieldHeight) /
                    2
                  ) +
                  config.headerHeight +
                  config.fieldHeight * index +
                  config.fieldHeight / 2 -
                  2,
                id: 'field',
                r: 2,

                fill: palette.accent,
                cursor: 'move',
              },
            });
        });

        const diffLength = getLength(data.fields.length) - data.fields.length;
        if (diffLength) {
          for (let i = 0; i < diffLength; i++) {
            // ---
            group.addShape('rect', {
              themeRole: 'fieldBackground',
              name: i,
              draggable: true,
              visible: !cfg.isKeySharp,
              attrs: {
                x: -(config.width / 2) + 2,
                y:
                  -(
                    (config.headerHeight +
                      getLength(data.fields.length) * config.fieldHeight) /
                    2
                  ) +
                  config.headerHeight +
                  config.fieldHeight * (data.fields.length + i),
                // stroke: 'black',
                width: config.width - 4,
                id: 'field',
                height: config.fieldHeight,
                fill: palette.field,
                cursor: 'move',
              },

              // ---
            });
          }
        }
      },

      draw(cfg: IModelNodeShapeCfg, group) {
        const { config, data, selected } = cfg;
        const height =
          config.headerHeight +
          getLength(data.fields.length) * config.fieldHeight;
        let keyShape = group!.addShape('rect', {
          themeRole: 'keyShape',
          name: data.key,
          draggable: true,
          // visible: false,
          attrs: {
            id: 'keySharp',
            x: -(config.width / 2),
            y: -height / 2,
            width: config.width,
            cursor: 'move',
            // fill:'red',
            height: height + 10,
            ...cfg.config.styleConfig.default.node,
            stroke: selected
              ? cfg.config.styleConfig.selected.node.stroke
              : cfg.config.styleConfig.default.node.stroke,
          },
        });

        this.render(cfg, group);
        return keyShape;
      },
    },
    'single-shape',
  );
};
