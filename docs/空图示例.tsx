import { useDark } from '@rspress/core/runtime';
import WebPdm, { type Locale } from 'web-pdm';

export default function 空图示例({ locale }: { locale: Locale }) {
  const isDark = useDark();

  return (
    <WebPdm
      className="console-g6-page-demo"
      erdkey={`empty-${locale}`}
      height="100%"
      locale={locale}
      models={[]}
      modules={[]}
      theme={isDark ? 'dark' : 'light'}
    />
  );
}
