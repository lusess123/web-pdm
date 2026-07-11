import { describe, expect, it } from 'vitest';
import {
  messages,
  normalizeLocale,
  translate,
  translateWithOverride,
} from './intl';

describe('internationalization', () => {
  it('uses English by default and keeps legacy locale aliases compatible', () => {
    expect(normalizeLocale()).toBe('en');
    expect(normalizeLocale('EN')).toBe('en');
    expect(normalizeLocale('CH')).toBe('zh-CN');
    expect(translate(undefined, 'toolbar.undo')).toBe('Undo');
    expect(translate('CH', 'toolbar.undo')).toBe('撤销');
  });

  it('keeps the English and Chinese dictionaries structurally aligned', () => {
    expect(Object.keys(messages['zh-CN']).sort()).toEqual(
      Object.keys(messages.en).sort(),
    );
  });

  it('formats relation messages without leaking template placeholders', () => {
    expect(
      translate('en', 'graph.fieldRelationTooltip', {
        field: 'customerId',
        relationType: '1:1',
        source: 'Customer',
        target: 'Order',
      }),
    ).toBe('Relation from Customer to Order.customerId (1:1)');
  });

  it('keeps token-based legacy translation callbacks working', () => {
    const dictionary: Record<string, string> = {
      显示: 'Show ',
      名称: 'name',
      分类: 'Category',
      模式: 'mode',
      点击: 'Click to ',
      打开: 'open',
      颜色面板: 'color panel',
      切换底色: 'Toggle theme',
    };
    const legacyTranslator = (text: string) => dictionary[text] ?? text;

    expect(
      translateWithOverride(
        'en',
        'navigation.showName',
        undefined,
        legacyTranslator,
      ),
    ).toBe('Show name');
    expect(
      translateWithOverride(
        'en',
        'navigation.categoryMode',
        undefined,
        legacyTranslator,
      ),
    ).toBe('Category mode');
    expect(
      translateWithOverride(
        'en',
        'toolbar.openColorPanel',
        undefined,
        legacyTranslator,
      ),
    ).toBe('Click to open color panel');
    expect(
      translateWithOverride(
        'en',
        'toolbar.switchToDarkTheme',
        undefined,
        legacyTranslator,
      ),
    ).toBe('Toggle theme');
    expect(
      translateWithOverride(
        'en',
        'toolbar.switchToLightTheme',
        undefined,
        legacyTranslator,
      ),
    ).toBe('Toggle theme');
  });

  it('falls back to the built-in locale for identity callbacks', () => {
    expect(
      translateWithOverride('en', 'toolbar.undo', undefined, (text) => text),
    ).toBe('Undo');
  });
});
