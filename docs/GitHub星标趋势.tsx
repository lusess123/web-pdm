import { useEffect, useMemo, useState } from 'react';
import { GitHub仓库接口, GitHub星标快照 } from './GitHub星标快照';

const 图表宽度 = 144;
const 图表高度 = 32;
const 图表边距 = 2;
const RepoStars页面 =
  'https://www.repostars.dev/?repos=lusess123%2Fweb-pdm&theme=minimal';
const RepoStars浅色图 =
  'https://www.repostars.dev/api/embed?repo=lusess123/web-pdm&theme=minimal';
const RepoStars深色图 =
  'https://www.repostars.dev/api/embed?repo=lusess123/web-pdm&theme=dark';

type GitHub星标趋势Props = {
  chartLabel: string;
  countLabel: string;
  rangeLabel: string;
  sourceLabel: string;
};

const 生成折线点 = (当前星标数: number) => {
  const 数据 = GitHub星标快照.points.map((point, index, points) => ({
    ...point,
    stars:
      index === points.length - 1
        ? Math.max(point.stars, 当前星标数)
        : point.stars,
  }));
  const 最大值 = Math.max(...数据.map(({ stars }) => stars), 1);
  const 可用宽度 = 图表宽度 - 图表边距 * 2;
  const 可用高度 = 图表高度 - 图表边距 * 2;

  return 数据.map(({ stars }, index) => ({
    x: 图表边距 + (index / (数据.length - 1)) * 可用宽度,
    y: 图表高度 - 图表边距 - (stars / 最大值) * 可用高度,
  }));
};

export default function GitHub星标趋势({
  chartLabel,
  countLabel,
  rangeLabel,
  sourceLabel,
}: GitHub星标趋势Props) {
  const [星标数, 设置星标数] = useState<number>(GitHub星标快照.count);
  const [使用快照, 设置使用快照] = useState(false);
  const [深色主题, 设置深色主题] = useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'),
  );
  const 折线点 = useMemo(() => 生成折线点(星标数), [星标数]);
  const 最后一点 = 折线点.at(-1)!;

  useEffect(() => {
    const controller = new AbortController();

    void fetch(GitHub仓库接口, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : undefined))
      .then((repository: { stargazers_count?: unknown } | undefined) => {
        const count = repository?.stargazers_count;
        if (typeof count === 'number' && Number.isFinite(count)) {
          设置星标数(Math.max(count, GitHub星标快照.count));
        }
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const 同步主题 = () => 设置深色主题(root.classList.contains('dark'));
    const observer = new MutationObserver(同步主题);

    同步主题();
    observer.observe(root, { attributeFilter: ['class'], attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <a
      aria-label={`${星标数.toLocaleString()} ${countLabel}. ${chartLabel}`}
      className="web-pdm-home__github-stars"
      data-github-star-count={星标数}
      href={RepoStars页面}
      rel="noreferrer"
      target="_blank"
    >
      {使用快照 ? (
        <span className="web-pdm-home__star-fallback">
          <span className="web-pdm-home__star-value">
            <strong>{星标数.toLocaleString()}</strong>
            <span>{countLabel}</span>
          </span>
          <span className="web-pdm-home__star-chart">
            <svg
              aria-label={chartLabel}
              data-github-star-chart
              role="img"
              viewBox={`0 0 ${图表宽度} ${图表高度}`}
            >
              <title>{chartLabel}</title>
              <path
                className="web-pdm-home__star-guide"
                d={`M${图表边距} ${图表高度 - 图表边距}H${图表宽度 - 图表边距}`}
              />
              <polyline
                className="web-pdm-home__star-line"
                points={折线点.map(({ x, y }) => `${x},${y}`).join(' ')}
              />
              <circle
                className="web-pdm-home__star-point"
                cx={最后一点.x}
                cy={最后一点.y}
                r="2.5"
              />
            </svg>
            <span>{rangeLabel}</span>
          </span>
        </span>
      ) : (
        <img
          alt={chartLabel}
          className="web-pdm-home__star-image"
          data-github-star-chart
          decoding="async"
          onError={() => 设置使用快照(true)}
          referrerPolicy="no-referrer"
          src={深色主题 ? RepoStars深色图 : RepoStars浅色图}
        />
      )}
      <span className="web-pdm-home__star-source">
        <span aria-hidden="true" />
        {sourceLabel}
      </span>
      <span className="web-pdm-home__star-accessible">
        {星标数.toLocaleString()} {countLabel}
      </span>
    </a>
  );
}
