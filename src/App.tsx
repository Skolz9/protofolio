/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection, ProjectData } from './components/ProjectsSection';
import { ContactModal, ProjectModal } from './components/Modals';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <main className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip">
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />
      <MarqueeSection />
      <AboutSection onOpenContact={() => setIsContactOpen(true)} />
      <ServicesSection />
      <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => setIsContactOpen(true)}
      />
    </main>
  );
}
