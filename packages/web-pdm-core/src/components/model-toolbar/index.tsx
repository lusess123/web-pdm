import { observer } from 'mobx-react';
import React, {
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMst } from '../../context';
import type { ErdGraphRuntime } from '../../graph/runtime';
import { createThemeCssVariables } from '../../theme';
import { CreateComponent } from '../../util';

// import StateStack from '../../state-stack'
// import { undoManager } from '../../context'
//<SnippetsOutlined />
//<Snip/** @type {*} */

// type TIconRenders = typeof IconRenders
// export type TIconRendersKeys = keyof TIconRenders

export default observer(({ graph }: { graph: ErdGraphRuntime | null }) => {
  const mst = useMst();
  const intl = mst.intl;
  const undoManager = mst.undoManager;
  const { Tooltip, Popover } = mst.Ui as any;
  const _IconRenders: any = { ...mst.Ui.IconRenders };
  const webPdmUi = {
    style: createThemeCssVariables(mst.Ui.palette),
    t: mst.intl,
    theme: mst.Ui.theme,
  };

  const [colorPabel, setColorPabel] = useState(false);
  const colorFrame = useRef<number | undefined>(undefined);
  useEffect(
    () => () => {
      if (colorFrame.current) cancelAnimationFrame(colorFrame.current);
    },
    [],
  );
  const setColor = useCallback(
    (color: string) => {
      if (colorFrame.current) cancelAnimationFrame(colorFrame.current);
      colorFrame.current = requestAnimationFrame(() =>
        mst.Ui.setThemeColor(color),
      );
    },
    [mst.Ui],
  );

  const zoomNum = graph ? Math.round(mst.graph.zoom * 10_000) / 100 : 0;

  if (!graph)
    return (
      <div className="console-erd-toolbar">{intl('toolbar.initializing')}</div>
    );

  return (
    <div className="console-erd-toolbar">
      <div className="right">
        <ButtonActon
          IconRenders={_IconRenders}
          key={1}
          Tooltip={Tooltip}
          title={intl('toolbar.undo')}
          color={
            mst.Ui.darkness && undoManager.canUndo
              ? mst.Ui.themeColor
              : undefined
          }
          disable={!undoManager.canUndo}
          icon="undo"
          onClick={mst.undo.bind(mst)}
        />
        <ButtonActon
          IconRenders={_IconRenders}
          key={2}
          Tooltip={Tooltip}
          title={intl('toolbar.redo')}
          color={
            mst.Ui.darkness && undoManager.canRedo
              ? mst.Ui.themeColor
              : undefined
          }
          disable={!undoManager.canRedo}
          icon="redo"
          onClick={mst.redo.bind(mst)}
        />
        <ButtonActon
          IconRenders={_IconRenders}
          key={3}
          Tooltip={Tooltip}
          title={intl('toolbar.zoomIn')}
          color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
          disable={zoomNum >= 210}
          icon="max"
          onClick={() => mst.graph.maxZoom()}
        />
        <span className="zoomNum noselect">
          {graph && `${Math.min(zoomNum, 210)}%`}
        </span>
        <ButtonActon
          IconRenders={_IconRenders}
          key={4}
          Tooltip={Tooltip}
          title={intl('toolbar.zoomOut')}
          color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
          disable={zoomNum < 5}
          icon="min"
          onClick={() => mst.graph.minZoom()}
        />
        <ButtonActon
          IconRenders={_IconRenders}
          key={5}
          Tooltip={Tooltip}
          title={intl('toolbar.fitView')}
          color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
          icon="full"
          onClick={() => mst.graph.container()}
        />
        <ButtonActon
          IconRenders={_IconRenders}
          key={6}
          Tooltip={Tooltip}
          title={intl(
            !mst.sys.disableMiniMap
              ? 'toolbar.showMinimap'
              : 'toolbar.hideMinimap',
          )}
          color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
          icon={mst.sys.disableMiniMap ? 'miniMap' : 'miniMapNo'}
          onClick={mst.sys.setDisableMiniMap.bind(
            mst.sys,
            !mst.sys.disableMiniMap,
          )}
        />
        <ButtonActon
          IconRenders={_IconRenders}
          key={7}
          Tooltip={Tooltip}
          title={intl('toolbar.refreshData')}
          color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
          icon="reload"
          onClick={mst.reload.bind(mst)}
        />
        <ButtonActon
          IconRenders={_IconRenders}
          key={8}
          Tooltip={Tooltip}
          title={intl('toolbar.downloadImage')}
          color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
          icon="image"
          onClick={() => mst.graph.downAsImage()}
        />
        <ButtonActon
          IconRenders={_IconRenders}
          key={9}
          Tooltip={Tooltip}
          title={
            mst.sys.dagreLayout
              ? intl('toolbar.switchToRelationLayout')
              : intl('toolbar.switchToHierarchyLayout')
          }
          icon={!mst.sys.dagreLayout ? 'dagreLayout' : 'relationLayout'}
          color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
          onClick={mst.sys.setDagreLayout.bind(mst.sys, !mst.sys.dagreLayout)}
        />
        <ButtonActon
          IconRenders={_IconRenders}
          key={10}
          Tooltip={Tooltip}
          title={intl(
            mst.Ui.darkness
              ? 'toolbar.switchToLightTheme'
              : 'toolbar.switchToDarkTheme',
          )}
          icon={mst.Ui.darkness ? 'light' : 'darkness'}
          color={mst.Ui.darkness ? mst.Ui.themeColor : undefined}
          onClick={mst.Ui.setTheme.bind(
            mst.Ui,
            mst.Ui.darkness ? 'light' : 'dark',
          )}
        />
        <Popover
          placement="rightTop"
          arrowPointAtCenter
          footer={null}
          content={
            <input
              aria-label={intl('toolbar.chooseColor')}
              type="color"
              value={
                /^#[0-9a-f]{6}$/i.test(mst.Ui.themeColor)
                  ? mst.Ui.themeColor
                  : mst.Ui.palette.accent
              }
              onChange={(event) => setColor(event.target.value)}
            />
          }
          visible={colorPabel}
          onOpenChange={setColorPabel}
          webPdmUi={webPdmUi}
        >
          <ButtonActon
            IconRenders={_IconRenders}
            Tooltip={Tooltip}
            title={intl(
              colorPabel ? 'toolbar.closeColorPanel' : 'toolbar.openColorPanel',
            )}
            color={mst.Ui.themeColor}
            icon={colorPabel ? 'colorClose' : 'colorOpen'}
            onClick={setColorPabel.bind(null, !colorPabel)}
          />
        </Popover>
      </div>
    </div>
  );
});

type IButtonActon = {
  title: string;
  icon: string | React.ReactNode;
  onClick?: () => void;
  disable?: boolean;
  Tooltip: any;
  color?: string;
  IconRenders: Record<string, React.ReactNode>;
};

const ButtonActon = CreateComponent<IButtonActon>({
  render: (props) => {
    const mst = useMst();
    // const disableIcons = mst.Ui.disableIcons.reduce((pre, cur) => ({ ...pre, [cur]: true }), {})

    const { Tooltip } = props;
    const webPdmUi = {
      style: createThemeCssVariables(mst.Ui.palette),
      t: mst.intl,
      theme: mst.Ui.theme,
    };
    if (mst.Ui.disableIcons.indexOf(props.icon as any) >= 0) return null;
    const IconRender = isValidElement(props.icon)
      ? props.icon
      : props.IconRenders[props.icon as string];
    return (
      <Tooltip title={props.title} webPdmUi={webPdmUi}>
        <button
          aria-disabled={props.disable}
          style={{ color: props.color }}
          className={`command-btn${props.disable ? '' : ' enable'}`}
          onClick={!props.disable ? props.onClick : undefined}
          type="button"
        >
          {IconRender}
        </button>
      </Tooltip>
    );
  },
});
