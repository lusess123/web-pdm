import { useDark, useLang } from '@rspress/core/runtime';
import WebPdm from 'web-pdm';
import ModelTest from '../test/g6-test/mock/model-test';
import ModuleTest from '../test/g6-test/mock/module-test';
// import "../test/style.less"
import './style.less';

export default () => {
  const isDark = useDark();
  const lang = useLang();

  return (
    <WebPdm
      className="console-g6-page-demo"
      erdkey={`codedemo-${lang}`}
      height="100%"
      locale={lang === 'zh' ? 'zh-CN' : 'en'}
      models={ModelTest}
      modules={ModuleTest}
      theme={isDark ? 'dark' : 'light'}
      themeColor={isDark ? '#38bdf8' : '#0f6eaa'}
    />
  );
};
