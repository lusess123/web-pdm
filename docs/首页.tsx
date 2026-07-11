import { useI18n, useLang } from '@rspress/core/runtime';
import TypeErd from './type-erd';

const 产品标识 = ({ label }: { label: string }) => (
  <svg
    aria-label={label}
    className="web-pdm-product-mark"
    role="img"
    viewBox="0 0 72 72"
  >
    <rect
      fill="#111923"
      height="70"
      rx="18"
      stroke="#2a394b"
      width="70"
      x="1"
      y="1"
    />
    <path
      d="M33 23h7c4 0 6 2 6 6v3M29 50h8c5 0 7-3 7-7v-2"
      fill="none"
      stroke="#38bdf8"
      strokeLinecap="round"
      strokeWidth="2"
    />
    <circle
      cx="33"
      cy="23"
      fill="#0b1119"
      r="3"
      stroke="#38bdf8"
      strokeWidth="2"
    />
    <circle
      cx="46"
      cy="34"
      fill="#0b1119"
      r="3"
      stroke="#38bdf8"
      strokeWidth="2"
    />
    <circle
      cx="29"
      cy="50"
      fill="#0b1119"
      r="3"
      stroke="#38bdf8"
      strokeWidth="2"
    />
    <rect fill="#e8eef5" height="21" rx="4" width="25" x="9" y="12" />
    <rect fill="#0f6eaa" height="5" rx="2" width="17" x="13" y="16" />
    <rect fill="#9ba9b8" height="2" rx="1" width="13" x="13" y="25" />
    <rect fill="#e8eef5" height="21" rx="4" width="18" x="45" y="26" />
    <rect fill="#0f6eaa" height="5" rx="2" width="10" x="49" y="30" />
    <rect fill="#9ba9b8" height="2" rx="1" width="8" x="49" y="39" />
    <rect fill="#e8eef5" height="18" rx="4" width="22" x="8" y="44" />
    <rect fill="#0f6eaa" height="5" rx="2" width="14" x="12" y="48" />
    <rect fill="#9ba9b8" height="2" rx="1" width="10" x="12" y="57" />
  </svg>
);

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
          <产品标识 label={t('homeProductLabel')} />
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
