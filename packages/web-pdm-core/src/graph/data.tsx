import type { RootInstance } from '../type';
import type {
  FieldConfig,
  FieldMetaTypeConfig,
  MetaTypeConfig,
  ModelConfig,
} from '../type/config';
import type { TModel } from '../type/model';
import type { EdgeData, NodeData, NodePortStyleProps } from './g6';
import { MODEL_NODE_TYPE } from './item/model-node';
import {
  ERD_FIELD_HEIGHT,
  ERD_HEADER_HEIGHT,
  getErdNodeSize,
  type ErdFieldView,
  type ErdModelView,
} from './item/type';

type StoredField = FieldConfig & {
  id: string;
  modelId: string;
  relationModel?: { id?: string };
};

type RelationMeta = MetaTypeConfig | FieldMetaTypeConfig;

const escapeHtml = (value: string | number | undefined) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const relationMetas = (field: StoredField): RelationMeta[] => {
  const values = Array.isArray(field.typeMeta)
    ? field.typeMeta
    : field.typeMeta
      ? [field.typeMeta]
      : [];
  return values.filter(
    (meta): meta is RelationMeta =>
      meta.type === 'Relation' && Boolean(meta.relationModel),
  );
};

const relationLabels = (root: RootInstance): Record<string, string> => ({
  ToOne: '1:1',
  ToMany: '1:n',
  Lookup: root.intl('graph.lookupRelation'),
  lookup: root.intl('graph.lookupRelation'),
  toMany: '1:n',
  toOne: '1:1',
});

const createModelConfig = (root: RootInstance, model: TModel): ModelConfig => ({
  aggregateModelKey: model.aggregateModelKey,
  aggregateRoot: model.aggregateRoot,
  belongAggregate: model.belongAggregate,
  fields: model.fields.map((field: StoredField) => ({
    label: field.label,
    name: field.name,
    type: field.type,
    typeMeta: field.typeMeta,
  })),
  label: model.label,
  module: root.Modules.get(model.moduleId)?.name ?? '',
  name: model.name,
});

const createPorts = (fields: StoredField[]): NodePortStyleProps[] => {
  const height =
    ERD_HEADER_HEIGHT + Math.max(fields.length, 1) * ERD_FIELD_HEIGHT;
  return [
    {
      key: 'header-left',
      placement: [0, ERD_HEADER_HEIGHT / 2 / height] as [number, number],
    },
    {
      key: 'header-right',
      placement: [1, ERD_HEADER_HEIGHT / 2 / height] as [number, number],
    },
    ...fields.flatMap((_, index) => {
      const y =
        (ERD_HEADER_HEIGHT + index * ERD_FIELD_HEIGHT + ERD_FIELD_HEIGHT / 2) /
        height;
      return [
        {
          key: `field-${index}-left`,
          placement: [0, y] as [number, number],
        },
        {
          key: `field-${index}-right`,
          placement: [1, y] as [number, number],
        },
      ];
    }),
  ];
};

export const createData = (root: RootInstance): NodeData[] => {
  const palette = root.Ui.palette;
  const compact = root.graph.zoom <= 0.1 ? 2 : root.graph.zoom <= 0.4 ? 1 : 0;

  return [...root.Models.values()]
    .filter((model) => root.sys.checkedKeys.includes(model.id))
    .map((model) => {
      const fields = model.fields as StoredField[];
      const selected = model.id === root.sys.currentModel;
      const viewFields: ErdFieldView[] = fields.map((field) => {
        const relation = relationMetas(field)[0];
        return {
          id: field.id,
          label: field.label,
          name: field.name,
          relationModelId: relation
            ? root.findModelByName(relation.relationModel)?.id
            : undefined,
          type: field.type || 'string',
        };
      });
      const erd: ErdModelView = {
        aggregateModelKey: model.aggregateModelKey,
        aggregateRelationLabel: root.intl('graph.aggregateRelation'),
        fields: viewFields,
        label: model.label,
        modelConfig: createModelConfig(root, model),
        modelId: model.id,
        name: model.name,
        viewDetailsLabel: root.intl('graph.viewDetails'),
      };
      const size = getErdNodeSize({ compact, erd });

      return {
        id: `model-${model.id}`,
        type: MODEL_NODE_TYPE,
        data: {
          isSystem: false,
          modelConfig: erd.modelConfig,
          modelId: model.id,
          moduleId: model.moduleId,
        },
        style: {
          badge: false,
          compact,
          cursor: 'pointer',
          erd,
          fieldHeight: ERD_FIELD_HEIGHT,
          fill:
            compact > 0
              ? selected
                ? palette.accent
                : palette.nodeHeader
              : palette.node,
          halo: false,
          headerHeight: ERD_HEADER_HEIGHT,
          icon: false,
          label: false,
          lineWidth: selected ? 2.5 : 1.5,
          palette,
          port: true,
          ports: createPorts(fields),
          radius: compact > 0 ? 8 : 10,
          selected,
          shadowBlur: 0,
          showNameOrLabel: root.sys.showNameOrLabel,
          size,
          stroke:
            selected || model.aggregateModelKey || model.aggregateRoot
              ? palette.accent
              : palette.border,
        },
      } satisfies NodeData;
    });
};

const targetPortFor = (
  targetFields: StoredField[],
  targetFieldName?: string,
) => {
  if (!targetFieldName) return 'header-left';
  const targetIndex = targetFields.findIndex(
    (field) => field.name === targetFieldName,
  );
  return targetIndex >= 0 ? `field-${targetIndex}-left` : 'header-left';
};

export const createLinks = (root: RootInstance): EdgeData[] => {
  const labels = relationLabels(root);
  const palette = root.Ui.palette;
  const visible = new Set(root.sys.checkedKeys);
  const edges: EdgeData[] = [];

  [...root.Models.values()].forEach((model) => {
    if (!visible.has(model.id)) return;
    const fields = model.fields as StoredField[];

    fields.forEach((field, fieldIndex) => {
      if (root.sys.onIgnoreEdge?.(field)) return;
      relationMetas(field).forEach((meta, relationIndex) => {
        const target = root.findModelByName(meta.relationModel);
        if (!target || !visible.has(target.id)) return;

        const relationType = labels[field.type ?? ''] || field.type || '';
        const targetField = 'field' in meta ? meta.field : undefined;
        const tooltipKey = targetField
          ? 'graph.fieldRelationTooltip'
          : 'graph.relationTooltip';
        const tooltip = targetField
          ? root.intl(tooltipKey, {
              field: targetField,
              relationType,
              source: target.label,
              target: model.label,
            })
          : root.intl(tooltipKey, {
              relationType,
              source: target.label,
              target: model.label,
            });

        edges.push({
          id: `relation-${model.id}-${field.id}-${target.id}-${relationIndex}`,
          source: `model-${model.id}`,
          target: `model-${target.id}`,
          type: 'line',
          data: {
            fieldId: field.id,
            isSystem: false,
            relationType,
            tooltip: `<div>${escapeHtml(tooltip)}</div>`,
          },
          style: {
            endArrow: true,
            endArrowFill: palette.accent,
            endArrowStroke: palette.accent,
            endArrowType: 'triangleRect',
            label: Boolean(relationType),
            labelAutoRotate: true,
            labelFill: palette.fieldText,
            labelFontSize: 12,
            labelLineWidth: 5,
            labelStroke: palette.edgeLabelHalo,
            labelText: relationType,
            lineWidth: 1.75,
            loop: model.id === target.id,
            loopDist: 80,
            sourcePort: `field-${fieldIndex}-right`,
            startArrow: true,
            startArrowFill: palette.accent,
            startArrowStroke: palette.accent,
            startArrowType: 'circle',
            stroke: palette.accent,
            targetPort: targetPortFor(
              target.fields as StoredField[],
              targetField,
            ),
          },
        });
      });
    });
  });

  return edges;
};
