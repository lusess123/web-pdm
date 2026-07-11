import type { WebPdmPalette } from '../../theme';
import type { ModelConfig } from '../../type/config';
import type { RectStyleProps } from '../g6';

export type ErdFieldView = {
  id: string;
  label: string;
  name: string;
  type: string;
  relationModelId?: string;
};

export type ErdModelView = {
  aggregateModelKey?: string;
  aggregateRelationLabel: string;
  fields: ErdFieldView[];
  label: string;
  modelConfig: ModelConfig;
  modelId: string;
  name: string;
  viewDetailsLabel: string;
};

export interface ErdNodeStyle extends RectStyleProps {
  compact: 0 | 1 | 2;
  erd: ErdModelView;
  fieldHeight: number;
  headerHeight: number;
  palette: WebPdmPalette;
  selected: boolean;
  showNameOrLabel: boolean;
}

export const ERD_NODE_WIDTH = 300;
export const ERD_HEADER_HEIGHT = 48;
export const ERD_FIELD_HEIGHT = 32;

export const getErdNodeSize = (
  style: Pick<ErdNodeStyle, 'compact' | 'erd'>,
): [number, number] => {
  if (style.compact === 2) return [62, 36];
  if (style.compact === 1) return [210, 44];
  return [
    ERD_NODE_WIDTH,
    ERD_HEADER_HEIGHT + Math.max(style.erd.fields.length, 1) * ERD_FIELD_HEIGHT,
  ];
};
