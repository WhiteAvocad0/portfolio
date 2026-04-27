'use client';
import { useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useMagnetic } from '@/lib/hooks/use-magnetic';
import { useTouchDevice } from '@/lib/hooks/use-touch-device';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function MagneticLink({ href, children, className = '', external = false }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isTouch = useTouchDevice();
  const { x, y } = useMagnetic(ref);

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`inline-block ${className}`}
      style={isTouch ? undefined : { x, y }}
      {...externalProps}
    >
      {children}
    </motion.a>
  );
}
