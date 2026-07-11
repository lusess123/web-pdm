import { getRoot, model, Model, modelAction, prop } from 'mobx-keystone';
import { normalizeLocale, type LocaleInput } from '../intl';
import { FieldConfig, ModelConfig } from './config';
import { RootInstance } from './index';

export const resolveModelNavigationVisibility = (
  preference: boolean | undefined,
  modelCount: number,
  moduleCount: number,
) => (modelCount > 0 || moduleCount > 0) && preference !== false;

@model('webpdm/TSys')
export class TSys extends Model({
  search: prop(''),
  layouting: prop(false),
  isArrangeLayout: prop(false),
  expandedKeys: prop<string[]>(() => []),
  currentModel: prop(''),
  currentModule: prop(''),
  checkedKeys: prop<string[]>(() => []),
  showNameOrLabel: prop(false),
  tabOrTree: prop(false),
  snapshot: prop(true),
  height: prop<number | undefined | string>('100%'),
  showModelNavigation: prop<boolean | undefined>(undefined),
  dagreLayout: prop(false),
  intl: prop<LocaleInput>('en'),
  disableMiniMap: prop(false),
  onlyMode: prop(false),
  // undoData: prop<UndoStore>(() => new UndoStore({})),
}) {
  onIgnoreEdge?: (filed: FieldConfig) => boolean;
  onModelDetail?: (model: ModelConfig) => void;

  setOnIgnoreEdge(onIgnoreEdge?: (field: FieldConfig) => boolean) {
    this.onIgnoreEdge = onIgnoreEdge;
  }

  setOnModelDetail(onModelDetail?: (model: ModelConfig) => void) {
    this.onModelDetail = onModelDetail;
  }

  @modelAction
  setHeight(height: number | string) {
    this.height = height;
  }

  @modelAction
  setIntl(locale?: LocaleInput | string) {
    this.intl = normalizeLocale(locale);
  }

  @modelAction
  setShowModelNavigation(showModelNavigation?: boolean) {
    this.showModelNavigation = showModelNavigation;
  }

  @modelAction
  setOnlyMode(onlyMode?: boolean) {
    this.onlyMode = onlyMode ?? false;
  }

  @modelAction
  toggleArrangeLayout() {
    this.isArrangeLayout = !this.isArrangeLayout;
  }
  @modelAction
  setExpandedKeys = (keys: string[]) => {
    this.expandedKeys = keys;
  };

  @modelAction
  setCheckedKeys = (keys: string[]) => {
    this.checkedKeys = keys;
  };
  @modelAction
  setDisableMiniMap(disableMiniMap: boolean) {
    this.disableMiniMap = disableMiniMap;
  }

  @modelAction
  setCurrentModel(keys: string[]) {
    const newKey = keys.length > 1 ? keys[1] : keys[0];
    const root: RootInstance = getRoot(this);
    root.graph.frontModel(newKey);
    root.graph.actionEdges(newKey);
    this.currentModel = newKey;
  }

  @modelAction
  centerCurrentModel(keys: string[]) {
    const newKey = keys.length > 1 ? keys[1] : keys[0];
    this.currentModel = newKey;
    const root: RootInstance = getRoot(this);
    root.graph.focusModel(newKey);
    root.graph.actionEdges(newKey);
  }

  @modelAction
  openModel(key: string) {
    const root: RootInstance = getRoot(this);
    const model = root.graph.getModelConfig(key);
    if (model && this.onModelDetail) this.onModelDetail(model);
  }

  @modelAction
  toggleTabOrTree = () => {
    this.tabOrTree = !this.tabOrTree;
  };
  @modelAction
  changeModuleValue = (module: string) => {
    this.currentModule = module;
  };
  @modelAction
  setSearch = (search: string) => {
    // alert(search)
    this.search = search;
  };
  @modelAction
  toggleShowNameOrLabel = () => {
    this.showNameOrLabel = !this.showNameOrLabel;
  };

  onInit() {
    // alert('sys onInit')
    // alert(this.tabOrTree)
    this.toggleShowNameOrLabel = this.toggleShowNameOrLabel.bind(this);
  }
  @modelAction
  setDagreLayout(dagreLayout: boolean) {
    this.dagreLayout = dagreLayout;
  }
}
