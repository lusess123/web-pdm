import { useDark, useI18n, useLang } from '@rspress/core/runtime';
import WebPdm from 'web-pdm';
import './style.less';
import { models, modules } from './typedata';

interface TypeErdProps {
  className?: string;
  height?: number | string;
}

export default ({
  className = 'console-g6-page-api',
  height = '100%',
}: TypeErdProps) => {
  const isDark = useDark();
  const lang = useLang();
  const t = useI18n();

  return (
    <WebPdm
      className={className}
      erdkey={`api-${lang}`}
      height={height}
      locale={lang === 'zh' ? 'zh-CN' : 'en'}
      models={models}
      onModelDetail={(a) => {
        alert(
          `${t('modelDetailPrefix')}${a.label}(${a.name})${t(
            'modelDetailSuffix',
          )}`,
        );
      }}
      modules={modules}
      theme={isDark ? 'dark' : 'light'}
      themeColor={isDark ? '#38bdf8' : '#0f6eaa'}
    />
  );
};
