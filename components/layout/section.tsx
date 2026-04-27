import type { ReactNode } from 'react';
import { SectionNumeral } from './section-numeral';

type Props = {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, number, title, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative py-20 md:py-40"
    >
      <div className="mx-auto max-w-(--container-page) px-6 md:px-20">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3">
            <SectionNumeral number={number} />
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              id={`${id}-title`}
              className="font-display text-4xl md:text-6xl tracking-tight mb-10 md:mb-16"
            >
              {title}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
