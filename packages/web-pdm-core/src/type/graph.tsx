import { getRoot, model, Model, modelAction, prop } from 'mobx-keystone';
import type { ErdGraphRuntime } from '../graph/runtime';
import type { RootInstance } from './index';

@model('webpdm/TGraph')
export class TGraph extends Model({
  zoom: prop(1),
}) {
  runtime?: ErdGraphRuntime;

  get G6Graph() {
    return this.runtime?.graph;
  }

  setRuntime(runtime?: ErdGraphRuntime) {
    this.runtime = runtime;
  }

  @modelAction
  setZoom(zoom: number) {
    this.zoom = zoom;
  }

  minZoom() {
    void this.runtime?.zoomOut();
  }

  maxZoom() {
    void this.runtime?.zoomIn();
  }

  container() {
    void this.runtime?.fitView();
  }

  downAsImage() {
    if (!this.runtime) return;
    const root = getRoot<RootInstance>(this);
    void this.runtime.exportImage(root.intl('graph.downloadFileName'));
  }

  focusModel(modelId: string) {
    void this.runtime?.focusModel(modelId);
  }

  frontModel(modelId: string) {
    void this.runtime?.frontModel(modelId);
  }

  getModelConfig(modelId: string) {
    return this.runtime?.getModelConfig(modelId);
  }

  actionEdges(currentModel: string) {
    void this.runtime?.highlightModel(currentModel);
  }
}
