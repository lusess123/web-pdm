import type { RootInstance } from '../type';
import {
  CanvasEvent,
  GraphEvent,
  NodeEvent,
  type Graph,
  type IElementEvent,
} from './g6';

type InteractiveShape = {
  getAttribute: (name: string) => unknown;
  setAttribute: (name: string, value: unknown) => void;
};

const readShapeAttribute = (
  shape: InteractiveShape,
  ...names: string[]
): unknown => {
  for (const name of names) {
    const value = shape.getAttribute(name);
    if (value !== undefined) return value;
  }
  return undefined;
};

export const bindGraphEvents = (
  graph: Graph,
  root: RootInstance,
  container: HTMLElement,
  isDisposed: () => boolean,
) => {
  let hoveredShape: InteractiveShape | undefined;
  let hoveredFill: unknown;

  const restoreHoveredShape = () => {
    if (hoveredShape && hoveredFill !== undefined) {
      hoveredShape.setAttribute('fill', hoveredFill);
    }
    hoveredShape = undefined;
    hoveredFill = undefined;
  };

  graph.on(GraphEvent.AFTER_TRANSFORM, () => {
    if (!graph.rendered || graph.destroyed || isDisposed()) return;
    root.graph.setZoom(graph.getZoom());
    container.dataset.g6Zoom = graph.getZoom().toFixed(4);
  });

  graph.on(CanvasEvent.DRAG_START, () => {
    if (isDisposed()) return;
    container.style.cursor = 'grabbing';
  });

  graph.on(CanvasEvent.DRAG_END, () => {
    if (isDisposed()) return;
    container.style.cursor = 'grab';
  });

  graph.on(NodeEvent.CLICK, (event: IElementEvent) => {
    if (isDisposed()) return;
    const nodeId = event.target.id;
    if (!nodeId.startsWith('model-') || nodeId === 'model-SYS-CENTER-POINT')
      return;

    const shape = event.originalTarget as InteractiveShape;
    const action = readShapeAttribute(shape, 'action', 'dataAction');
    const actionArg = readShapeAttribute(shape, 'actionArg', 'dataActionArg');
    const modelId = nodeId.slice('model-'.length);

    if (action === 'modelEdit') {
      root.sys.openModel(modelId);
      return;
    }

    if (action === 'arrangeShow' && typeof actionArg === 'string') {
      root.arrangeShow(actionArg);
      return;
    }

    if (action === 'focusRelation') {
      const relationId =
        typeof actionArg === 'string'
          ? actionArg
          : (actionArg as { relationModel?: { id?: string } } | undefined)
              ?.relationModel?.id;
      if (relationId) root.sys.centerCurrentModel([relationId]);
      return;
    }

    root.sys.setCurrentModel([modelId]);
  });

  graph.on(NodeEvent.POINTER_MOVE, (event: IElementEvent) => {
    if (isDisposed()) return;
    const shape = event.originalTarget as InteractiveShape;
    const fieldName = readShapeAttribute(shape, 'fieldName', 'dataFieldName');
    if (!fieldName || shape === hoveredShape) return;

    restoreHoveredShape();
    const fill = shape.getAttribute('fill');
    if (fill === undefined) return;
    hoveredShape = shape;
    hoveredFill = fill;
    shape.setAttribute('fill', root.Ui.palette.accent);
  });

  graph.on(NodeEvent.POINTER_OUT, () => {
    if (!isDisposed()) restoreHoveredShape();
  });
};
