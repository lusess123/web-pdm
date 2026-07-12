import { spawn } from 'node:child_process';
import { stat } from 'node:fs/promises';
import { chromium } from 'playwright';

const expectedG6Version = '5.1.1';

const port = 43_000 + Math.floor(Math.random() * 1_000);
const baseUrl = `http://localhost:${port}`;
const server = spawn('corepack', ['pnpm', 'dev', '--port', String(port)], {
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
    .locator('.graph[data-g6-status="ready"]')
    .waitFor({ state: 'visible', timeout: 30_000 });
  await page.waitForFunction(
    () =>
      [...document.querySelectorAll('.graph canvas')].some((canvas) => {
        const bounds = canvas.getBoundingClientRect();
        return bounds.width > 0 && bounds.height > 0;
      }),
    undefined,
    { timeout: 15_000 },
  );

  return page.evaluate(() => {
    const wrapper = document.querySelector('.console-g6-page');
    const graph = document.querySelector('.graph');
    const canvases = [...(graph?.querySelectorAll('canvas') ?? [])];
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
    let paintedPixels = 0;
    let contrastPixels = 0;
    let paintedBounds = null;
    let canvasHeight = 0;
    let canvasWidth = 0;

    for (const canvas of canvases) {
      const bounds = canvas.getBoundingClientRect();
      canvasHeight = Math.max(canvasHeight, bounds.height);
      canvasWidth = Math.max(canvasWidth, bounds.width);
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context || canvas.width === 0 || canvas.height === 0) continue;
      const pixels = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      let minX = paintedBounds?.minX ?? canvas.width;
      let minY = paintedBounds?.minY ?? canvas.height;
      let maxX = paintedBounds?.maxX ?? 0;
      let maxY = paintedBounds?.maxY ?? 0;
      let layerPaintedPixels = 0;
      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] === 0) continue;
        const pixel = (index - 3) / 4;
        const x = pixel % canvas.width;
        const y = Math.floor(pixel / canvas.width);
        paintedPixels += 1;
        layerPaintedPixels += 1;
        if (pixels[index - 3] + pixels[index - 2] + pixels[index - 1] < 690) {
          contrastPixels += 1;
        }
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
      if (layerPaintedPixels > 0) {
        paintedBounds = { minX, minY, maxX, maxY };
      }
    }

    return {
      canvasCount: canvases.length,
      canvasHeight,
      canvasWidth,
      contrastPixels,
      g6EdgeCount: Number(graph?.getAttribute('data-g6-edge-count') ?? NaN),
      g6Layout: graph?.getAttribute('data-g6-layout'),
      g6Minimap: graph?.getAttribute('data-g6-minimap'),
      g6NodeCount: Number(graph?.getAttribute('data-g6-node-count') ?? NaN),
      g6Status: graph?.getAttribute('data-g6-status'),
      g6Version: graph?.getAttribute('data-g6-version'),
      g6Zoom: Number(graph?.getAttribute('data-g6-zoom') ?? NaN),
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
    const masthead = document.querySelector('.web-pdm-home__masthead');
    const demo = document.querySelector('.web-pdm-home__demo');
    const workspace = document.querySelector('.web-pdm-home__workspace');
    const diagram = document.querySelector('.web-pdm-home__diagram');
    const starCard = document.querySelector('.web-pdm-home__github-stars');
    const starChart = document.querySelector('[data-github-star-chart]');
    const rect = (element) => element?.getBoundingClientRect();
    const homeRect = rect(home);
    const demoRect = rect(demo);
    const workspaceRect = rect(workspace);
    const diagramRect = rect(diagram);

    return {
      demoHeightRatio: demoRect?.height / (homeRect?.height || 1) || 0,
      demoStartDelta:
        demoRect && homeRect
          ? Math.abs(demoRect.top - homeRect.bottom)
          : Number.POSITIVE_INFINITY,
      diagramHeightRatio: diagramRect?.height / (homeRect?.height || 1) || 0,
      hasCapabilities: Boolean(
        document.querySelector('.web-pdm-home__capabilities'),
      ),
      hasCommunityHistory:
        document.querySelectorAll('.web-pdm-home__community-card img').length >=
        2,
      hasProductDirection: Boolean(
        document.querySelector('.web-pdm-home__direction img'),
      ),
      hasProductMark: Boolean(document.querySelector('.web-pdm-product-mark')),
      hasNpmPackageLink: Boolean(
        document.querySelector(
          'a.web-pdm-home__install[href="https://www.npmjs.com/package/web-pdm"]',
        ),
      ),
      hasDemoAnchor: Boolean(
        document.querySelector('a.web-pdm-home__link[href="#live-demo"]'),
      ),
      hasRspressOutline: Boolean(
        document.querySelector('.rp-doc-layout__outline'),
      ),
      githubStarCount: Number(
        starCard?.getAttribute('data-github-star-count') ?? NaN,
      ),
      githubStarImageCount: document.querySelectorAll(
        '.web-pdm-home__star-image',
      ).length,
      homeWidthRatio: homeRect?.width / innerWidth || 0,
      homeScrollTop: home?.scrollTop ?? Number.POSITIVE_INFINITY,
      isScrollable: Boolean(
        home && home.scrollHeight > home.clientHeight + 100,
      ),
      mastheadHeightRatio:
        masthead?.getBoundingClientRect().height / (homeRect?.height || 1) || 0,
      starChartHeight: starChart?.getBoundingClientRect().height ?? 0,
      starChartSource: starChart?.getAttribute('src') ?? 'inline-fallback',
      starChartWidth: starChart?.getBoundingClientRect().width ?? 0,
      workspaceWidthRatio: workspaceRect?.width / (homeRect?.width || 1) || 0,
    };
  });

const assertHome = (state) => {
  const failures = [];
  if (!state.hasProductMark) failures.push('首页缺少产品标识');
  if (!state.hasDemoAnchor) failures.push('首页缺少 Demo 页内入口');
  if (!state.hasNpmPackageLink) failures.push('首页缺少 npm 包链接');
  if (state.githubStarCount < 217) failures.push('首页 GitHub Star 数无效');
  if (state.githubStarImageCount > 1)
    failures.push('首页同时加载了多张 Star 趋势图');
  if (state.starChartWidth < 40 || state.starChartHeight < 20)
    failures.push('首页 GitHub Star 增长曲线不可见');
  if (
    state.starChartSource !== 'inline-fallback' &&
    !state.starChartSource.includes('repostars.dev/api/embed')
  ) {
    failures.push('首页没有使用动态 Star 历史服务');
  }
  if (!state.hasCapabilities) failures.push('首页缺少产品能力介绍');
  if (!state.hasProductDirection)
    failures.push('首页缺少原有产品方向或产品截图');
  if (!state.hasCommunityHistory) failures.push('首页缺少原有共建或赞助信息');
  if (state.hasRspressOutline) failures.push('首页仍显示文档目录栏');
  if (!state.isScrollable) failures.push('首页没有保留首屏下方的完整产品介绍');
  if (state.homeWidthRatio < 0.95) failures.push('首页没有铺满可视宽度');
  if (state.mastheadHeightRatio < 0.98)
    failures.push('首页首屏没有覆盖浏览器可视区域');
  if (state.homeScrollTop > 1) failures.push('首页初始位置不在产品首屏');
  if (state.demoStartDelta > 1) failures.push('Demo 没有紧接在产品首屏下方');
  if (state.demoHeightRatio < 0.98 || state.demoHeightRatio > 1.02)
    failures.push('Demo 没有占满一个浏览器可视高度');
  if (state.workspaceWidthRatio < 0.9) failures.push('ER 工作台宽度不足');
  if (state.diagramHeightRatio < 0.82)
    failures.push('满屏 Demo 的 ER 图高度不足');

  if (failures.length > 0) {
    throw new Error(
      `首页布局验收失败：${failures.join('；')}\n${JSON.stringify(state)}`,
    );
  }
};

const assertDemoAnchorScroll = async (page) => {
  await page.locator('a.web-pdm-home__link[href="#live-demo"]').click();
  await page.waitForFunction(
    () => {
      const home = document.querySelector('.web-pdm-home');
      const demo = document.querySelector('.web-pdm-home__demo');
      const homeRect = home?.getBoundingClientRect();
      const demoRect = demo?.getBoundingClientRect();
      return Boolean(
        homeRect && demoRect && Math.abs(homeRect.top - demoRect.top) <= 2,
      );
    },
    undefined,
    { timeout: 15_000 },
  );

  const state = await page.evaluate(() => {
    const home = document.querySelector('.web-pdm-home');
    const demo = document.querySelector('.web-pdm-home__demo');
    const homeRect = home?.getBoundingClientRect();
    const demoRect = demo?.getBoundingClientRect();
    const visibleHeight =
      homeRect && demoRect
        ? Math.max(
            0,
            Math.min(demoRect.bottom, homeRect.bottom) -
              Math.max(demoRect.top, homeRect.top),
          )
        : 0;
    return {
      hash: location.hash,
      scrollDelta:
        homeRect && demoRect
          ? Math.abs(homeRect.top - demoRect.top)
          : Number.POSITIVE_INFINITY,
      visibleRatio: visibleHeight / (homeRect?.height || 1),
    };
  });

  if (
    state.hash !== '#live-demo' ||
    state.scrollDelta > 2 ||
    state.visibleRatio < 0.98
  ) {
    throw new Error(`Demo 页内滚动验收失败：${JSON.stringify(state)}`);
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
      graphBackgroundImage: graph
        ? getComputedStyle(graph).backgroundImage
        : '',
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
  if (state.graphBackgroundImage !== 'none')
    failures.push('画布不应显示网格背景');

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

const inspectVisibleDocChromeWidth = (page) =>
  page.evaluate(() =>
    [
      document.querySelector('.rp-doc-layout__sidebar'),
      document.querySelector('.rp-doc-layout__outline'),
    ].reduce(
      (width, element) =>
        width +
        (element && getComputedStyle(element).display !== 'none'
          ? element.getBoundingClientRect().width
          : 0),
      0,
    ),
  );

const assertDiagram = (route, state, expectedCounts) => {
  const failures = [];
  if (state.g6Status !== 'ready') failures.push('G6 没有完成真实渲染');
  if (state.g6Version !== expectedG6Version)
    failures.push(`G6 版本不是 ${expectedG6Version}`);
  if (
    expectedCounts &&
    (state.g6NodeCount !== expectedCounts.nodes ||
      state.g6EdgeCount !== expectedCounts.edges)
  ) {
    failures.push(
      `G6 数据数量错误，实际 ${state.g6NodeCount} 节点/${state.g6EdgeCount} 关系边，预期 ${expectedCounts.nodes}/${expectedCounts.edges}`,
    );
  }
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
  if (state.canvasCount < 1) failures.push('G6 没有创建 Canvas 图层');
  if (state.paintedPixels < 5_000 || state.contrastPixels < 1_000) {
    failures.push('画布中没有足够可见的 ER 节点');
  }

  if (failures.length > 0) {
    throw new Error(
      `${route} 图形验收失败：${failures.join('；')}\n${JSON.stringify(state)}`,
    );
  }
};

const readGraphDiagnostics = (page) =>
  page.evaluate(() => {
    const graph = document.querySelector('.graph');
    return {
      compactNodeCount: Number(
        graph?.getAttribute('data-g6-compact-node-count') ?? NaN,
      ),
      edgeCount: Number(graph?.getAttribute('data-g6-edge-count') ?? NaN),
      layout: graph?.getAttribute('data-g6-layout'),
      minimap: graph?.getAttribute('data-g6-minimap'),
      nodeCount: Number(graph?.getAttribute('data-g6-node-count') ?? NaN),
      status: graph?.getAttribute('data-g6-status'),
      version: graph?.getAttribute('data-g6-version'),
      zoom: Number(graph?.getAttribute('data-g6-zoom') ?? NaN),
    };
  });

const waitForGraphAttribute = (page, attribute, expected) =>
  page.waitForFunction(
    ({ attribute, expected }) =>
      document.querySelector('.graph')?.getAttribute(attribute) === expected,
    { attribute, expected },
    { timeout: 30_000 },
  );

const waitForNextGraphReady = async (page, action) => {
  const token = `${Date.now()}-${Math.random()}`;
  await page.evaluate((token) => {
    const graph = document.querySelector('.graph');
    if (!graph) throw new Error('找不到 G6 画布容器');
    graph.setAttribute('data-g6-test-ready', token);
    graph.addEventListener(
      'web-pdm:graph-ready',
      () => graph.setAttribute('data-g6-test-ready', `${token}:ready`),
      { once: true },
    );
  }, token);
  await action();
  await waitForGraphAttribute(page, 'data-g6-test-ready', `${token}:ready`);
  await page.evaluate(() =>
    document.querySelector('.graph')?.removeAttribute('data-g6-test-ready'),
  );
};

const findSelectedDetailButton = (page) =>
  page.evaluate(() => {
    const graph = document.querySelector('.graph');
    const wrapper = document.querySelector('.console-g6-page');
    if (!graph || !wrapper) throw new Error('找不到 ER 图容器');

    const accent = getComputedStyle(wrapper)
      .getPropertyValue('--web-pdm-accent')
      .trim();
    const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(accent);
    if (!match) throw new Error(`无法识别主题色：${accent}`);
    const target = match
      .slice(1)
      .map((channel) => Number.parseInt(channel, 16));
    const zoom = Number(graph.getAttribute('data-g6-zoom'));
    if (!Number.isFinite(zoom)) throw new Error('无法读取 G6 缩放比例');

    const fullNodeWidth = 300;
    const fullHeaderHeight = 48;
    const detailButtonCenterInset = 24;
    let bestMatch;

    for (const canvas of graph.querySelectorAll('canvas')) {
      const bounds = canvas.getBoundingClientRect();
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context || !canvas.width || !canvas.height) continue;

      const pixels = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      const scaleX = bounds.width / canvas.width;
      const scaleY = bounds.height / canvas.height;
      const windowWidth = Math.round((fullNodeWidth * zoom) / scaleX);
      const windowHeight = Math.round((fullHeaderHeight * zoom) / scaleY);
      if (windowWidth > canvas.width || windowHeight > canvas.height) continue;

      const stride = canvas.width + 1;
      const sums = new Uint32Array(stride * (canvas.height + 1));
      for (let y = 1; y <= canvas.height; y += 1) {
        let rowMatches = 0;
        for (let x = 1; x <= canvas.width; x += 1) {
          const index = ((y - 1) * canvas.width + x - 1) * 4;
          if (
            pixels[index + 3] > 200 &&
            Math.abs(pixels[index] - target[0]) <= 3 &&
            Math.abs(pixels[index + 1] - target[1]) <= 3 &&
            Math.abs(pixels[index + 2] - target[2]) <= 3
          ) {
            rowMatches += 1;
          }
          sums[y * stride + x] = sums[(y - 1) * stride + x] + rowMatches;
        }
      }

      const step = Math.max(1, Math.round(2 / Math.min(scaleX, scaleY)));
      for (let y = 0; y <= canvas.height - windowHeight; y += step) {
        for (let x = 0; x <= canvas.width - windowWidth; x += step) {
          const right = x + windowWidth;
          const bottom = y + windowHeight;
          const matches =
            sums[bottom * stride + right] -
            sums[y * stride + right] -
            sums[bottom * stride + x] +
            sums[y * stride + x];
          if (!bestMatch || matches > bestMatch.matches) {
            bestMatch = {
              bounds,
              matches,
              scaleX,
              scaleY,
              windowHeight,
              windowWidth,
              x,
              y,
            };
          }
        }
      }
    }

    if (
      !bestMatch ||
      bestMatch.matches / (bestMatch.windowWidth * bestMatch.windowHeight) < 0.5
    ) {
      throw new Error('无法从真实 Canvas 定位选中节点的详情图标');
    }

    return {
      x:
        bestMatch.bounds.left +
        (bestMatch.x +
          bestMatch.windowWidth -
          (detailButtonCenterInset * zoom) / bestMatch.scaleX) *
          bestMatch.scaleX,
      y:
        bestMatch.bounds.top +
        (bestMatch.y + bestMatch.windowHeight / 2) * bestMatch.scaleY,
    };
  });

const showFullNodes = async (page) => {
  const zoomIn = page.locator('button[aria-label="Zoom in"]');
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if ((await readGraphDiagnostics(page)).compactNodeCount === 0) return;
    if ((await zoomIn.getAttribute('aria-disabled')) === 'true') break;
    await page.evaluate(() =>
      document.querySelector('.graph')?.removeAttribute('data-g6-last-action'),
    );
    await zoomIn.click();
    await waitForGraphAttribute(page, 'data-g6-last-action', 'zoom-in');
    await page.waitForTimeout(50);
  }
  throw new Error('无法将 ER 节点放大到完整模式');
};

const assertDetailIconInteraction = async (page) => {
  const fieldLabel = page
    .locator('.web-pdm-tree-label')
    .filter({ hasText: /^Field$/ })
    .first();
  await waitForNextGraphReady(page, () => fieldLabel.click());
  await page.evaluate(() =>
    document.querySelector('.graph')?.removeAttribute('data-g6-last-action'),
  );
  await fieldLabel.locator('..').locator('.tree-node-title-options').click();
  await page
    .locator('.web-pdm-menu-item')
    .filter({ hasText: 'Locate model' })
    .click();
  await waitForGraphAttribute(page, 'data-g6-last-action', 'focus-model');
  await showFullNodes(page);
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );

  let point;
  let locationError;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      point = await findSelectedDetailButton(page);
      break;
    } catch (error) {
      locationError = error;
      await page.waitForTimeout(100);
    }
  }
  if (!point) throw locationError;

  await page.mouse.move(point.x, point.y);
  await page.waitForFunction(
    () =>
      document.querySelector('.graph')?.getAttribute('title') ===
      'View details',
  );

  const dialogPromise = page
    .waitForEvent('dialog', { timeout: 15_000 })
    .then(async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      return message;
    });
  await page.mouse.click(point.x, point.y);
  const dialogMessage = await dialogPromise;
  if (!dialogMessage.includes('Field')) {
    throw new Error(`详情按钮打开了错误模型：${dialogMessage}`);
  }
};

const assertToolbarInteractions = async (page) => {
  const initial = await readGraphDiagnostics(page);
  if (
    initial.status !== 'ready' ||
    initial.version !== expectedG6Version ||
    !Number.isFinite(initial.zoom)
  ) {
    throw new Error(`工具栏测试前 G6 状态无效：${JSON.stringify(initial)}`);
  }

  const zoomIn = page.locator('button[aria-label="Zoom in"]');
  const zoomOut = page.locator('button[aria-label="Zoom out"]');
  const startsAtMaximum =
    (await zoomIn.getAttribute('aria-disabled')) === 'true';
  const firstZoom = startsAtMaximum
    ? { action: 'zoom-out', button: zoomOut }
    : { action: 'zoom-in', button: zoomIn };
  await firstZoom.button.click();
  await waitForGraphAttribute(page, 'data-g6-last-action', firstZoom.action);

  const reverseZoom = startsAtMaximum
    ? { action: 'zoom-in', button: zoomIn }
    : { action: 'zoom-out', button: zoomOut };
  await reverseZoom.button.click();
  await waitForGraphAttribute(page, 'data-g6-last-action', reverseZoom.action);

  const fitPreparation =
    (await zoomIn.getAttribute('aria-disabled')) === 'true'
      ? { action: 'zoom-out', button: zoomOut }
      : { action: 'zoom-in', button: zoomIn };
  await fitPreparation.button.click();
  await waitForGraphAttribute(
    page,
    'data-g6-last-action',
    fitPreparation.action,
  );
  await page.locator('button[aria-label="Fit view"]').click();
  await waitForGraphAttribute(page, 'data-g6-last-action', 'fit-view');

  const layoutButtonLabel =
    initial.layout === 'force'
      ? 'Switch to hierarchy layout'
      : 'Switch to relation layout';
  const layoutButton = page.locator(
    `button[aria-label="${layoutButtonLabel}"]`,
  );
  if ((await layoutButton.count()) !== 1) {
    throw new Error(`布局按钮文案与当前布局不一致：${initial.layout}`);
  }
  await layoutButton.click();
  const nextLayout = initial.layout === 'force' ? 'antv-dagre' : 'force';
  await waitForGraphAttribute(page, 'data-g6-layout', nextLayout);

  if (initial.minimap !== 'false') {
    throw new Error(`小地图初始状态应关闭：${JSON.stringify(initial)}`);
  }
  await page.locator('button[aria-label="Show minimap"]').click();
  await waitForGraphAttribute(page, 'data-g6-minimap', 'true');
  await page.locator('button[aria-label="Hide minimap"]').click();
  await waitForGraphAttribute(page, 'data-g6-minimap', 'false');

  const final = await readGraphDiagnostics(page);
  if (final.nodeCount !== 4 || final.edgeCount !== 5) {
    throw new Error(`工具栏操作改变了图数据：${JSON.stringify(final)}`);
  }
};

const assertColorPopover = async (page) => {
  await page.locator('button[aria-label="Open color panel"]').click();
  const popover = page.locator('.web-pdm-popover');
  await popover.waitFor({ state: 'visible' });
  const state = await popover.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return {
      bottom: bounds.bottom,
      hasColorInput: Boolean(element.querySelector('input[type="color"]')),
      left: bounds.left,
      right: bounds.right,
      top: bounds.top,
    };
  });
  if (
    !state.hasColorInput ||
    state.left < 0 ||
    state.top < 0 ||
    state.right > 1440 ||
    state.bottom > 1000
  ) {
    throw new Error(`颜色面板没有显示在可视区域内：${JSON.stringify(state)}`);
  }

  await page.keyboard.press('Escape');
  await popover.waitFor({ state: 'hidden' });

  await page.locator('button[aria-label="Open color panel"]').click();
  await popover.waitFor({ state: 'visible' });
  await page.locator('.graph').click({ position: { x: 8, y: 8 } });
  await popover.waitFor({ state: 'hidden' });

  await page.locator('button[aria-label="Open color panel"]').click();
  await popover.waitFor({ state: 'visible' });
  await page.locator('button[aria-label="Close color panel"]').click();
  await popover.waitFor({ state: 'hidden' });
};

const assertPngDownload = async (page, minimumBytes = 10_000) => {
  const before = await readGraphDiagnostics(page);
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30_000 }),
    page.locator('button[aria-label="Download image"]').click(),
  ]);
  const filename = download.suggestedFilename();
  if (!filename.toLowerCase().endsWith('.png')) {
    throw new Error(`导出文件不是 PNG：${filename}`);
  }
  const downloadPath = await download.path();
  if (!downloadPath) throw new Error('浏览器没有生成导出的 PNG 文件');
  const file = await stat(downloadPath);
  if (file.size <= minimumBytes) {
    throw new Error(`导出的 PNG 内容过小：${file.size} bytes`);
  }
  await waitForGraphAttribute(page, 'data-g6-export-status', 'complete');
  const after = await readGraphDiagnostics(page);
  if (after.compactNodeCount !== before.compactNodeCount) {
    throw new Error(
      `PNG 导出后节点细节状态没有恢复：${JSON.stringify({ before, after })}`,
    );
  }
};

const prepareCompactExport = async (page) => {
  const zoomOut = page.locator('button[aria-label="Zoom out"]');
  for (let index = 0; index < 10; index += 1) {
    const diagnostics = await readGraphDiagnostics(page);
    if (diagnostics.compactNodeCount === diagnostics.nodeCount) return;
    await page.evaluate(() =>
      document.querySelector('.graph')?.removeAttribute('data-g6-last-action'),
    );
    await zoomOut.click();
    await waitForGraphAttribute(page, 'data-g6-last-action', 'zoom-out');
  }
  await waitForGraphAttribute(page, 'data-g6-compact-node-count', '4');
};

const assertViewportFit = async (page, viewport) => {
  await page.setViewportSize(viewport);
  await page.evaluate(() => {
    const home = document.querySelector('.web-pdm-home');
    history.replaceState(null, '', `${location.pathname}${location.search}`);
    if (home) home.scrollTop = 0;
  });
  await page.waitForFunction(
    () => (document.querySelector('.web-pdm-home')?.scrollTop ?? Infinity) <= 1,
  );
  assertHome({
    ...(await inspectHome(page)),
    viewport: `${viewport.width}x${viewport.height}`,
  });
  await assertDemoAnchorScroll(page);
  await page.waitForFunction(
    () => {
      const graph = document.querySelector('.graph[data-g6-status="ready"]');
      if (!graph) return false;
      const canvas = graph.querySelector('canvas');
      const bounds = canvas?.getBoundingClientRect();
      const width = Number(graph.getAttribute('data-g6-width'));
      const height = Number(graph.getAttribute('data-g6-height'));
      return (
        bounds &&
        bounds.width > 0 &&
        bounds.height > 0 &&
        Math.abs(width - bounds.width) <= 2 &&
        Math.abs(height - bounds.height) <= 2
      );
    },
    undefined,
    { timeout: 30_000 },
  );

  const state = await page.evaluate(() => {
    const home = document.querySelector('.web-pdm-home');
    const wrapper = document.querySelector('.console-g6-page');
    const graph = document.querySelector('.graph');
    const toolbar = document.querySelector('.console-erd-toolbar');
    const canvases = [...(graph?.querySelectorAll('canvas') ?? [])];
    const bottomOverflow = (element) =>
      element
        ? Math.max(0, element.getBoundingClientRect().bottom - innerHeight)
        : Number.POSITIVE_INFINITY;
    return {
      canvasHeight: Math.max(
        0,
        ...canvases.map((canvas) => canvas.getBoundingClientRect().height),
      ),
      canvasWidth: Math.max(
        0,
        ...canvases.map((canvas) => canvas.getBoundingClientRect().width),
      ),
      graphBottomOverflow: bottomOverflow(graph),
      graphHeight: graph?.getBoundingClientRect().height ?? 0,
      graphWidth: graph?.getBoundingClientRect().width ?? 0,
      g6Height: Number(graph?.getAttribute('data-g6-height') ?? NaN),
      g6Width: Number(graph?.getAttribute('data-g6-width') ?? NaN),
      homeBottomOverflow: bottomOverflow(home),
      toolbarHorizontalOverflow: toolbar
        ? Math.max(0, toolbar.scrollWidth - toolbar.clientWidth)
        : Number.POSITIVE_INFINITY,
      wrapperBottomOverflow: bottomOverflow(wrapper),
    };
  });

  const failures = [];
  if (state.homeBottomOverflow > 1) failures.push('首页超过可视区高度');
  if (state.wrapperBottomOverflow > 1) failures.push('组件超过可视区高度');
  if (state.graphBottomOverflow > 1) failures.push('画布超过可视区高度');
  if (state.toolbarHorizontalOverflow > 1)
    failures.push('窄屏工具栏仍需要横向滚动');
  if (
    state.graphWidth <= 0 ||
    state.graphHeight <= 0 ||
    state.canvasWidth <= 0 ||
    state.canvasHeight <= 0
  ) {
    failures.push('响应式调整后画布尺寸无效');
  }
  if (
    Math.abs(state.g6Width - state.canvasWidth) > 2 ||
    Math.abs(state.g6Height - state.canvasHeight) > 2
  ) {
    failures.push('G6 resize 诊断尺寸没有与 Canvas 同步');
  }
  if (failures.length) {
    throw new Error(
      `${viewport.width}x${viewport.height} 高度/resize 验收失败：${failures.join('；')}\n${JSON.stringify(state)}`,
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
  const requestFailures = [];

  page.on('pageerror', (error) =>
    errors.push(
      `${new URL(page.url()).pathname}: ${error.stack ?? error.message}`,
    ),
  );
  page.on('console', (message) => {
    if (message.text().startsWith('[rsbuild] HMR update failed')) return;
    if (
      message
        .text()
        .startsWith('Canvas2D: Multiple readback operations using getImageData')
    )
      return;
    if (['error', 'warning'].includes(message.type())) {
      errors.push(`${new URL(page.url()).pathname}: ${message.text()}`);
    }
  });
  page.on('requestfailed', (request) => {
    requestFailures.push({
      errorText: request.failure()?.errorText ?? 'unknown',
      method: request.method(),
      url: request.url(),
    });
  });

  for (const route of [
    '/',
    '/guide/getting-started',
    '/demo/',
    '/demo/empty',
    '/demo/empty.html',
    '/config/',
    '/zh/',
    '/zh/guide/getting-started',
    '/zh/demo/',
    '/zh/demo/empty',
    '/zh/demo/empty.html',
    '/zh/config/',
  ]) {
    const response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: 'domcontentloaded',
    });
    if (!response?.ok()) throw new Error(`${route} 返回 ${response?.status()}`);
    if (
      [
        '/',
        '/demo/',
        '/demo/empty',
        '/demo/empty.html',
        '/zh/',
        '/zh/demo/',
        '/zh/demo/empty',
        '/zh/demo/empty.html',
      ].includes(route)
    ) {
      await page
        .locator('.graph[data-g6-status="ready"]')
        .waitFor({ state: 'visible', timeout: 30_000 });
    }
    console.log(`${route} ok`);
  }

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body.innerText.trim().length > 0);
  const homeText = await page.locator('body').innerText();
  if (!homeText.includes('0.4.0')) {
    throw new Error(
      `首页未显示版本号。页面内容：\n${homeText.slice(0, 500)}\n浏览器异常：\n${errors.join('\n')}`,
    );
  }
  assertHome(await inspectHome(page));
  if (
    (await page.locator('.web-pdm-home__star-source').textContent())?.trim() !==
    'Live via RepoStars'
  ) {
    throw new Error('英文首页的 Star 数据来源文案错误');
  }
  await assertDemoAnchorScroll(page);
  assertDiagram('/', await inspectDiagram(page), { nodes: 4, edges: 5 });
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

  await assertDetailIconInteraction(page);
  await assertToolbarInteractions(page);
  await assertColorPopover(page);
  await prepareCompactExport(page);
  await assertPngDownload(page);

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1365, height: 768 },
    { width: 390, height: 844 },
    { width: 320, height: 800 },
    { width: 320, height: 568 },
    { width: 844, height: 390 },
  ]) {
    await assertViewportFit(page, viewport);
  }
  await assertViewportFit(page, { width: 1440, height: 1000 });

  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForFunction(() => {
    const chart = document.querySelector('.web-pdm-home__star-image');
    return !chart || chart.getAttribute('src')?.includes('theme=dark');
  });
  await page.evaluate(() => document.documentElement.classList.remove('dark'));
  await page.waitForFunction(() => {
    const chart = document.querySelector('.web-pdm-home__star-image');
    return !chart || chart.getAttribute('src')?.includes('theme=minimal');
  });

  await page.locator('button[aria-label="Show minimap"]').click();
  await waitForGraphAttribute(page, 'data-g6-minimap', 'true');
  await page
    .locator('.web-pdm-minimap')
    .waitFor({ state: 'visible', timeout: 30_000 });
  await waitForNextGraphReady(page, () =>
    page.locator('.command-btn[aria-label="Switch to dark theme"]').click(),
  );
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
  const minimapBackground = await page
    .locator('.web-pdm-minimap')
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  if (minimapBackground === 'rgb(255, 255, 255)') {
    throw new Error('暗色主题的小地图仍使用白色背景');
  }
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
  if (
    !chineseHomeText.includes(
      '一个用G6做的ER图工具，最终目标是想做成在线版的 powerdesigner',
    )
  ) {
    throw new Error('中文首页没有恢复原始 slogan');
  }
  assertHome(await inspectHome(page));
  if (
    (await page.locator('.web-pdm-home__star-source').textContent())?.trim() !==
    'RepoStars 实时数据'
  ) {
    throw new Error('中文首页的 Star 数据来源没有完成国际化');
  }
  await assertDemoAnchorScroll(page);
  assertDiagram('/zh/', await inspectDiagram(page), { nodes: 4, edges: 5 });
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
  assertDiagram('/demo/', await inspectDiagram(page), {
    nodes: 46,
    edges: 27,
  });
  const englishDemoNavigation = await page
    .locator('.console-models-tree')
    .innerText();
  if (/[\u3400-\u9fff]/u.test(englishDemoNavigation)) {
    throw new Error('英文完整示例仍显示中文模型数据');
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  const demoBottomOverflow = await page
    .locator('.console-g6-page-demo')
    .evaluate((element) =>
      Math.max(0, element.getBoundingClientRect().bottom - innerHeight),
    );
  if (demoBottomOverflow > 1) {
    throw new Error(`完整示例超出首屏：${demoBottomOverflow}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });

  await page.goto(`${baseUrl}/demo/empty`, {
    waitUntil: 'domcontentloaded',
  });
  await page
    .locator('.graph[data-g6-status="ready"]')
    .waitFor({ state: 'visible', timeout: 30_000 });
  const empty = await readGraphDiagnostics(page);
  if (
    empty.version !== expectedG6Version ||
    empty.nodeCount !== 0 ||
    empty.edgeCount !== 0 ||
    (await page.locator('.g6-modelnavi').count()) !== 0
  ) {
    throw new Error(`空图状态错误：${JSON.stringify(empty)}`);
  }
  await assertPngDownload(page, 500);

  await page.goto(`${baseUrl}/~demos/docs-erd`, {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForURL(`${baseUrl}/demo/`);
  await page
    .locator('.graph[data-g6-status="ready"]')
    .waitFor({ state: 'visible', timeout: 30_000 });

  for (const route of [
    '/guide/',
    '/guide/index.html',
    '/zh/guide/',
    '/zh/guide/index.html',
  ]) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    const sidebarItems = page.locator('.rp-doc-layout__sidebar a[href]');
    await sidebarItems.first().waitFor({ state: 'visible' });
    const sidebarWidth = await inspectVisibleSidebarWidth(page);
    const sidebarLinks = await sidebarItems.count();
    if (sidebarWidth < 180 || sidebarLinks < 7) {
      throw new Error(
        `${route} 应显示有效指南菜单，实际宽度 ${sidebarWidth}px / ${sidebarLinks} 项`,
      );
    }
  }

  for (const route of [
    '/demo/',
    '/demo/empty',
    '/demo/empty.html',
    '/config/',
    '/zh/demo/',
    '/zh/demo/empty',
    '/zh/demo/empty.html',
    '/zh/config/',
  ]) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    if ((await inspectVisibleSidebarWidth(page)) > 0)
      throw new Error(`${route} 没有菜单项时仍显示空侧栏`);
  }

  for (const route of ['/demo/empty.html', '/zh/demo/empty.html']) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    if ((await inspectVisibleDocChromeWidth(page)) > 0) {
      throw new Error(`${route} 仍显示空白文档侧栏或目录`);
    }
  }

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.locator('.web-pdm-home__star-image').evaluate((image) => {
    image.dispatchEvent(new Event('error', { bubbles: true }));
  });
  await page
    .locator('.web-pdm-home__star-fallback')
    .waitFor({ state: 'visible' });
  assertHome(await inspectHome(page));

  errors.push(
    ...requestFailures
      .filter(({ errorText }) => errorText !== 'net::ERR_ABORTED')
      .filter(
        ({ url }) => !url.startsWith('https://www.repostars.dev/api/embed'),
      )
      .map(
        ({ errorText, method, url }) =>
          `资源请求失败：${method} ${url} (${errorText})`,
      ),
  );
  if (errors.length > 0)
    throw new Error(`浏览器控制台异常：\n${errors.join('\n')}`);
  console.log('browser smoke ok');
} finally {
  await browser?.close();
  stopServer();
}
