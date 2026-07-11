import classnames from 'classnames';
import React, { type CSSProperties } from 'react';
import { useMst } from '../context';
import GraphPage from '../graph';
import { normalizeLocale } from '../intl';
import { createThemeCssVariables } from '../theme';
import { resolveModelNavigationVisibility } from '../type/sys';
import { CreateComponent } from '../util';
import ModelNavi from './model-navi';

export type IPagePros = {
  style?: CSSProperties;
  className?: string;
  height?: number | string;
};

export default CreateComponent<IPagePros>({
  displayName: 'page',
  render(props) {
    const mst = useMst();
    const palette = mst.Ui.palette;
    const themeStyle = createThemeCssVariables(palette) as CSSProperties;
    const showModelNavigation = resolveModelNavigationVisibility(
      mst.sys.showModelNavigation,
      mst.Models.size,
      mst.Modules.size,
    );
    const locale = normalizeLocale(mst.sys.intl);

    return (
      <div
        className={classnames('console-g6-page', props.className, {
          'console-g6-page--without-navigation': !showModelNavigation,
        })}
        data-web-pdm-locale={locale}
        data-web-pdm-theme={palette.theme}
        style={{
          ...themeStyle,
          ...props.style,
          colorScheme: palette.theme,
          height: mst.sys.height,
        }}
      >
        <div className="console-erd-fps" />
        {showModelNavigation ? (
          <div className="g6-modelnavi">
            <ModelNavi />
          </div>
        ) : null}
        <div className="g6-graph">
          <GraphPage />
        </div>
      </div>
    );
  },
});
