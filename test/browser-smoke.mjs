import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const port = 43_000 + Math.floor(Math.random() * 1_000);
const baseUrl = `http://localhost:${port}`;
const server = spawn('pnpm', ['dev', '--port', String(port)], {
  detached: true,
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverOutput = '';
server.stdout.on('data', (chunk) => {
  serverOutput += chunk;
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk;
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`文档服务启动超时\n${serverOutput}`);
};

let browser;

const stopServer = () => {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {}
};

const inspectDiagram = async (page) => {
  await page
    .locator('.graph canvas')
    .waitFor({ state: 'visible', timeout: 15_000 });
  await page.waitForTimeout(3_000);

  return page.evaluate(() => {
    const wrapper = document.querySelector('.console-g6-page');
    const graph = document.querySelector('.graph');
    const canvas = graph?.querySelector('canvas');
    const toolbarButtons = [...document.querySelectorAll('.command-btn')];
    const menu = document.querySelector('.console-models-tree');
    const menuInput = document.querySelector('.web-pdm-input-group');
    const menuTree = document.querySelector('.navitree-warp');
    const menuActionRow = document.querySelector('.console-erd-search.btns');
    const menuActionMore = menuActionRow?.querySelector('.right');
    const treeRows = [...document.querySelectorAll('.web-pdm-tree-row')];
    const treeControls = treeRows.map((row) =>
      row.querySelector('.web-pdm-tree-toggle, .web-pdm-tree-toggle-spacer'),
    );
    const treeCenterDeltas = treeRows.map((row) => {
      const centers = [
        row.querySelector('.web-pdm-tree-toggle, .web-pdm-tree-toggle-spacer'),
        row.querySelector('.web-pdm-tree-checkbox'),
        row.querySelector('.web-pdm-tree-label'),
        row.querySelector('.tree-node-title-options'),
      ]
        .filter(Boolean)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return rect.y + rect.height / 2;
        });
      return Math.max(...centers) - Math.min(...centers);
    });
    const branchCheckboxes = treeRows
      .filter((row) => row.querySelector('.web-pdm-tree-toggle'))
      .map((row) => row.querySelector('input[type="checkbox"]'));
    const toolbarRows = new Set(
      toolbarButtons.map((element) =>
        Math.round(element.getBoundingClientRect().y),
      ),
    );
    const context = canvas?.getContext('2d');
    let paintedPixels = 0;
    let contrastPixels = 0;
    let paintedBounds = null;

    if (canvas && context) {
      const pixels = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      let minX = canvas.width;
      let minY = canvas.height;
      let maxX = 0;
      let maxY = 0;
      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] === 0) continue;
        const pixel = (index - 3) / 4;
        const x = pixel % canvas.width;
        const y = Math.floor(pixel / canvas.width);
        paintedPixels += 1;
        if (pixels[index - 3] + pixels[index - 2] + pixels[index - 1] < 690) {
          contrastPixels += 1;
        }
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
      if (paintedPixels > 0) paintedBounds = { minX, minY, maxX, maxY };
    }

    return {
      canvasHeight: canvas?.getBoundingClientRect().height ?? 0,
      canvasWidth: canvas?.getBoundingClientRect().width ?? 0,
      contrastPixels,
      graphHeight: graph?.getBoundingClientRect().height ?? 0,
      menuActionRightGap:
        menuActionRow && menuActionMore
          ? menuActionRow.getBoundingClientRect().right -
            menuActionMore.getBoundingClientRect().right
          : Number.POSITIVE_INFINITY,
      menuBottomPadding: Number.parseFloat(
        menu ? getComputedStyle(menu).paddingBottom : '0',
      ),
      menuInputHeight: menuInput?.getBoundingClientRect().height ?? 0,
      menuInputRightDelta:
        menuInput && menuTree
          ? Math.abs(
              menuInput.getBoundingClientRect().right -
                menuTree.getBoundingClientRect().right,
            )
          : Number.POSITIVE_INFINITY,
      menuMoreButtonCount: document.querySelectorAll('.tree-node-title-options')
        .length,
      paintedBounds,
      paintedPixels,
      parentCheckboxesValid:
        branchCheckboxes.length > 0 &&
        branchCheckboxes.every(
          (checkbox) => checkbox?.checked || checkbox?.indeterminate,
        ),
      toolbarButtonCount: toolbarButtons.length,
      toolbarRowCount: toolbarRows.size,
      treeControlMaxCenterDelta: Math.max(...treeCenterDeltas),
      treeControlMinHeight: Math.min(
        ...treeControls.map(
          (control) => control?.getBoundingClientRect().height ?? 0,
        ),
      ),
      treeLabelCount: document.querySelectorAll('.web-pdm-tree-label').length,
      treeRowMaxHeight: Math.max(
        ...treeRows.map((row) => row.getBoundingClientRect().height),
      ),
      treeRowMinHeight: Math.min(
        ...treeRows.map((row) => row.getBoundingClientRect().height),
      ),
      wrapperHeight: wrapper?.getBoundingClientRect().height ?? 0,
    };
  });
};

const inspectHome = (page) =>
  page.evaluate(() => {
    const home = document.querySelector('.web-pdm-home');
    const workspace = document.querySelector('.web-pdm-home__workspace');
    const diagram = document.querySelector('.web-pdm-home__diagram');
    const rect = (element) => element?.getBoundingClientRect();
    const homeRect = rect(home);
    const workspaceRect = rect(workspace);
    const diagramRect = rect(diagram);
    const diagramVisibleHeight = diagramRect
      ? Math.max(
          0,
          Math.min(diagramRect.bottom, innerHeight) -
            Math.max(diagramRect.top, 0),
        )
      : 0;

    return {
      diagramHeightRatio: diagramRect?.height / innerHeight || 0,
      diagramVisibleHeightRatio: diagramVisibleHeight / innerHeight,
      hasProductMark: Boolean(document.querySelector('.web-pdm-product-mark')),
      hasRspressOutline: Boolean(
        document.querySelector('.rp-doc-layout__outline'),
      ),
      homeWidthRatio: homeRect?.width / innerWidth || 0,
      workspaceBottomOverflow: workspaceRect
        ? Math.max(0, workspaceRect.bottom - innerHeight)
        : Number.POSITIVE_INFINITY,
      workspaceWidthRatio: workspaceRect?.width / innerWidth || 0,
    };
  });

const assertHome = (state) => {
  const failures = [];
  if (!state.hasProductMark) failures.push('首页缺少产品标识');
  if (state.hasRspressOutline) failures.push('首页仍显示文档目录栏');
  if (state.homeWidthRatio < 0.95) failures.push('首页没有铺满可视宽度');
  if (state.workspaceWidthRatio < 0.9) failures.push('ER 工作台宽度不足');
  if (state.workspaceBottomOverflow > 1)
    failures.push('ER 工作台初始化高度超出浏览器可视区域');
  if (state.diagramHeightRatio < 0.6) failures.push('ER 图高度占比不足');
  if (state.diagramVisibleHeightRatio < 0.55)
    failures.push('首屏可见的 ER 图区域不足');

  if (failures.length > 0) {
    throw new Error(
      `首页布局验收失败：${failures.join('；')}\n${JSON.stringify(state)}`,
    );
  }
};

const inspectPresentation = (page) =>
  page.evaluate(() => {
    const wrapper = document.querySelector('.console-g6-page');
    const graph = document.querySelector('.graph');
    const menu = document.querySelector('.console-models-tree');
    const parseColor = (color) =>
      color
        .match(/[\d.]+/g)
        ?.slice(0, 3)
        .map(Number) ?? [0, 0, 0];
    const luminance = (color) => {
      const [red, green, blue] = parseColor(color).map((channel) => {
        const value = channel / 255;
        return value <= 0.03928
          ? value / 12.92
          : Math.pow((value + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    };
    const contrast = (foreground, background) => {
      const values = [luminance(foreground), luminance(background)].sort(
        (a, b) => b - a,
      );
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    const elementContrast = (element) => {
      if (!element) return 0;
      const style = getComputedStyle(element);
      return contrast(style.color, style.backgroundColor);
    };

    return {
      graphBackground: graph ? getComputedStyle(graph).backgroundColor : '',
      locale: wrapper?.getAttribute('data-web-pdm-locale'),
      menuContrast: elementContrast(menu),
      rootContrast: elementContrast(wrapper),
      theme: wrapper?.getAttribute('data-web-pdm-theme'),
    };
  });

const assertPresentation = (route, state, expected) => {
  const failures = [];
  if (state.locale !== expected.locale)
    failures.push(`组件语言应为 ${expected.locale}`);
  if (state.theme !== expected.theme)
    failures.push(`组件主题应为 ${expected.theme}`);
  if (state.rootContrast < 4.5) failures.push('组件根文字对比度不足');
  if (state.menuContrast < 4.5) failures.push('模型导航文字对比度不足');
  if (!state.graphBackground || state.graphBackground === 'rgba(0, 0, 0, 0)')
    failures.push('画布没有主题背景色');

  if (failures.length > 0) {
    throw new Error(
      `${route} 语言/主题验收失败：${failures.join('；')}\n${JSON.stringify(state)}`,
    );
  }
};

const inspectVisibleSidebarWidth = (page) =>
  page.evaluate(() => {
    const sidebar = document.querySelector('.rp-doc-layout__sidebar');
    if (!sidebar || getComputedStyle(sidebar).display === 'none') return 0;
    return sidebar.getBoundingClientRect().width;
  });

const assertDiagram = (route, state) => {
  const failures = [];
  if (state.treeLabelCount < 2) failures.push('模型树没有默认展开');
  if (state.toolbarButtonCount < 5) failures.push('工具栏按钮缺失');
  if (state.toolbarRowCount !== 1) failures.push('工具栏没有保持单行');
  if (state.menuInputHeight < 28 || state.menuInputHeight > 32)
    failures.push('菜单搜索框高度未统一为紧凑尺寸');
  if (state.menuInputRightDelta > 1)
    failures.push('菜单输入框右边缘没有与树列表对齐');
  if (state.menuActionRightGap > 4) failures.push('菜单顶部更多按钮没有右对齐');
  if (state.menuMoreButtonCount < 1) failures.push('树节点更多按钮样式未生效');
  if (state.treeRowMinHeight < 31 || state.treeRowMaxHeight > 33)
    failures.push('树节点行高不一致');
  if (state.treeControlMinHeight < 20)
    failures.push('树节点展开占位没有与复选框对齐');
  if (state.treeControlMaxCenterDelta > 1)
    failures.push('树节点控件没有保持垂直居中');
  if (!state.parentCheckboxesValid) failures.push('父节点复选状态不正确');
  if (state.menuBottomPadding > 8) failures.push('菜单底部存在多余留白');
  if (state.graphHeight > state.wrapperHeight + 1)
    failures.push('画布容器溢出组件高度');
  if (state.canvasWidth <= 0 || state.canvasHeight <= 0)
    failures.push('画布尺寸无效');
  if (state.paintedPixels < 5_000 || state.contrastPixels < 1_000) {
    failures.push('画布中没有足够可见的 ER 节点');
  }

  if (failures.length > 0) {
    throw new Error(
      `${route} 图形验收失败：${failures.join('；')}\n${JSON.stringify(state)}`,
    );
  }
};

try {
  await waitForServer();
  console.log('docs server ok');
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.setDefaultTimeout(15_000);
  const errors = [];

  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.text().startsWith('[rsbuild] HMR update failed')) return;
    if (['error', 'warning'].includes(message.type()))
      errors.push(message.text());
  });

  for (const route of [
    '/',
    '/guide/getting-started',
    '/demo/',
    '/config/',
    '/zh/',
    '/zh/guide/getting-started',
    '/zh/demo/',
    '/zh/config/',
  ]) {
    const response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: 'domcontentloaded',
    });
    if (!response?.ok()) throw new Error(`${route} 返回 ${response?.status()}`);
    console.log(`${route} ok`);
  }

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body.innerText.trim().length > 0);
  const homeText = await page.locator('body').innerText();
  if (!homeText.includes('0.3.11')) {
    throw new Error(
      `首页未显示版本号。页面内容：\n${homeText.slice(0, 500)}\n浏览器异常：\n${errors.join('\n')}`,
    );
  }
  assertHome(await inspectHome(page));
  assertDiagram('/', await inspectDiagram(page));
  assertPresentation('/', await inspectPresentation(page), {
    locale: 'en',
    theme: 'light',
  });
  if (
    (await page.locator('.web-pdm-input').getAttribute('placeholder')) !==
    'Search models'
  ) {
    throw new Error('英文组件未显示英文搜索文案');
  }

  await page.locator('.command-btn[aria-label="Switch to dark theme"]').click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('.console-g6-page')
        ?.getAttribute('data-web-pdm-theme') === 'dark',
  );
  assertPresentation('/ dark', await inspectPresentation(page), {
    locale: 'en',
    theme: 'dark',
  });
  await page
    .locator('.console-erd-search.btns button[aria-label="More actions"]')
    .click();
  const darkPortal = page.locator('.web-pdm-menu[data-web-pdm-theme="dark"]');
  await darkPortal.waitFor({ state: 'visible' });
  if ((await darkPortal.count()) < 1) throw new Error('暗色主题没有传递到浮层');
  await page.keyboard.press('Escape');

  await page.goto(`${baseUrl}/zh/`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body.innerText.trim().length > 0);
  const chineseHomeText = await page.locator('body').innerText();
  if (!chineseHomeText.includes('把复杂的数据关系'))
    throw new Error('中文首页没有显示中文文案');
  assertHome(await inspectHome(page));
  assertDiagram('/zh/', await inspectDiagram(page));
  assertPresentation('/zh/', await inspectPresentation(page), {
    locale: 'zh-CN',
    theme: 'light',
  });
  if (
    (await page.locator('.web-pdm-input').getAttribute('placeholder')) !==
    '搜索模型'
  ) {
    throw new Error('中文组件未显示中文搜索文案');
  }
  if (
    (await page.locator('.command-btn[aria-label="切换到黑暗主题"]').count()) <
    1
  ) {
    throw new Error('中文工具栏文案没有生效');
  }

  await page.goto(`${baseUrl}/demo/`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body.innerText.trim().length > 0);
  assertDiagram('/demo/', await inspectDiagram(page));

  for (const route of ['/demo/', '/config/', '/zh/demo/', '/zh/config/']) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    if ((await inspectVisibleSidebarWidth(page)) > 0)
      throw new Error(`${route} 没有菜单项时仍显示空侧栏`);
  }

  if (errors.length > 0)
    throw new Error(`浏览器控制台异常：\n${errors.join('\n')}`);
  console.log('browser smoke ok');
} finally {
  await browser?.close();
  stopServer();
}
