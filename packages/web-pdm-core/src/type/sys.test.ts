import { describe, expect, it } from 'vitest';
import { resolveModelNavigationVisibility } from './sys';

describe('model navigation visibility', () => {
  it('hides an empty navigator by default', () => {
    expect(resolveModelNavigationVisibility(undefined, 0, 0)).toBe(false);
  });

  it('shows navigation when models or modules exist', () => {
    expect(resolveModelNavigationVisibility(undefined, 1, 0)).toBe(true);
    expect(resolveModelNavigationVisibility(undefined, 0, 1)).toBe(true);
  });

  it('allows callers to hide populated navigation but never shows an empty one', () => {
    expect(resolveModelNavigationVisibility(false, 1, 1)).toBe(false);
    expect(resolveModelNavigationVisibility(true, 0, 0)).toBe(false);
  });
});
