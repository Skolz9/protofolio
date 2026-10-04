import React, { useState } from 'react';
import { X, Check, MessageCircle, Copy, ArrowUpRight } from 'lucide-react';
import { ProjectData } from './ProjectsSection';
import { WHATSAPP_NUMBER, WHATSAPP_URL } from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyNumber = () => {
    navigator.clipboard?.writeText(`+${WHATSAPP_NUMBER}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappDirectLink =
    name.trim() || message.trim()
      ? `${WHATSAPP_URL}?text=${encodeURIComponent(
          `Hi Oussama, I'm ${name.trim() || 'reaching out'}. ${message.trim()}`
        )}`
      : WHATSAPP_URL;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-[36px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 text-[#D7E2EA]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="hero-heading text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
          Let&apos;s Collaborate
        </h3>
        <p className="text-[#D7E2EA]/70 font-light text-sm sm:text-base mb-6">
          Reach out directly on WhatsApp for 3D modeling, rendering, motion design, and branding
          projects.
        </p>

        {/* Direct WhatsApp Card */}
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#D7E2EA]/25 bg-white/5 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] uppercase tracking-widest text-[#D7E2EA]/60">
                WhatsApp Direct
              </span>
              <span className="text-base sm:text-lg font-medium tracking-wide tabular-nums">
                +212 704 644 731
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyNumber}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/30 px-3.5 py-2 text-xs uppercase tracking-wider text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#0C0C0C] hover:opacity-90 transition-opacity no-underline whitespace-nowrap"
            >
              Open Chat
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick WhatsApp Message Composer */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full rounded-2xl border border-[#D7E2EA]/30 bg-white/5 px-4 py-3 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/70 mb-1.5">
              Project Brief
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your timeline, scope, and goals..."
              className="w-full rounded-2xl border border-[#D7E2EA]/30 bg-white/5 px-4 py-3 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA] resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end">
            <a
              href={whatsappDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs sm:text-sm text-white font-medium uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform no-underline"
            >
              <MessageCircle className="w-4 h-4" />
              Send via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onInquire: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 text-[#D7E2EA] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl font-black tabular-nums">{project.number}</span>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 block">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-medium uppercase">{project.name}</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="w-10 h-10 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <img
            src={project.col1Img1}
            alt={`${project.name} view 1`}
            referrerPolicy="no-referrer"
            className="w-full h-48 sm:h-64 object-cover rounded-3xl"
          />
          <img
            src={project.col1Img2}
            alt={`${project.name} view 2`}
            referrerPolicy="no-referrer"
            className="w-full h-48 sm:h-64 object-cover rounded-3xl"
          />
          <img
            src={project.col2Img}
            alt={`${project.name} view 3`}
            referrerPolicy="no-referrer"
            className="w-full h-48 sm:h-64 object-cover rounded-3xl"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#D7E2EA]/15">
          <p className="text-sm text-[#D7E2EA]/70 font-light">
            3D Direction · Custom Shaders · Realtime Lighting &amp; Motion Production
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onInquire();
            }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
          >
            Request Similar Project
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
