import { useI18n, useLang } from '@rspress/core/runtime';
import TypeErd from './type-erd';
import 品牌标识 from './品牌标识';

const 箭头 = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16">
    <path
      d="M3 8h9M9 4l4 4-4 4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default function 首页() {
  const t = useI18n();
  const lang = useLang();
  const languagePrefix = lang === 'zh' ? '/zh' : '';
  const localeLink = (path: string) => `${languagePrefix}${path}`;

  return (
    <main className="web-pdm-home">
      <section className="web-pdm-home__hero">
        <div className="web-pdm-home__identity">
          <品牌标识
            className="web-pdm-product-mark"
            label={t('homeProductLabel')}
          />
          <div className="web-pdm-home__intro">
            <div className="web-pdm-home__eyebrow">{t('homeEyebrow')}</div>
            <h1>{t('homeTitle')}</h1>
            <p>{t('homeDescription')}</p>
          </div>
        </div>

        <div className="web-pdm-home__launch">
          <div
            className="web-pdm-home__install"
            aria-label={t('homeInstallLabel')}
          >
            <span aria-hidden="true">$</span>
            <code>pnpm add web-pdm</code>
          </div>
          <div className="web-pdm-home__links">
            <a
              className="web-pdm-home__link web-pdm-home__link--primary"
              href={localeLink('/guide/getting-started')}
            >
              {t('homeGetStarted')}
              <箭头 />
            </a>
            <a className="web-pdm-home__link" href={localeLink('/demo/')}>
              {t('homeExamples')}
            </a>
            <span className="web-pdm-home__version">v0.3.11</span>
          </div>
        </div>
      </section>

      <section
        aria-label={t('homeWorkspaceLabel')}
        className="web-pdm-home__workspace"
      >
        <header className="web-pdm-home__workspace-bar">
          <div className="web-pdm-home__workspace-title">
            <span aria-hidden="true" className="web-pdm-home__status" />
            <strong>{t('homeWorkspaceTitle')}</strong>
            <span>{t('homeLivePreview')}</span>
          </div>
          <span className="web-pdm-home__workspace-meta">
            {t('homeWorkspaceMeta')}
          </span>
        </header>
        <div className="web-pdm-home__diagram">
          <TypeErd className="web-pdm-home-diagram" height="100%" />
        </div>
      </section>
    </main>
  );
}
