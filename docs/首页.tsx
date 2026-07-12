import { useI18n, useLang } from '@rspress/core/runtime';
import 产品预览图 from './assets/erd.jpeg';
import 共建二维码 from './assets/group.jpeg';
import 赞助二维码 from './assets/pay.jpeg';
import GitHub星标趋势 from './GitHub星标趋势';
import TypeErd from './type-erd';
import 品牌标识 from './品牌标识';
import type { 文案类型 } from './文案类型';

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

const 外部链接 = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16">
    <path
      d="M6.5 4H4.75A1.75 1.75 0 0 0 3 5.75v5.5A1.75 1.75 0 0 0 4.75 13h5.5A1.75 1.75 0 0 0 12 11.25V9.5M8.5 3H13v4.5M12.5 3.5 7 9"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.35"
    />
  </svg>
);

const 首页文案 = {
  en: {
    vision: 'THE OPEN-SOURCE ONLINE POWERDESIGNER',
    starChartLabel: 'GitHub Star growth since March 2020',
    starCountLabel: 'GitHub Stars',
    starRangeLabel: 'MAR 2020 — NOW',
    starSourceLabel: 'Live via RepoStars',
    performanceEyebrow: '01 / CANVAS FIRST',
    performanceTitle: 'A Canvas workspace built toward thousand-model schemas.',
    performanceDescription:
      'ER maps grow with the business. Canvas keeps visual objects out of the DOM, while G6 5 gives web-pdm a capable interaction and layout engine with room for deeper rendering optimization.',
    metrics: [
      { value: 'Canvas', label: 'rendering pipeline' },
      { value: 'G6 5', label: 'graph engine' },
      { value: '1,000+', label: 'model benchmark target' },
    ],
    capabilitiesEyebrow: '02 / PRODUCT CAPABILITIES',
    capabilitiesTitle: 'A serious ER workspace, without a heavy UI stack.',
    capabilitiesDescription:
      'Use the complete workspace or embed it in a larger modeling, low-code, APaaS or developer platform.',
    capabilities: [
      {
        index: '01',
        title: 'Relationship-aware layout',
        description:
          'Force layout uses model relationships to keep connected concepts close and dense maps readable.',
      },
      {
        index: '02',
        title: 'Detail on demand',
        description:
          'Zoom-based rendering reduces unnecessary detail while preserving every model’s spatial footprint.',
      },
      {
        index: '03',
        title: 'Lightweight React embedding',
        description:
          'A focused component surface built for integration instead of an all-or-nothing application shell.',
      },
      {
        index: '04',
        title: 'Practical modeling controls',
        description:
          'Search, module navigation, minimap, layout, theme switching and PNG export are ready to use.',
      },
      {
        index: '05',
        title: 'English and Chinese',
        description:
          'The documentation and component UI use English by default and provide complete Chinese support.',
      },
      {
        index: '06',
        title: 'Light and dark themes',
        description:
          'High-contrast surfaces keep model names, fields and controls legible in both visual modes.',
      },
    ],
    directionEyebrow: '03 / PRODUCT DIRECTION',
    directionTitle: 'More than a diagram viewer: an online PowerDesigner.',
    directionDescription:
      'PowerDesigner became a standard because its modeling fundamentals are strong and it handles Chinese metadata well. But it is tied to Windows. web-pdm started from the need for a capable, browser-native alternative that works on every platform and can be extended for each team’s domain language.',
    directionNote:
      'The direction has not changed: make business design, model design and database design understandable in one shared visual workspace.',
    screenshotAlt: 'web-pdm ER diagram product screenshot',
    genesisEyebrow: '04 / GENESIS',
    genesisTitle: 'Why web-pdm exists',
    genesisDescription:
      'The project began as an exploration of how to design and implement a high-performance ER diagram with G6. The original design notes remain part of the project’s technical history.',
    genesisLink: 'Read the original design notes',
    openWorkspace: 'Open the live workspace',
    communityEyebrow: '05 / OPEN SOURCE',
    communityTitle: 'Build the next version with us.',
    communityDescription:
      'Feedback, domain-specific extensions and implementation ideas are welcome. Join the community or start a discussion on GitHub.',
    communityQrAlt: 'web-pdm contributor community QR code',
    communityLink: 'Feedback and contribution',
    sponsorTitle: 'Support the project',
    sponsorDescription:
      'If web-pdm saves your team time, sponsorship helps independent development continue.',
    sponsorQrAlt: 'web-pdm sponsorship QR code',
    updatesTitle: 'Follow every release',
    updatesDescription:
      'Review migration notes for breaking changes, or inspect the complete project history on GitHub.',
    migrationLink: 'Migration notes',
    changelogLink: 'Change log',
    footer:
      'Open source under the MIT License. Built for teams that think in models.',
  },
  zh: {
    vision: '面向 WEB 的开源在线 POWERDESIGNER',
    starChartLabel: 'GitHub Star 自 2020 年 3 月以来的增长趋势',
    starCountLabel: 'GitHub 星标',
    starRangeLabel: '2020.03 — 至今',
    starSourceLabel: 'RepoStars 实时数据',
    performanceEyebrow: '01 / CANVAS 优先',
    performanceTitle: '持续面向千级模型场景优化的 Canvas 工作台。',
    performanceDescription:
      '业务增长，ER 图也会随之变得庞大。Canvas 不会把每个图形对象变成 DOM 节点，G6 5 则提供了可靠的交互和布局引擎，也为后续更深的渲染优化留出了空间。',
    metrics: [
      { value: 'Canvas', label: '渲染管线' },
      { value: 'G6 5', label: '图可视化引擎' },
      { value: '1,000+', label: '模型基准目标' },
    ],
    capabilitiesEyebrow: '02 / 产品能力',
    capabilitiesTitle: '不需要沉重 UI 技术栈的专业 ER 工作台。',
    capabilitiesDescription:
      '可以直接使用完整工作台，也可以嵌入建模、Low-code、APaaS 或研发平台。',
    capabilities: [
      {
        index: '01',
        title: '感知关联的布局',
        description:
          '力导布局依据模型关系放置位置，让关联概念尽可能靠近，复杂图也能看清。',
      },
      {
        index: '02',
        title: '按需展示细节',
        description:
          '根据缩放级别减少不必要的细节，同时保留每个模型完整的空间占位。',
      },
      {
        index: '03',
        title: '轻量 React 嵌入',
        description:
          '聚焦 ER 能力的组件接口，适合组合进现有产品，不强制接受整套应用外壳。',
      },
      {
        index: '04',
        title: '实用的建模控件',
        description:
          '搜索、模块导航、小地图、布局、主题切换和 PNG 导出均可直接使用。',
      },
      {
        index: '05',
        title: '中英文国际化',
        description: '文档和组件默认使用英文，同时提供完整的中文界面和内容。',
      },
      {
        index: '06',
        title: '光明与黑暗主题',
        description:
          '高对比度的界面配色，确保模型名、字段和操作控件在两种主题下都清晰可见。',
      },
    ],
    directionEyebrow: '03 / 产品方向',
    directionTitle: '不只是看图工具，而是在线版 PowerDesigner。',
    directionDescription:
      'PowerDesigner 因为基础能力扎实、对中文元信息友好，成为了常用建模工具，但它只支持 Windows。web-pdm 源于对跨平台、浏览器原生替代方案的需求，并希望让每个团队都能依据自己的领域语言进行扩展。',
    directionNote:
      '方向从未改变：让业务设计、模型设计和数据库设计，在同一个可视化工作台中被理解和共享。',
    screenshotAlt: 'web-pdm ER 图产品截图',
    genesisEyebrow: '04 / 项目缘起',
    genesisTitle: 'web-pdm 为什么诞生',
    genesisDescription:
      '项目始于对“如何基于 G6 设计和实现高性能 ER 图”的探索。最初的设计记录仍然是项目技术历史的一部分。',
    genesisLink: '阅读最初的设计记录',
    openWorkspace: '打开在线工作台',
    communityEyebrow: '05 / 开源共建',
    communityTitle: '一起定义下一个版本。',
    communityDescription:
      '欢迎反馈产品问题、共建领域扩展，或分享新的实现思路。你可以扫码加入社区，也可以在 GitHub 发起讨论。',
    communityQrAlt: 'web-pdm 开源共建群二维码',
    communityLink: '反馈与参与贡献',
    sponsorTitle: '赞助项目',
    sponsorDescription:
      '如果 web-pdm 为团队节省了时间，你的支持会帮助独立开发持续下去。',
    sponsorQrAlt: 'web-pdm 赞助二维码',
    updatesTitle: '关注每一次更新',
    updatesDescription:
      '通过迁移指南了解破坏性变更，或在 GitHub 查看完整的项目更新历史。',
    migrationLink: '迁移指南',
    changelogLink: '更新日志',
    footer: '基于 MIT 协议开源，为使用模型思考的团队而建。',
  },
} as const;

export default function 首页() {
  const t = useI18n<文案类型>();
  const lang = useLang();
  const isChinese = lang === 'zh';
  const copy = 首页文案[isChinese ? 'zh' : 'en'];
  const languagePrefix = isChinese ? '/zh' : '';
  const localeLink = (path: string) => `${languagePrefix}${path}`;

  return (
    <main className="web-pdm-home">
      <div className="web-pdm-home__masthead">
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
              <span className="web-pdm-home__vision">{copy.vision}</span>
            </div>
          </div>

          <div className="web-pdm-home__launch">
            <div className="web-pdm-home__release-signals">
              <a
                aria-label={t('homeInstallLabel')}
                className="web-pdm-home__install"
                href="https://www.npmjs.com/package/web-pdm"
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="web-pdm-home__npm-brand">
                  npm
                </span>
                <code>pnpm add web-pdm</code>
                <span className="web-pdm-home__npm-version">
                  <span className="web-pdm-home__npm-action">
                    {t('homeNpmAction')}
                  </span>
                  <span>·</span>
                  <span>v0.4.0</span>
                  <外部链接 />
                </span>
              </a>
              <GitHub星标趋势
                chartLabel={copy.starChartLabel}
                countLabel={copy.starCountLabel}
                rangeLabel={copy.starRangeLabel}
                sourceLabel={copy.starSourceLabel}
              />
            </div>
            <div className="web-pdm-home__links">
              <a
                className="web-pdm-home__link web-pdm-home__link--primary"
                href={localeLink('/guide/getting-started')}
              >
                {t('homeGetStarted')}
                <箭头 />
              </a>
              <a className="web-pdm-home__link" href="#live-demo">
                {t('homeExamples')}
              </a>
              <span className="web-pdm-home__version">v0.4.0</span>
            </div>
          </div>
        </section>

        <a className="web-pdm-home__scroll-cue" href="#live-demo">
          <span>{isChinese ? '查看在线 Demo' : 'View the live demo'}</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      <section
        aria-label={t('homeWorkspaceLabel')}
        className="web-pdm-home__demo"
        id="live-demo"
      >
        <div className="web-pdm-home__workspace">
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
        </div>
      </section>

      <div className="web-pdm-home__content" id="product-capabilities">
        <section className="web-pdm-home__performance">
          <div className="web-pdm-home__section-copy">
            <span className="web-pdm-home__section-eyebrow">
              {copy.performanceEyebrow}
            </span>
            <h2>{copy.performanceTitle}</h2>
            <p>{copy.performanceDescription}</p>
          </div>
          <dl className="web-pdm-home__metrics">
            {copy.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="web-pdm-home__capabilities">
          <header className="web-pdm-home__section-header">
            <div>
              <span className="web-pdm-home__section-eyebrow">
                {copy.capabilitiesEyebrow}
              </span>
              <h2>{copy.capabilitiesTitle}</h2>
            </div>
            <p>{copy.capabilitiesDescription}</p>
          </header>
          <div className="web-pdm-home__capability-grid">
            {copy.capabilities.map((capability) => (
              <article
                className="web-pdm-home__capability"
                key={capability.index}
              >
                <span>{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="web-pdm-home__direction">
          <div className="web-pdm-home__direction-copy">
            <span className="web-pdm-home__section-eyebrow">
              {copy.directionEyebrow}
            </span>
            <h2>{copy.directionTitle}</h2>
            <p>{copy.directionDescription}</p>
            <blockquote>{copy.directionNote}</blockquote>
            <div className="web-pdm-home__inline-links">
              <a href={localeLink('/guide/')}>
                {isChinese
                  ? '了解产品方向'
                  : 'Understand the product direction'}
                <箭头 />
              </a>
              <a href={localeLink('/demo/')}>
                {copy.openWorkspace}
                <箭头 />
              </a>
            </div>
          </div>
          <figure className="web-pdm-home__screenshot">
            <img alt={copy.screenshotAlt} loading="lazy" src={产品预览图} />
            <figcaption>web-pdm / ER WORKSPACE</figcaption>
          </figure>
        </section>

        <section className="web-pdm-home__genesis">
          <span className="web-pdm-home__section-eyebrow">
            {copy.genesisEyebrow}
          </span>
          <div>
            <h2>{copy.genesisTitle}</h2>
            <p>{copy.genesisDescription}</p>
          </div>
          <a
            href="https://www.yuque.com/antv/g6-blog/nbaywp"
            rel="noreferrer"
            target="_blank"
          >
            {copy.genesisLink}
            <外部链接 />
          </a>
        </section>

        <section className="web-pdm-home__community">
          <header>
            <span className="web-pdm-home__section-eyebrow">
              {copy.communityEyebrow}
            </span>
            <h2>{copy.communityTitle}</h2>
            <p>{copy.communityDescription}</p>
            <a
              href="https://github.com/lusess123/web-pdm/issues"
              rel="noreferrer"
              target="_blank"
            >
              {copy.communityLink}
              <外部链接 />
            </a>
          </header>

          <article className="web-pdm-home__community-card">
            <div>
              <span>CONTRIBUTE</span>
              <strong>{copy.communityTitle}</strong>
            </div>
            <img alt={copy.communityQrAlt} loading="lazy" src={共建二维码} />
          </article>

          <article className="web-pdm-home__community-card">
            <div>
              <span>SPONSOR</span>
              <strong>{copy.sponsorTitle}</strong>
              <p>{copy.sponsorDescription}</p>
            </div>
            <img alt={copy.sponsorQrAlt} loading="lazy" src={赞助二维码} />
          </article>
        </section>

        <section className="web-pdm-home__updates">
          <div>
            <span className="web-pdm-home__section-eyebrow">06 / UPDATES</span>
            <h2>{copy.updatesTitle}</h2>
            <p>{copy.updatesDescription}</p>
          </div>
          <div className="web-pdm-home__inline-links">
            <a href={localeLink('/guide/migration')}>
              {copy.migrationLink}
              <箭头 />
            </a>
            <a
              href="https://github.com/lusess123/web-pdm/commits/master"
              rel="noreferrer"
              target="_blank"
            >
              {copy.changelogLink}
              <外部链接 />
            </a>
          </div>
        </section>

        <footer className="web-pdm-home__footer">
          <品牌标识
            className="web-pdm-home__footer-mark"
            label={t('homeProductLabel')}
          />
          <p>{copy.footer}</p>
          <span>2019—{new Date().getFullYear()}</span>
        </footer>
      </div>
    </main>
  );
}
