import { useI18n } from '@rspress/core/runtime';
import { useEffect } from 'react';
import type { 文案类型 } from './文案类型';

export default function 旧路由跳转({ to }: { to: string }) {
  const t = useI18n<文案类型>();

  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="web-pdm-legacy-route">
      <p>{t('legacyRedirect')}</p>
      <a href={to}>{t('legacyContinue')}</a>
    </main>
  );
}
