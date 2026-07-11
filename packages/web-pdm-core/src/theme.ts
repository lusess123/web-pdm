export type WebPdmTheme = 'light' | 'dark';
export type WebPdmThemeMode = WebPdmTheme | 'system';

export type WebPdmPalette = {
  theme: WebPdmTheme;
  background: string;
  surface: string;
  elevated: string;
  foreground: string;
  muted: string;
  subtle: string;
  border: string;
  borderStrong: string;
  accent: string;
  onAccent: string;
  canvas: string;
  grid: string;
  node: string;
  nodeHeader: string;
  field: string;
  fieldHover: string;
  fieldText: string;
  fieldMuted: string;
  divider: string;
  edgeLabelHalo: string;
  shadow: string;
  tooltip: string;
  tooltipText: string;
  minimap: string;
};

const BASE_PALETTES: Record<
  WebPdmTheme,
  Omit<WebPdmPalette, 'theme' | 'accent' | 'onAccent'>
> = {
  light: {
    background: '#ffffff',
    surface: '#ffffff',
    elevated: '#ffffff',
    foreground: '#0f172a',
    muted: '#64748b',
    subtle: '#94a3b8',
    border: '#dbe3ed',
    borderStrong: '#64748b',
    canvas: '#f8fafc',
    grid: 'rgba(100, 116, 139, 0.12)',
    node: '#ffffff',
    nodeHeader: '#eef3f8',
    field: '#ffffff',
    fieldHover: '#e2e8f0',
    fieldText: '#334155',
    fieldMuted: '#64748b',
    divider: '#cbd5e1',
    edgeLabelHalo: '#f8fafc',
    shadow: 'rgba(15, 23, 42, 0.18)',
    tooltip: '#ffffff',
    tooltipText: '#0f172a',
    minimap: 'rgba(15, 23, 42, 0.14)',
  },
  dark: {
    background: '#0b1118',
    surface: '#111923',
    elevated: '#182230',
    foreground: '#e6edf3',
    muted: '#9aa9b9',
    subtle: '#718096',
    border: '#334155',
    borderStrong: '#52657a',
    canvas: '#0b1118',
    grid: 'rgba(148, 163, 184, 0.14)',
    node: '#111923',
    nodeHeader: '#182230',
    field: '#111923',
    fieldHover: '#243244',
    fieldText: '#e6edf3',
    fieldMuted: '#a8b5c3',
    divider: '#334155',
    edgeLabelHalo: '#0b1118',
    shadow: 'rgba(0, 0, 0, 0.55)',
    tooltip: '#182230',
    tooltipText: '#edf4fa',
    minimap: 'rgba(148, 163, 184, 0.28)',
  },
};

const DEFAULT_ACCENTS: Record<WebPdmTheme, string> = {
  light: '#2563eb',
  dark: '#38bdf8',
};

type Rgb = [number, number, number];

const NAMED_COLORS: Record<string, string> = {
  black: '#000000',
  blue: '#0000ff',
  cyan: '#00ffff',
  green: '#008000',
  orange: '#ffa500',
  purple: '#800080',
  red: '#ff0000',
  white: '#ffffff',
};

const parseColor = (color: string): Rgb | undefined => {
  const value = (NAMED_COLORS[color.toLowerCase()] ?? color).trim();
  const shortHex = /^#([\da-f])([\da-f])([\da-f])$/i.exec(value);
  if (shortHex) {
    return shortHex
      .slice(1)
      .map((part) => Number.parseInt(part + part, 16)) as Rgb;
  }

  const hex = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(value);
  if (hex) {
    return hex.slice(1).map((part) => Number.parseInt(part, 16)) as Rgb;
  }

  const rgb = /^rgba?\(\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)/i.exec(value);
  if (!rgb) return undefined;
  return rgb.slice(1, 4).map((part) => Number.parseInt(part, 10)) as Rgb;
};

const luminance = ([red, green, blue]: Rgb) => {
  const [r, g, b] = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (first: string, second: string) => {
  const firstRgb = parseColor(first);
  const secondRgb = parseColor(second);
  if (!firstRgb || !secondRgb) return undefined;
  const [lighter, darker] = [luminance(firstRgb), luminance(secondRgb)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
};

const resolveAccent = (
  color: string | undefined,
  theme: WebPdmTheme,
  canvas: string,
) => {
  const candidate = color?.trim();
  if (!candidate) return DEFAULT_ACCENTS[theme];
  const ratio = contrast(candidate, canvas);
  return ratio === undefined || ratio >= 3 ? candidate : DEFAULT_ACCENTS[theme];
};

const resolveOnAccent = (accent: string) => {
  const onLight = contrast(accent, '#ffffff') ?? 0;
  const onDark = contrast(accent, '#0b1118') ?? 0;
  return onLight >= onDark ? '#ffffff' : '#0b1118';
};

export const createThemePalette = (
  darkness: boolean,
  themeColor?: string,
): WebPdmPalette => {
  const theme: WebPdmTheme = darkness ? 'dark' : 'light';
  const base = BASE_PALETTES[theme];
  const accent = resolveAccent(themeColor, theme, base.canvas);

  return {
    theme,
    ...base,
    accent,
    onAccent: resolveOnAccent(accent),
  };
};

export const createThemeCssVariables = (
  palette: WebPdmPalette,
): Record<string, string> => ({
  '--web-pdm-bg': palette.background,
  '--web-pdm-surface': palette.surface,
  '--web-pdm-elevated': palette.elevated,
  '--web-pdm-fg': palette.foreground,
  '--web-pdm-muted': palette.muted,
  '--web-pdm-subtle': palette.subtle,
  '--web-pdm-border': palette.border,
  '--web-pdm-border-strong': palette.borderStrong,
  '--web-pdm-accent': palette.accent,
  '--web-pdm-on-accent': palette.onAccent,
  '--web-pdm-canvas': palette.canvas,
  '--web-pdm-grid': palette.grid,
  '--web-pdm-node': palette.node,
  '--web-pdm-node-header': palette.nodeHeader,
  '--web-pdm-field': palette.field,
  '--web-pdm-field-hover': palette.fieldHover,
  '--web-pdm-field-text': palette.fieldText,
  '--web-pdm-field-muted': palette.fieldMuted,
  '--web-pdm-divider': palette.divider,
  '--web-pdm-edge-label-halo': palette.edgeLabelHalo,
  '--web-pdm-shadow': palette.shadow,
  '--web-pdm-tooltip': palette.tooltip,
  '--web-pdm-tooltip-text': palette.tooltipText,
  '--web-pdm-minimap': palette.minimap,
});
