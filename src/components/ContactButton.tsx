import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
}

export const WHATSAPP_NUMBER = '212704644731';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const ContactButton: React.FC<ContactButtonProps> = ({ onClick, className = '' }) => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`inline-flex items-center justify-center contact-btn-gradient rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest whitespace-nowrap cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 no-underline ${className}`}
    >
      Contact Me
    </a>
  );
};
