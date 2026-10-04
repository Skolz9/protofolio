import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none" aria-hidden="true">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const lines = text.split('\n');
  const totalChars = text.length;
  let charCursor = 0;

  return (
    <p ref={containerRef} className={`relative ${className}`}>
      {lines.map((line, lineIdx) => {
        const words = line.split(' ');
        const lineContent = words.map((word, wordIdx) => {
          const wordElements = word.split('').map((char, charIdx) => {
            const start = charCursor / totalChars;
            const end = (charCursor + 1) / totalChars;
            charCursor += 1;
            return (
              <Character
                key={`${lineIdx}-${wordIdx}-${charIdx}`}
                char={char}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          });

          let spaceElement: React.ReactNode = null;
          if (wordIdx < words.length - 1) {
            const start = charCursor / totalChars;
            const end = (charCursor + 1) / totalChars;
            charCursor += 1;
            spaceElement = (
              <Character
                key={`space-${lineIdx}-${wordIdx}`}
                char=" "
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          }

          return (
            <span key={`${lineIdx}-${wordIdx}`} className="inline-block whitespace-nowrap">
              {wordElements}
              {spaceElement}
            </span>
          );
        });

        if (lineIdx < lines.length - 1) {
          charCursor += 1; // account for '\n'
        }

        return (
          <React.Fragment key={`line-${lineIdx}`}>
            {lineContent}
            {lineIdx < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </p>
  );
};
