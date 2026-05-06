import type { CSSProperties, ReactNode } from 'react';
import { sectionMeta, type SectionKey } from '@/lib/data';

type Props = {
  section: SectionKey;
  children?: ReactNode;
  style?: CSSProperties;
};

export function SectionHead({ section, children, style }: Props) {
  const meta = sectionMeta[section];
  return (
    <div className="head reveal" style={style}>
      <div className="label">
        <span className="num">{meta.number}<small>/ 05</small></span>
        <span>{meta.label}</span>
      </div>
      {children ?? <span />}
    </div>
  );
}

export const sectionHeadingId = (section: SectionKey) => `${section}-heading`;
