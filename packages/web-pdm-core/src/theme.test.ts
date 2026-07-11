import { describe, expect, it } from 'vitest';
import { createThemePalette } from './theme';

const hexToRgb = (color: string) => {
  const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(color);
  if (!match) throw new Error(`Expected a hex color, received ${color}`);
  return match.slice(1).map((part) => Number.parseInt(part, 16));
};

const luminance = (color: string) => {
  const [red, green, blue] = hexToRgb(color).map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrast = (first: string, second: string) => {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

describe.each([
  ['light', false],
  ['dark', true],
] as const)('%s theme palette', (_name, darkness) => {
  const palette = createThemePalette(darkness);

  it('keeps primary and canvas text at readable contrast', () => {
    expect(
      contrast(palette.foreground, palette.background),
    ).toBeGreaterThanOrEqual(4.5);
    expect(contrast(palette.fieldText, palette.field)).toBeGreaterThanOrEqual(
      4.5,
    );
    expect(contrast(palette.fieldMuted, palette.field)).toBeGreaterThanOrEqual(
      4.5,
    );
    expect(
      contrast(palette.tooltipText, palette.tooltip),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps controls and accented content visually distinguishable', () => {
    expect(
      contrast(palette.borderStrong, palette.background),
    ).toBeGreaterThanOrEqual(3);
    expect(contrast(palette.accent, palette.canvas)).toBeGreaterThanOrEqual(3);
    expect(contrast(palette.onAccent, palette.accent)).toBeGreaterThanOrEqual(
      4.5,
    );
  });
});

it('replaces an unreadable custom accent in dark mode', () => {
  expect(createThemePalette(true, '#000000').accent).not.toBe('#000000');
});
