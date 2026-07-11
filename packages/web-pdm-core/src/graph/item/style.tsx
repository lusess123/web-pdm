import { createThemePalette } from '../../theme';
import G6 from '../g6';

type InitStyleOptions = {
  primaryColor?: string;
  darkness?: boolean;
};

export const initStyle = ({
  primaryColor,
  darkness = false,
}: InitStyleOptions) => {
  const palette = createThemePalette(darkness, primaryColor);
  const colors = {
    ...palette,
    blue: palette.accent,
    white: palette.onAccent,
    head: palette.nodeHeader,
    black: palette.foreground,
  };

  const edge = {
    lineWidth: 2,
    size: 2,
    lineAppendWidth: 4,
    endArrow: {
      path: G6.Arrow.triangleRect(10, 10, 10, 2, 4),
      fill: palette.accent,
      stroke: palette.accent,
    },
    startArrow: {
      path: G6.Arrow.circle(3, 3),
      d: 6,
      fill: palette.accent,
      stroke: palette.accent,
    },
    radius: 5,
    labelCfg: {
      autoRotate: true,
      style: {
        fill: palette.fieldText,
        fontSize: 34,
        lineWidth: 6,
        stroke: palette.edgeLabelHalo,
      },
    },
    stroke: palette.accent,
  };

  const style = {
    naviWidth: 370,
    default: {
      node: {
        fill: palette.node,
        shadowColor: palette.shadow,
        shadowBlur: 10,
        shadowOffsetX: 0.5,
        shadowOffsetY: 0.5,
        radius: 10,
        lineWidth: 2,
        opacity: 1,
        stroke: palette.border,
      },
      edge,
    },
    selected: {
      node: {
        fill: palette.node,
        stroke: palette.accent,
        shadowColor: palette.accent,
      },
    },
    isNoModule: {
      node: {
        opacity: 0.2,
      },
    },
    fieldRelation: {
      node: {
        fill: palette.node,
        shadowColor: palette.shadow,
        shadowBlur: 10,
        shadowOffsetX: 0.5,
        shadowOffsetY: 0.5,
        radius: 10,
        lineWidth: 2,
        opacity: 1,
        stroke: palette.border,
      },
      edge: {
        ...edge,
        endArrow: {
          path: G6.Arrow.triangle(5, 10, 10),
          d: 10,
          fill: palette.accent,
          stroke: palette.accent,
        },
      },
    },
  };

  return {
    colors,
    palette,
    style,
  };
};
