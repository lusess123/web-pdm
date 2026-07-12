import { useDark, useI18n, useLang } from '@rspress/core/runtime';
import WebPdm from 'web-pdm';
import './style.less';
import { englishModels, englishModules, models, modules } from './typedata';
import type { 文案类型 } from './文案类型';

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
  const t = useI18n<文案类型>();
  const localizedModels = lang === 'zh' ? models : englishModels;
  const localizedModules = lang === 'zh' ? modules : englishModules;

  return (
    <WebPdm
      className={className}
      erdkey={`api-${lang}`}
      height={height}
      locale={lang === 'zh' ? 'zh-CN' : 'en'}
      models={localizedModels}
      onModelDetail={(a) => {
        alert(
          `${t('modelDetailPrefix')}${a.label}(${a.name})${t(
            'modelDetailSuffix',
          )}`,
        );
      }}
      modules={localizedModules}
      theme={isDark ? 'dark' : 'light'}
      themeColor={isDark ? '#38bdf8' : '#0f6eaa'}
    />
  );
};
