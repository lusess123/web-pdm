import { ExtensionCategory, Rect, register, type RectStyleProps } from '../g6';
import { getErdNodeSize, type ErdNodeStyle } from './type';

type RenderContainer = NonNullable<Parameters<Rect['render']>[1]>;
type ParsedErdNodeStyle = Required<RectStyleProps> & ErdNodeStyle;

const MODEL_NODE_TYPE = 'web-pdm-model';
const DETAILS_BUTTON_SIZE = 24;
const DETAILS_BUTTON_INSET = 12;
const DETAILS_BUTTON_GAP = 8;
const COMPACT_TITLE_HORIZONTAL_PADDING = 32;
const COMPACT_TITLE_VERTICAL_PADDING = 24;
const COMPACT_TITLE_MIN_FONT_SIZE = 6;
const COMPACT_TITLE_LINE_HEIGHT = 1.15;

const shorten = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;

const characterWidth = (character: string) => {
  if (/\s/u.test(character)) return 0.5;
  return 1;
};

const wrapCompactTitle = (label: string, lineCount: number) => {
  if (lineCount <= 1) return label;
  const characters = Array.from(label);
  const targetWidth =
    characters.reduce(
      (width, character) => width + characterWidth(character),
      0,
    ) / lineCount;
  const lines: string[] = [];
  let line = '';
  let lineWidth = 0;

  characters.forEach((character) => {
    const width = characterWidth(character);
    if (
      line &&
      lines.length < lineCount - 1 &&
      lineWidth + width > targetWidth
    ) {
      lines.push(line);
      line = character;
      lineWidth = width;
      return;
    }
    line += character;
    lineWidth += width;
  });
  if (line) lines.push(line);
  return lines.join('\n');
};

const fitCompactTitle = (
  label: string,
  width: number,
  height: number,
  preferredFontSize: number,
) => {
  const availableWidth = Math.max(width - COMPACT_TITLE_HORIZONTAL_PADDING, 1);
  const availableHeight = Math.max(height - COMPACT_TITLE_VERTICAL_PADDING, 1);
  const labelWidth = Math.max(
    1,
    Array.from(label).reduce(
      (total, character) => total + characterWidth(character),
      0,
    ),
  );
  const lineLimit = Math.max(
    1,
    Math.floor(
      availableHeight /
        (COMPACT_TITLE_MIN_FONT_SIZE * COMPACT_TITLE_LINE_HEIGHT),
    ),
  );
  let bestFontSize = 0;
  let bestLineCount = 1;

  for (let lineCount = 1; lineCount <= lineLimit; lineCount += 1) {
    const fontSize = Math.min(
      preferredFontSize,
      (availableWidth * lineCount) / labelWidth,
      availableHeight / (lineCount * COMPACT_TITLE_LINE_HEIGHT),
    );
    if (fontSize <= bestFontSize) continue;
    bestFontSize = fontSize;
    bestLineCount = lineCount;
  }

  const fontSize = Math.max(4, Math.floor(bestFontSize));
  const lineHeight = Math.max(
    5,
    Math.floor(fontSize * COMPACT_TITLE_LINE_HEIGHT),
  );
  const text = wrapCompactTitle(label, bestLineCount);
  return {
    fontSize,
    lineHeight,
    maxLines: text.split('\n').length,
    text,
  };
};

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
    const [width, height] = getErdNodeSize(style);
    const left = -width / 2;
    const top = -height / 2;
    const title = fitCompactTitle(label, width, height, ultraCompact ? 40 : 28);

    this.upsert(
      'compact-fields-background',
      'rect',
      {
        x: left + 1,
        y: top + style.headerHeight,
        width: width - 2,
        height: height - style.headerHeight,
        radius: [0, 0, 8, 8],
        fill: selected ? palette.accent : palette.node,
        pointerEvents: 'none',
      },
      container,
    );

    this.upsert(
      'compact-title',
      'text',
      {
        x: 0,
        y: 0,
        text: title.text,
        fill: selected ? palette.onAccent : palette.foreground,
        fontFamily:
          'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: title.fontSize,
        fontWeight: 650,
        lineHeight: title.lineHeight,
        maxLines: title.maxLines,
        textAlign: 'center',
        textBaseline: 'middle',
        wordWrap: true,
        wordWrapWidth: width - COMPACT_TITLE_HORIZONTAL_PADDING,
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
    const detailsButtonX =
      left + width - DETAILS_BUTTON_INSET - DETAILS_BUTTON_SIZE;
    const detailsButtonY = top + (headerHeight - DETAILS_BUTTON_SIZE) / 2;
    const detailsIconX = detailsButtonX + DETAILS_BUTTON_SIZE / 2;
    const detailsIconY = detailsButtonY + DETAILS_BUTTON_SIZE / 2;

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
            x: detailsButtonX - DETAILS_BUTTON_GAP,
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
      'details-button',
      'rect',
      {
        x: detailsButtonX,
        y: detailsButtonY,
        width: DETAILS_BUTTON_SIZE,
        height: DETAILS_BUTTON_SIZE,
        radius: 6,
        fill: selected ? palette.onAccent : palette.surface,
        fillOpacity: selected ? 0.14 : 1,
        stroke: selected ? palette.onAccent : palette.borderStrong,
        strokeOpacity: selected ? 0.5 : 1,
        lineWidth: 1,
        cursor: 'pointer',
        action: 'modelEdit',
        tooltip: erd.viewDetailsLabel,
      },
      container,
    );

    this.upsert(
      'details-icon',
      'path',
      {
        d: `M ${detailsIconX - 7} ${detailsIconY} C ${detailsIconX - 4.5} ${detailsIconY - 3.5}, ${detailsIconX - 2} ${detailsIconY - 5}, ${detailsIconX} ${detailsIconY - 5} C ${detailsIconX + 2} ${detailsIconY - 5}, ${detailsIconX + 4.5} ${detailsIconY - 3.5}, ${detailsIconX + 7} ${detailsIconY} C ${detailsIconX + 4.5} ${detailsIconY + 3.5}, ${detailsIconX + 2} ${detailsIconY + 5}, ${detailsIconX} ${detailsIconY + 5} C ${detailsIconX - 2} ${detailsIconY + 5}, ${detailsIconX - 4.5} ${detailsIconY + 3.5}, ${detailsIconX - 7} ${detailsIconY} Z`,
        fill: 'transparent',
        stroke: headerText,
        lineWidth: 1.75,
        lineCap: 'round',
        lineJoin: 'round',
        pointerEvents: 'none',
      },
      container,
    );

    this.upsert(
      'details-icon-pupil',
      'circle',
      {
        cx: detailsIconX,
        cy: detailsIconY,
        r: 2.25,
        fill: headerText,
        pointerEvents: 'none',
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
    this.upsert('compact-fields-background', 'rect', false, container);
    this.upsert('compact-title', 'text', false, container);
  }

  private clearFullNode(container: RenderContainer) {
    this.upsert('header-background', 'rect', false, container);
    this.upsert('header-title', 'text', false, container);
    this.upsert('aggregate-action', 'text', false, container);
    this.upsert('details-button', 'rect', false, container);
    this.upsert('details-icon', 'path', false, container);
    this.upsert('details-icon-pupil', 'circle', false, container);
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
