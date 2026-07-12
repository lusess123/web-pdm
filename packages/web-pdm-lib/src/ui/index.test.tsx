import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button, Input, Tree } from './index';

describe('lightweight UI adapter', () => {
  it('renders a compact native button', () => {
    const markup = renderToStaticMarkup(<Button size="small">Save</Button>);

    expect(markup).toContain('type="button"');
    expect(markup).toContain('web-pdm-button--small');
    expect(markup).toContain('Save');
  });

  it('renders search input controls without Ant Design', () => {
    const markup = renderToStaticMarkup(
      <Input allowClear placeholder="Search models" value="user" />,
    );

    expect(markup).toContain('web-pdm-input');
    expect(markup).toContain('placeholder="Search models"');
    expect(markup).toContain('web-pdm-input-clear');
  });

  it('renders an accessible model tree', () => {
    const markup = renderToStaticMarkup(
      <Tree
        checkedKeys={['user']}
        checkable
        selectedKeys={['user']}
        webPdmUi={{ style: {}, t: (key: string) => key, theme: 'light' }}
      >
        <Tree.TreeNode eventKey="user" title="User" />
      </Tree>,
    );

    expect(markup).toContain('role="tree"');
    expect(markup).toContain('is-selected');
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain('User');
  });
});
