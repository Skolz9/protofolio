import React from 'react';
import { motion } from 'motion/react';

type ElementTag = keyof React.JSX.IntrinsicElements;

// Cache motion components by tag name so React preserves component identity across renders
const motionComponentCache = new Map<ElementTag, React.ComponentType<any>>();

function getMotionComponent(tag: ElementTag) {
  if (!motionComponentCache.has(tag)) {
    motionComponentCache.set(tag, motion.create(tag as any));
  }
  return motionComponentCache.get(tag)!;
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: ElementTag;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
}) => {
  const Component = getMotionComponent(as);

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
};
