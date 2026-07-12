import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { coreMock } = vi.hoisted(() => ({
  coreMock: vi.fn(() => null),
}));

vi.mock('web-pdm-core', () => ({ default: coreMock }));

import WebPdm from './out';

describe('web-pdm default adapters', () => {
  beforeEach(() => coreMock.mockClear());

  it('merges partial component and icon overrides with every default', () => {
    const ProductTooltip = () => null;
    const ReloadIcon = <span>reload</span>;

    renderToStaticMarkup(
      <WebPdm
        IconRenders={{ reload: ReloadIcon }}
        components={{ Tooltip: ProductTooltip }}
        erdkey="partial-overrides"
        models={[]}
        modules={[]}
      />,
    );

    type CoreProps = {
      components: Record<string, unknown>;
      IconRenders: Record<string, unknown>;
    };
    const props = (coreMock.mock.calls as unknown as [CoreProps][]).at(-1)?.[0];
    expect(props).toBeDefined();
    if (!props) throw new Error('WebPdmCore was not rendered');
    expect(props.components).toMatchObject({ Tooltip: ProductTooltip });
    expect(Object.keys(props.components)).toHaveLength(8);
    expect(props.IconRenders).toMatchObject({ reload: ReloadIcon });
    expect(Object.keys(props.IconRenders)).toHaveLength(15);
  });
});
