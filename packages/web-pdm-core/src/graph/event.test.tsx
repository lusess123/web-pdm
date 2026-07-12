import { describe, expect, it, vi } from 'vitest';
import type { RootInstance } from '../type';
import { bindGraphEvents } from './event';
import { NodeEvent, type Graph, type IElementEvent } from './g6';

type EventHandler = (event: IElementEvent) => void;

const setup = () => {
  const handlers = new Map<string, EventHandler>();
  const graph = {
    on: vi.fn((event: string, handler: EventHandler) => {
      handlers.set(event, handler);
    }),
  } as unknown as Graph;
  const root = {
    arrangeShow: vi.fn(),
    sys: {
      centerCurrentModel: vi.fn(),
      openModel: vi.fn(),
      setCurrentModel: vi.fn(),
    },
  } as unknown as RootInstance;
  const container = {
    dataset: {},
    removeAttribute: vi.fn(),
    style: {},
    title: '',
  } as unknown as HTMLElement;

  const onNodeDragEnd = vi.fn();
  bindGraphEvents(graph, root, container, () => false, onNodeDragEnd);
  return { container, handlers, onNodeDragEnd, root };
};

const createShape = (attributes: Record<string, unknown>) => ({
  getAttribute: (name: string) => attributes[name],
  setAttribute: vi.fn(),
});

describe('graph detail action', () => {
  it('opens model detail without selecting the node', () => {
    const { handlers, root } = setup();
    const click = handlers.get(NodeEvent.CLICK);

    click?.({
      originalTarget: createShape({ action: 'modelEdit' }),
      target: { id: 'model-user' },
    } as unknown as IElementEvent);

    expect(root.sys.openModel).toHaveBeenCalledOnce();
    expect(root.sys.openModel).toHaveBeenCalledWith('user');
    expect(root.sys.setCurrentModel).not.toHaveBeenCalled();
    expect(root.arrangeShow).not.toHaveBeenCalled();
  });

  it('uses the localized detail label as the icon tooltip', () => {
    const { container, handlers } = setup();
    const pointerMove = handlers.get(NodeEvent.POINTER_MOVE);

    pointerMove?.({
      originalTarget: createShape({ tooltip: '查看详情' }),
    } as unknown as IElementEvent);

    expect(container.title).toBe('查看详情');
  });
});

describe('graph relation ports', () => {
  it('refreshes relation ports after a model is dragged', () => {
    const { handlers, onNodeDragEnd } = setup();

    handlers.get(NodeEvent.DRAG_END)?.({} as IElementEvent);

    expect(onNodeDragEnd).toHaveBeenCalledOnce();
  });
});
