import { ExtensionCategory, Rect, register, type RectStyleProps } from '../g6';
import { getErdNodeSize, type ErdNodeStyle } from './type';

type RenderContainer = NonNullable<Parameters<Rect['render']>[1]>;
type ParsedErdNodeStyle = Required<RectStyleProps> & ErdNodeStyle;

const MODEL_NODE_TYPE = 'web-pdm-model';

const shorten = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;

class ErdModelNode extends Rect {
  private fieldShapeCount = 0;

  getKeyStyle(attributes = this.parsedAttributes) {
    const style = attributes as ParsedErdNodeStyle;
    return super.getKeyStyle({
      ...attributes,
      size: getErdNodeSize(style),
    });
  }

  render(
    attributes = this.parsedAttributes,
    container?: RenderContainer,
  ): void {
    if (!container) return;
    super.render(attributes, container);

    const style = attributes as ParsedErdNodeStyle;
    if (style.compact > 0) {
      this.renderCompact(style, container);
      this.clearFullNode(container);
      return;
    }

    this.clearCompactNode(container);
    this.renderFullNode(style, container);
  }

  private renderCompact(style: ParsedErdNodeStyle, container: RenderContainer) {
    const { erd, palette, selected, showNameOrLabel } = style;
    const label = showNameOrLabel ? erd.name : erd.label;
    const ultraCompact = style.compact === 2;

    this.upsert(
      'compact-title',
      'text',
      {
        x: 0,
        y: 0,
        text: ultraCompact
          ? shorten(label.replace(/[^\p{L}\p{N}]/gu, ''), 3).toUpperCase()
          : shorten(label, 24),
        fill: selected ? palette.onAccent : palette.foreground,
        fontFamily:
          'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: ultraCompact ? 12 : 14,
        fontWeight: 650,
        textAlign: 'center',
        textBaseline: 'middle',
        cursor: 'pointer',
      },
      container,
    );
  }

  private renderFullNode(
    style: ParsedErdNodeStyle,
    container: RenderContainer,
  ) {
    const {
      erd,
      fieldHeight,
      headerHeight,
      palette,
      selected,
      showNameOrLabel,
    } = style;
    const [width, height] = getErdNodeSize(style);
    const left = -width / 2;
    const top = -height / 2;
    const headerFill = selected ? palette.accent : palette.nodeHeader;
    const headerText = selected ? palette.onAccent : palette.foreground;

    this.upsert(
      'header-background',
      'rect',
      {
        x: left,
        y: top,
        width,
        height: headerHeight,
        radius: [8, 8, 0, 0],
        fill: headerFill,
        cursor: 'move',
        draggable: true,
      },
      container,
    );

    this.upsert(
      'header-title',
      'text',
      {
        x: left + 16,
        y: top + headerHeight / 2,
        text: shorten(showNameOrLabel ? erd.name : erd.label, 24),
        fill: headerText,
        fontFamily:
          'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: 15,
        fontWeight: 650,
        textAlign: 'left',
        textBaseline: 'middle',
        cursor: 'move',
        draggable: true,
      },
      container,
    );

    this.upsert(
      'aggregate-action',
      'text',
      erd.aggregateModelKey
        ? {
            x: left + width - 92,
            y: top + headerHeight / 2,
            text: shorten(erd.aggregateRelationLabel, 8),
            fill: headerText,
            fontSize: 12,
            textAlign: 'right',
            textBaseline: 'middle',
            cursor: 'pointer',
            action: 'arrangeShow',
            actionArg: erd.aggregateModelKey,
          }
        : false,
      container,
    );

    this.upsert(
      'details-action',
      'text',
      {
        x: left + width - 14,
        y: top + headerHeight / 2,
        text: shorten(erd.viewDetailsLabel, 8),
        fill: headerText,
        fontSize: 12,
        textAlign: 'right',
        textBaseline: 'middle',
        cursor: 'pointer',
        action: 'modelEdit',
      },
      container,
    );

    erd.fields.forEach((field, index) => {
      const rowTop = top + headerHeight + index * fieldHeight;
      const rowCenter = rowTop + fieldHeight / 2;
      const rowFill = index % 2 === 0 ? palette.field : palette.node;
      const fieldLabel = showNameOrLabel ? field.name : field.label;

      this.upsert(
        `field-background-${index}`,
        'rect',
        {
          x: left + 1,
          y: rowTop,
          width: width - 2,
          height: fieldHeight,
          fill: rowFill,
          cursor: field.relationModelId ? 'pointer' : 'default',
          fieldName: field.name,
          action: field.relationModelId ? 'focusRelation' : undefined,
          actionArg: field.relationModelId,
        },
        container,
      );

      this.upsert(
        `field-divider-${index}`,
        'line',
        {
          x1: left + 1,
          y1: rowTop,
          x2: left + width - 1,
          y2: rowTop,
          stroke: palette.divider,
          lineWidth: 1,
        },
        container,
      );

      this.upsert(
        `field-name-${index}`,
        'text',
        {
          x: left + 16,
          y: rowCenter,
          text: shorten(fieldLabel, 25),
          fill: field.relationModelId ? palette.accent : palette.fieldText,
          fontSize: 13,
          fontWeight: field.relationModelId ? 600 : 450,
          textAlign: 'left',
          textBaseline: 'middle',
          cursor: field.relationModelId ? 'pointer' : 'default',
          fieldName: field.name,
          action: field.relationModelId ? 'focusRelation' : undefined,
          actionArg: field.relationModelId,
        },
        container,
      );

      this.upsert(
        `field-type-${index}`,
        'text',
        {
          x: left + width - 16,
          y: rowCenter,
          text: shorten(field.type || 'string', 16),
          fill: field.relationModelId ? palette.accent : palette.fieldMuted,
          fontFamily:
            '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
          fontSize: 12,
          textAlign: 'right',
          textBaseline: 'middle',
          cursor: field.relationModelId ? 'pointer' : 'default',
          fieldName: field.name,
          action: field.relationModelId ? 'focusRelation' : undefined,
          actionArg: field.relationModelId,
        },
        container,
      );

      this.upsert(
        `field-relation-${index}`,
        'circle',
        field.relationModelId
          ? {
              cx: left + width - 5,
              cy: rowCenter,
              r: 3,
              fill: palette.accent,
              cursor: 'pointer',
              fieldName: field.name,
              action: 'focusRelation',
              actionArg: field.relationModelId,
            }
          : false,
        container,
      );
    });

    for (
      let index = erd.fields.length;
      index < this.fieldShapeCount;
      index += 1
    ) {
      this.clearField(index, container);
    }
    this.fieldShapeCount = erd.fields.length;
  }

  private clearCompactNode(container: RenderContainer) {
    this.upsert('compact-title', 'text', false, container);
  }

  private clearFullNode(container: RenderContainer) {
    this.upsert('header-background', 'rect', false, container);
    this.upsert('header-title', 'text', false, container);
    this.upsert('aggregate-action', 'text', false, container);
    this.upsert('details-action', 'text', false, container);
    for (let index = 0; index < this.fieldShapeCount; index += 1) {
      this.clearField(index, container);
    }
    this.fieldShapeCount = 0;
  }

  private clearField(index: number, container: RenderContainer) {
    this.upsert(`field-background-${index}`, 'rect', false, container);
    this.upsert(`field-divider-${index}`, 'line', false, container);
    this.upsert(`field-name-${index}`, 'text', false, container);
    this.upsert(`field-type-${index}`, 'text', false, container);
    this.upsert(`field-relation-${index}`, 'circle', false, container);
  }
}

export const registerModelNode = () => {
  register(ExtensionCategory.NODE, MODEL_NODE_TYPE, ErdModelNode);
};

export { MODEL_NODE_TYPE };
