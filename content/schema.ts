import { z } from 'zod';
import type { SiteContent } from './types';
import heroContent from './hero.json';
import skillsContent from './skills.json';
import experienceContent from './experience.json';
import certificationsContent from './certifications.json';
import testimonialsContent from './testimonials.json';
import awardsContent from './awards.json';
import contactContent from './contact.json';
import highlightsContent from './highlights.json';
import terminalContent from './terminal.json';

function parseSection<T>(schema: z.ZodType<T>, data: unknown, label: string): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => `${issue.path.join('.') || '(root)'} - ${issue.message}`).join('\n');
    throw new Error(`Invalid ${label}:\n${message}`);
  }
  return parsed.data;
}

const Hero = z.object({
  name: z.string(),
  role: z.string(),
  location: z.string().optional(),
  summary: z.string(),
  contacts: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  cta: z.object({ downloadCvUrl: z.string().optional() }).optional(),
});

const Experience = z.object({
  title: z.string(),
  organization: z.string(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  highlights: z.array(z.string()),
});

const SkillItem = z.object({
  name: z.string(),
  icon: z.string(),
});

const SkillCategory = z.object({
  category: z.string(),
  skills: z.array(SkillItem),
});

const Certification = z.object({
  title: z.string(),
  issuer: z.string().optional(),
  date: z.string().optional(),
  status: z.string().optional(),
  description: z.string().optional(),
  highlight: z.string().optional(),
  credentialUrl: z.string().url().optional(),
  image: z.string().optional(),
  icon: z.string().optional(),
});

const Testimonial = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string().optional(),
  quote: z.string(),
  image: z.string().optional(),
});

const Award = z.object({
  title: z.string(),
  issuer: z.string(),
  date: z.string().optional(),
  description: z.string().optional(),
  image: z.string(),
  credentialUrl: z.string().url().optional(),
  highlight: z.string().optional(),
  icon: z.string().optional(),
});

export function getSiteContent(): SiteContent {
  const hero = parseSection(Hero, heroContent, 'hero.json');
  const skills = parseSection(z.array(SkillCategory), skillsContent, 'skills.json');
  const experience = parseSection(z.array(Experience), experienceContent, 'experience.json');
  const certifications = parseSection(z.array(Certification), certificationsContent, 'certifications.json');
  const testimonials = parseSection(z.array(Testimonial), testimonialsContent, 'testimonials.json');
  const awards = parseSection(z.array(Award), awardsContent, 'awards.json');
  const contact = parseSection(
    z.object({
      email: z.string().email(),
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      phone: z.string().optional(),
    }),
    contactContent,
    'contact.json',
  );
  const highlights = parseSection(z.object({ chess: z.string().optional() }), highlightsContent, 'highlights.json');
  const terminal = parseSection(z.object({ commands: z.array(z.string()).optional() }), terminalContent, 'terminal.json');

  const content: SiteContent = {
    hero,
    skills,
    experience,
    certifications: certifications.length ? certifications : undefined,
    testimonials: testimonials.length ? testimonials : undefined,
    awards: awards.length ? awards : undefined,
    contact,
    highlights: Object.keys(highlights).length ? highlights : undefined,
    terminal: terminal.commands?.length ? terminal : undefined,
  };

  return content;
}
