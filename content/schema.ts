import { z } from 'zod';
import type { SiteContent } from './types';
import site from './site.json';

const LinkSet = z.object({
  website: z.string().url().optional(),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
});

const Project = z.object({
  name: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  links: LinkSet.optional(),
  tags: z.array(z.string()).optional(),
  status: z.string().optional(),
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
  date: z.string().optional(),
  status: z.string().optional(),
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
});

export const SiteSchema = z.object({
  hero: z.object({
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
  }),
  skills: z.array(SkillCategory),
  projects: z.array(Project),
  experience: z.array(Experience),
  certifications: z.array(Certification).optional(),
  testimonials: z.array(Testimonial).optional(),
  awards: z.array(Award).optional(),
  contact: z.object({
    email: z.string().email(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    phone: z.string().optional(),
  }),
  highlights: z.object({ chess: z.string().optional() }).optional(),
  terminal: z.object({ commands: z.array(z.string()).optional() }).optional(),
});

export function getSiteContent(): SiteContent {
  const parsed = SiteSchema.safeParse(site);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.')} - ${i.message}`).join('\n');
    throw new Error(`Invalid site.json:\n${message}`);
  }
  return parsed.data as SiteContent;
}
