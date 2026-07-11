const enMessages = {
  'navigation.locateModel': 'Locate model',
  'navigation.searchPlaceholder': 'Search models',
  'navigation.viewDetails': 'View details',
  'navigation.allModules': 'All',
  'navigation.selectAll': 'Select all',
  'navigation.clearAll': 'Clear all',
  'navigation.showName': 'Show names',
  'navigation.showLabel': 'Show labels',
  'navigation.categoryMode': 'Category mode',
  'navigation.treeMode': 'Tree mode',
  'input.clear': 'Clear search',
  'toolbar.initializing': 'Initializing…',
  'toolbar.undo': 'Undo',
  'toolbar.redo': 'Redo',
  'toolbar.zoomIn': 'Zoom in',
  'toolbar.zoomOut': 'Zoom out',
  'toolbar.fitView': 'Fit view',
  'toolbar.showMinimap': 'Show minimap',
  'toolbar.hideMinimap': 'Hide minimap',
  'toolbar.refreshData': 'Refresh data',
  'toolbar.downloadImage': 'Download image',
  'toolbar.switchToHierarchyLayout': 'Switch to hierarchy layout',
  'toolbar.switchToRelationLayout': 'Switch to relation layout',
  'toolbar.toggleBackground': 'Toggle background',
  'toolbar.switchToDarkTheme': 'Switch to dark theme',
  'toolbar.switchToLightTheme': 'Switch to light theme',
  'toolbar.chooseColor': 'Choose color',
  'toolbar.openColorPanel': 'Open color panel',
  'toolbar.closeColorPanel': 'Close color panel',
  'tree.moreActions': 'More actions',
  'tree.collapse': 'Collapse',
  'tree.expand': 'Expand',
  'graph.aggregateRelation': 'Aggregate relation',
  'graph.viewDetails': 'View details',
  'graph.lookupRelation': 'Lookup',
  'graph.fieldRelationTooltip':
    'Relation from {source} to {target}.{field} ({relationType})',
  'graph.relationTooltip':
    'Relation from {source} to {target} ({relationType})',
  'graph.downloadFileName': 'model-diagram',
} as const;

export type IntlKey = keyof typeof enMessages;
export type Locale = 'en' | 'zh-CN';
export type LegacyLocale = 'EN' | 'CH';
export type LocaleInput = Locale | LegacyLocale;
export type IntlParams = Record<string, string | number>;
export type IntlOverride = (text: string) => string;

const zhCNMessages: Record<IntlKey, string> = {
  'navigation.locateModel': '定位模型',
  'navigation.searchPlaceholder': '搜索模型',
  'navigation.viewDetails': '查看详情',
  'navigation.allModules': '全部',
  'navigation.selectAll': '全选',
  'navigation.clearAll': '清除全选',
  'navigation.showName': '显示名称',
  'navigation.showLabel': '显示标签',
  'navigation.categoryMode': '分类模式',
  'navigation.treeMode': '树形模式',
  'input.clear': '清除搜索',
  'toolbar.initializing': '正在初始化…',
  'toolbar.undo': '撤销',
  'toolbar.redo': '重做',
  'toolbar.zoomIn': '放大',
  'toolbar.zoomOut': '缩小',
  'toolbar.fitView': '适应画布',
  'toolbar.showMinimap': '显示小地图',
  'toolbar.hideMinimap': '隐藏小地图',
  'toolbar.refreshData': '刷新数据',
  'toolbar.downloadImage': '下载图片',
  'toolbar.switchToHierarchyLayout': '切换为层次布局',
  'toolbar.switchToRelationLayout': '切换为关联布局',
  'toolbar.toggleBackground': '切换背景',
  'toolbar.switchToDarkTheme': '切换到黑暗主题',
  'toolbar.switchToLightTheme': '切换到明亮主题',
  'toolbar.chooseColor': '选择颜色',
  'toolbar.openColorPanel': '打开颜色面板',
  'toolbar.closeColorPanel': '关闭颜色面板',
  'tree.moreActions': '更多操作',
  'tree.collapse': '收起',
  'tree.expand': '展开',
  'graph.aggregateRelation': '聚合关系',
  'graph.viewDetails': '查看详情',
  'graph.lookupRelation': '查找',
  'graph.fieldRelationTooltip':
    '从 {source} 到 {target}.{field} 的 {relationType} 关系',
  'graph.relationTooltip': '从 {source} 到 {target} 的 {relationType} 关系',
  'graph.downloadFileName': '模型图',
};

export const messages: Readonly<
  Record<Locale, Readonly<Record<IntlKey, string>>>
> = {
  en: enMessages,
  'zh-CN': zhCNMessages,
};

const legacyTextByKey: Record<IntlKey, string> = {
  'navigation.locateModel': '定位模型',
  'navigation.searchPlaceholder': '搜索模型',
  'navigation.viewDetails': '查看',
  'navigation.allModules': '所有',
  'navigation.selectAll': '选择所有',
  'navigation.clearAll': '清除所有',
  'navigation.showName': '显示名称',
  'navigation.showLabel': '显示标签',
  'navigation.categoryMode': '分类模式',
  'navigation.treeMode': '树形模式',
  'input.clear': '清除搜索',
  'toolbar.initializing': '正在初始化中',
  'toolbar.undo': '撤销',
  'toolbar.redo': '重做',
  'toolbar.zoomIn': '放大',
  'toolbar.zoomOut': '缩小',
  'toolbar.fitView': '全景',
  'toolbar.showMinimap': '显示小地图',
  'toolbar.hideMinimap': '屏蔽小地图',
  'toolbar.refreshData': '刷新数据',
  'toolbar.downloadImage': '下载图片',
  'toolbar.switchToHierarchyLayout': '切换层次布局',
  'toolbar.switchToRelationLayout': '切换关联布局',
  'toolbar.toggleBackground': '切换底色',
  'toolbar.switchToDarkTheme': '切换底色',
  'toolbar.switchToLightTheme': '切换底色',
  'toolbar.chooseColor': '选择颜色',
  'toolbar.openColorPanel': '打开颜色面板',
  'toolbar.closeColorPanel': '关闭颜色面板',
  'tree.moreActions': '更多操作',
  'tree.collapse': '收起',
  'tree.expand': '展开',
  'graph.aggregateRelation': '聚合关系',
  'graph.viewDetails': '查看',
  'graph.lookupRelation': '查找',
  'graph.fieldRelationTooltip': '关系',
  'graph.relationTooltip': '关系',
  'graph.downloadFileName': '模型图',
};

const legacySegmentsByKey: Partial<Record<IntlKey, readonly string[]>> = {
  'navigation.showName': ['显示', '名称'],
  'navigation.showLabel': ['显示', '标签'],
  'navigation.categoryMode': ['分类', '模式'],
  'navigation.treeMode': ['树形', '模式'],
  'toolbar.openColorPanel': ['点击', '打开', '颜色面板'],
  'toolbar.closeColorPanel': ['点击', '关闭', '颜色面板'],
};

export const normalizeLocale = (locale?: LocaleInput | string): Locale =>
  locale === 'zh-CN' || locale === 'CH' ? 'zh-CN' : 'en';

export const formatMessage = (message: string, params?: IntlParams): string =>
  message.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
    const value = params?.[name];
    return value === undefined ? placeholder : String(value);
  });

export const translate = (
  locale: LocaleInput | string | undefined,
  key: IntlKey,
  params?: IntlParams,
): string => formatMessage(messages[normalizeLocale(locale)][key], params);

const joinLegacySegments = (key: IntlKey, segments: string[]): string => {
  if (key === 'navigation.categoryMode' || key === 'navigation.treeMode') {
    return segments.join(' ');
  }
  if (key === 'toolbar.openColorPanel' || key === 'toolbar.closeColorPanel') {
    return `${segments[0]}${segments[1]} ${segments[2]}`;
  }
  return segments.join('');
};

const translateLegacyMessage = (
  key: IntlKey,
  onIntl: IntlOverride,
): string | undefined => {
  const sourceSegments = legacySegmentsByKey[key] ?? [legacyTextByKey[key]];
  const translatedSegments = sourceSegments.map((segment) => onIntl(segment));
  const hasCompleteTranslation = translatedSegments.every(
    (translation, index) =>
      Boolean(translation) && translation !== sourceSegments[index],
  );

  return hasCompleteTranslation
    ? joinLegacySegments(key, translatedSegments)
    : undefined;
};

export const translateWithOverride = (
  locale: LocaleInput | string | undefined,
  key: IntlKey,
  params?: IntlParams,
  onIntl?: IntlOverride,
): string => {
  const semanticTranslation = onIntl?.(key);
  if (semanticTranslation && semanticTranslation !== key) {
    return formatMessage(semanticTranslation, params);
  }

  if (onIntl) {
    const legacyTranslation = translateLegacyMessage(key, onIntl);
    if (legacyTranslation) return formatMessage(legacyTranslation, params);
  }

  return translate(locale, key, params);
};
