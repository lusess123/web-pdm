import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ToolBar from '../components/model-toolbar';
import { useMst } from '../context';
import registerGraphExtensions from './item';
import './model.scss';
import { ErdGraphRuntime } from './runtime';

type ElementSize = { height: number; width: number };

const useElementSize = (element: HTMLElement | null) => {
  const [size, setSize] = useState<ElementSize>();

  useEffect(() => {
    if (!element) return;
    const update = () => {
      const next = {
        height: element.clientHeight,
        width: element.clientWidth,
      };
      setSize((current) =>
        current?.height === next.height && current.width === next.width
          ? current
          : next,
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return size;
};

export default observer(() => {
  const { runtime, setContainer } = useGraphRuntime();

  return (
    <>
      <ToolBar graph={runtime} />
      <div ref={setContainer} className="graph" />
    </>
  );
});

const useGraphRuntime = () => {
  const root = useMst();
  const [container, setContainerState] = useState<HTMLDivElement | null>(null);
  const [runtime, setRuntime] = useState<ErdGraphRuntime | null>(null);
  const runtimeRef = useRef<ErdGraphRuntime | undefined>(undefined);
  const dataVersionRef = useRef('');
  const structureRef = useRef('');
  const themeVersionRef = useRef('');
  const size = useElementSize(container);

  const compactLevel =
    root.graph.zoom <= 0.1 ? 2 : root.graph.zoom <= 0.4 ? 1 : 0;
  const checkedKeys = root.sys.checkedKeys.join('|');
  const dataVersion = [
    checkedKeys,
    root.sys.currentModel,
    root.sys.showNameOrLabel,
    root.sys.intl,
    root.Ui.darkness,
    root.Ui.themeColor,
    compactLevel,
    root.Models.size,
    root.Fields.size,
  ].join('::');
  const themeVersion = `${root.Ui.darkness}:${root.Ui.themeColor}`;
  const nodes = root.Nodes;
  const edges = root.edges;
  const structure = `${nodes.map((node) => node.id).join('|')}::${edges
    .map((edge) => edge.id ?? `${edge.source}-${edge.target}`)
    .join('|')}`;

  const setContainer = useCallback((element: HTMLDivElement | null) => {
    setContainerState(element);
  }, []);

  useEffect(() => {
    if (!container) return;
    registerGraphExtensions();
    const created = new ErdGraphRuntime(container, root, nodes, edges);
    runtimeRef.current = created;
    dataVersionRef.current = dataVersion;
    structureRef.current = structure;
    themeVersionRef.current = themeVersion;
    root.graph.setRuntime(created);
    setRuntime(created);
    void created.render();

    return () => {
      created.destroy();
      if (runtimeRef.current === created) runtimeRef.current = undefined;
      root.graph.setRuntime(undefined);
      setRuntime(null);
    };
  }, [container]);

  useEffect(() => {
    const current = runtimeRef.current;
    if (!current || dataVersionRef.current === dataVersion) return;
    const relayout = structureRef.current !== structure;
    dataVersionRef.current = dataVersion;
    structureRef.current = structure;
    void current.replaceData(nodes, edges, { relayout });
  }, [dataVersion, structure]);

  useEffect(() => {
    if (runtimeRef.current && size?.width && size.height) {
      void runtimeRef.current.resize(size.width, size.height);
    }
  }, [size?.height, size?.width]);

  useEffect(() => {
    void runtimeRef.current?.setLayout(root.sys.dagreLayout);
  }, [root.sys.dagreLayout]);

  useEffect(() => {
    void runtimeRef.current?.setMinimap(root.sys.disableMiniMap);
  }, [root.sys.disableMiniMap]);

  useEffect(() => {
    if (!runtimeRef.current || themeVersionRef.current === themeVersion) return;
    themeVersionRef.current = themeVersion;
    void runtimeRef.current.updateTheme();
  }, [themeVersion]);

  return { runtime, setContainer };
};
