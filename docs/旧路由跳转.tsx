import { useI18n } from '@rspress/core/runtime';
import { useEffect } from 'react';

export default function 旧路由跳转({ to }: { to: string }) {
  const t = useI18n();

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
