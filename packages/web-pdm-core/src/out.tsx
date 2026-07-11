import { applySnapshot, withoutUndo } from 'mobx-keystone';
import { observer } from 'mobx-react';
import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FunctionComponent,
  type ReactNode,
} from 'react';
import MSTPage from './components';
import { createRootStore, Provider, useMst } from './context';
import { normalizeLocale, type LegacyLocale, type Locale } from './intl';
import type { WebPdmTheme, WebPdmThemeMode } from './theme';
import type {
  FieldConfig,
  IComponentConfig,
  ModelConfig,
  ModuleConfig,
  TData,
} from './type/config';

export type { IntlKey, IntlParams, Locale } from './intl';
export type { WebPdmTheme, WebPdmThemeMode } from './theme';
export * from './type/config';

export type IconName =
  | 'undo'
  | 'redo'
  | 'min'
  | 'max'
  | 'full'
  | 'miniMap'
  | 'miniMapNo'
  | 'dagreLayout'
  | 'relationLayout'
  | 'reload'
  | 'image'
  | 'darkness'
  | 'light'
  | 'colorClose'
  | 'colorOpen';

type IconRenders = Partial<Record<IconName, ReactNode>>;

export type WebPdmStyle = CSSProperties &
  Partial<Record<`--${string}`, string | number>>;

export interface IWebPdmProps {
  models: ModelConfig[];
  modules: ModuleConfig[];
  erdkey: string;
  className?: string;
  style?: WebPdmStyle;
  height?: string | number;
  onIgnoreEdge?: (field: FieldConfig) => boolean;
  components?: IComponentConfig;
  onModelDetail?: (model: ModelConfig) => void;
  themeColor?: string;
  theme?: WebPdmThemeMode;
  locale?: Locale;
  showModelNavigation?: boolean;
  onReload?: () => TData;
  onIntl?: (text: string) => string;
  IconRenders?: IconRenders;
  disableIcons?: IconName[];
  onlyMode?: boolean;
  /** @deprecated Use `theme="dark"` or `theme="light"` instead. */
  darkness?: boolean;
  /** @deprecated Use `locale="en"` or `locale="zh-CN"` instead. */
  intl?: LegacyLocale;
}

type PageProps = IWebPdmProps & {
  resolvedHeight: number | string;
  resolvedLocale: Locale;
  resolvedTheme: WebPdmTheme;
};

const Page = observer(
  ({
    IconRenders,
    className,
    components,
    disableIcons,
    erdkey,
    models,
    modules,
    onIgnoreEdge,
    onIntl,
    onModelDetail,
    onReload,
    onlyMode,
    resolvedHeight,
    resolvedLocale,
    resolvedTheme,
    showModelNavigation,
    style,
    themeColor,
  }: PageProps) => {
    const data = useMst();
    const isFirstDataEffect = useRef(true);

    useEffect(() => {
      let restored = false;

      try {
        const localData = sessionStorage.getItem(`web-pdm${erdkey}`);
        if (localData) {
          const snapshot = JSON.parse(localData);
          const localFieldsData = sessionStorage.getItem(
            `web-pdm-fields${erdkey}`,
          );
          withoutUndo(() => {
            if (localFieldsData) {
              data.setFields(new Map(JSON.parse(localFieldsData)));
            }
            applySnapshot(data, snapshot);
          });
          restored = true;
        }
      } catch {
        try {
          sessionStorage.removeItem(`web-pdm${erdkey}`);
          sessionStorage.removeItem(`web-pdm-fields${erdkey}`);
        } catch {
          // Storage can be unavailable in privacy-restricted browser contexts.
        }
      }

      if (!restored) {
        withoutUndo(() => data.initData(models, modules));
      }
    }, []);

    useEffect(() => {
      data.sys.setHeight(resolvedHeight);
      data.sys.setIntl(resolvedLocale);
      data.sys.setOnlyMode(onlyMode);
      data.sys.setShowModelNavigation(showModelNavigation);
      data.sys.setOnIgnoreEdge(onIgnoreEdge);
      data.sys.setOnModelDetail(onModelDetail);
      data.Ui.setTheme(resolvedTheme);
      data.Ui.setThemeColor(themeColor);
      data.Ui.registComponents(components, IconRenders, disableIcons);
      data.setOnReload(onReload);
      data.setOnIntl(onIntl);
    }, [
      IconRenders,
      components,
      data,
      disableIcons,
      onIgnoreEdge,
      onIntl,
      onModelDetail,
      onReload,
      onlyMode,
      resolvedHeight,
      resolvedLocale,
      resolvedTheme,
      showModelNavigation,
      themeColor,
    ]);

    useEffect(() => {
      if (isFirstDataEffect.current) {
        isFirstDataEffect.current = false;
        return;
      }

      data.Models.clear();
      data.Modules.clear();
      data.Fields.clear();
      withoutUndo(() => data.initData(models, modules));
    }, [data, models, modules]);

    return <MSTPage className={className} style={style} />;
  },
);

const getSystemTheme = (): WebPdmTheme => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const useResolvedTheme = (theme: WebPdmThemeMode): WebPdmTheme => {
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    if (
      theme !== 'system' ||
      typeof window === 'undefined' ||
      !window.matchMedia
    )
      return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => setSystemTheme(media.matches ? 'dark' : 'light');
    updateTheme();
    media.addEventListener('change', updateTheme);
    return () => media.removeEventListener('change', updateTheme);
  }, [theme]);

  return theme === 'system' ? systemTheme : theme;
};

const DEFAULT_HEIGHT = 'min(720px, 100dvh)';

const resolveThemeMode = ({
  darkness,
  theme,
}: Pick<IWebPdmProps, 'darkness' | 'theme'>): WebPdmThemeMode => {
  if (theme) return theme;
  if (darkness === undefined) return 'light';
  return darkness ? 'dark' : 'light';
};

const WebPDM: FunctionComponent<IWebPdmProps> = (props) => {
  const themeMode = resolveThemeMode(props);
  const resolvedTheme = useResolvedTheme(themeMode);
  const resolvedLocale = normalizeLocale(props.locale ?? props.intl);
  const resolvedHeight = props.height ?? DEFAULT_HEIGHT;
  const [rootStore] = useState(() =>
    createRootStore({
      sys: {
        height: resolvedHeight,
        intl: resolvedLocale,
        onIgnoreEdge: props.onIgnoreEdge,
        onModelDetail: props.onModelDetail,
        onlyMode: props.onlyMode,
        showModelNavigation: props.showModelNavigation,
      },
      Ui: {
        darkness: resolvedTheme === 'dark',
        themeColor: props.themeColor ?? '',
      },
      components: props.components,
      onReload: props.onReload,
      onIntl: props.onIntl,
      IconRenders: props.IconRenders,
      disableIcons: props.disableIcons,
    }),
  );

  return (
    <Provider value={rootStore}>
      <Page
        {...props}
        resolvedHeight={resolvedHeight}
        resolvedLocale={resolvedLocale}
        resolvedTheme={resolvedTheme}
      />
    </Provider>
  );
};

export default WebPDM;
