import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

export const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'AKTAOU CAR',
    category: 'Client',
    col1Img1: '/aktaou-fleet-1.svg',
    col1Img2: '/aktaou-fleet-2.svg',
    col2Img: '/aktaou-hero.svg',
  },
  {
    number: '02',
    name: 'clinique agadir',
    category: 'Client',
    col1Img1: '/clinique-rdv.svg',
    col1Img2: '/clinique-temoignages.svg',
    col2Img: '/clinique-specialites.svg',
  },
  {
    number: '03',
    name: 'restaurant atlass',
    category: 'Client',
    col1Img1: '/atlass-cuisine.svg',
    col1Img2: '/atlass-menu.svg',
    col2Img: '/atlass-hero.svg',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onSelectProject: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  progress,
  onSelectProject,
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const rangeStart = index * (1 / totalCards);
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] sticky top-24 md:top-32 flex items-start justify-center">
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 origin-top"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 sm:mb-7 px-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="font-black text-[#D7E2EA] leading-none tabular-nums text-[clamp(3rem,10vw,140px)]">
              {project.number}
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-[#D7E2EA]/60 font-light uppercase tracking-wider text-xs sm:text-sm md:text-base">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase leading-tight text-[clamp(1.1rem,2.5vw,2.25rem)]">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => onSelectProject(project)} />
        </div>

        {/* Bottom Row: Two-column image grid */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
          {/* Left Column (40% width): 2 stacked images */}
          <div className="w-full sm:w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-5">
            <div className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] h-[clamp(130px,16vw,230px)]">
              <img
                src={project.col1Img1}
                alt={`${project.name} detail 1`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] block"
              />
            </div>

            <div className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] h-[clamp(160px,22vw,340px)]">
              <img
                src={project.col1Img2}
                alt={`${project.name} detail 2`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] block"
              />
            </div>
          </div>

          {/* Right Column (60% width): 1 tall image */}
          <div className="w-full sm:w-[60%] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] h-[240px] sm:h-[calc(clamp(130px,16vw,230px)+clamp(160px,22vw,340px)+1.25rem)]">
            <img
              src={project.col2Img}
              alt={`${project.name} main visual`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] block"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-36"
    >
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28 text-[clamp(3rem,12vw,160px)]">
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative flex flex-col">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            progress={scrollYProgress}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
};
