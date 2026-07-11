import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const baseUrl = 'http://localhost:3000';
const server = spawn('pnpm', ['dev'], {
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
  await page.waitForTimeout(1_500);

  return page.evaluate(() => {
    const wrapper = document.querySelector('.console-g6-page');
    const graph = document.querySelector('.graph');
    const canvas = graph?.querySelector('canvas');
    const toolbarButtons = [...document.querySelectorAll('.command-btn')];
    const menu = document.querySelector('.console-models-tree');
    const menuInput = document.querySelector('.web-pdm-input-group');
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

const assertDiagram = (route, state) => {
  const failures = [];
  if (state.treeLabelCount < 2) failures.push('模型树没有默认展开');
  if (state.toolbarButtonCount < 5) failures.push('工具栏按钮缺失');
  if (state.toolbarRowCount !== 1) failures.push('工具栏没有保持单行');
  if (state.menuInputHeight < 28 || state.menuInputHeight > 32)
    failures.push('菜单搜索框高度未统一为紧凑尺寸');
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
    if (['error', 'warning'].includes(message.type()))
      errors.push(message.text());
  });

  for (const route of ['/', '/guide/getting-started', '/demo/']) {
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
  assertDiagram('/', await inspectDiagram(page));

  await page.goto(`${baseUrl}/demo/`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body.innerText.trim().length > 0);
  assertDiagram('/demo/', await inspectDiagram(page));

  if (errors.length > 0)
    throw new Error(`浏览器控制台异常：\n${errors.join('\n')}`);
  console.log('browser smoke ok');
} finally {
  await browser?.close();
  stopServer();
}
