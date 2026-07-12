import { useDark, useLang } from '@rspress/core/runtime';
import WebPdm from 'web-pdm';
import ModelTest from '../test/g6-test/mock/model-test';
import ModuleTest from '../test/g6-test/mock/module-test';
// import "../test/style.less"
import './style.less';

const englishNameOverrides: Record<string, string> = {
  申请人: 'Applicant',
};

const humanizeName = (value: string) =>
  englishNameOverrides[value] ??
  value
    .replace(/^bd_/i, '')
    .replace(/_/g, ' ')
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .trim();

const englishModels = ModelTest.map((model) => ({
  ...model,
  label: humanizeName(model.name),
  fields: model.fields.map((field) => ({
    ...field,
    label: humanizeName(field.name),
  })),
}));

const englishModules = ModuleTest.map((module) => ({
  ...module,
  label: humanizeName(module.name),
}));

export default () => {
  const isDark = useDark();
  const lang = useLang();

  return (
    <WebPdm
      className="console-g6-page-demo"
      erdkey={`codedemo-${lang}`}
      height="100%"
      locale={lang === 'zh' ? 'zh-CN' : 'en'}
      models={lang === 'zh' ? ModelTest : englishModels}
      modules={lang === 'zh' ? ModuleTest : englishModules}
      theme={isDark ? 'dark' : 'light'}
      themeColor={isDark ? '#38bdf8' : '#0f6eaa'}
    />
  );
};
