import { useId } from 'react';

export type 品牌标识属性 = {
  className?: string;
  label: string;
};

export default function 品牌标识({ className, label }: 品牌标识属性) {
  const titleId = useId();

  return (
    <svg
      aria-labelledby={titleId}
      className={className}
      focusable="false"
      role="img"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{label}</title>
      <rect
        fill="var(--web-pdm-logo-bg, #fff)"
        height="58"
        rx="14"
        stroke="var(--web-pdm-logo-border, #ccd6e2)"
        strokeWidth="2"
        width="58"
        x="3"
        y="3"
      />
      <path
        d="M24 18H28V29M40 18H36V29M32 37V42"
        fill="none"
        stroke="var(--web-pdm-logo-accent, #087eae)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <path
        d="M32 27 37 32 32 37 27 32Z"
        fill="var(--web-pdm-logo-accent, #087eae)"
      />
      <g fill="var(--web-pdm-logo-card, #101828)">
        <rect height="12" rx="3" width="14" x="10" y="12" />
        <rect height="12" rx="3" width="14" x="40" y="12" />
        <rect height="12" rx="3" width="14" x="25" y="42" />
      </g>
      <g
        fill="none"
        stroke="var(--web-pdm-logo-row, #fff)"
        strokeLinecap="round"
        strokeWidth="1.5"
      >
        <path d="M14 16H20M14 20H18" />
        <path d="M44 16H50M44 20H48" />
        <path d="M29 46H35M29 50H33" />
      </g>
    </svg>
  );
}
