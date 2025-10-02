import { z } from 'zod';
import type { Project } from './types';
import projects from './projects.json';

const LinkSet = z.object({
  website: z.string().url().optional(),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  docs: z.string().url().optional(),
  video: z.string().url().optional(),
  caseStudy: z.string().url().optional(),
});

const ProjectSchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  description: z.string(),
  highlights: z.array(z.string()).optional(),
  tech: z.array(z.string()),
  image: z.string().optional(),
  thumbnail: z.string().optional(),
  status: z.string().optional(),
  tags: z.array(z.string()).optional(),
  year: z.string().optional(),
  links: LinkSet.optional(),
});

const ProjectsSchema = z.array(ProjectSchema);

export function getProjects(): Project[] {
  const parsed = ProjectsSchema.safeParse(projects);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'} - ${i.message}`).join('\n');
    throw new Error(`Invalid projects.json:\n${message}`);
  }
  return parsed.data as Project[];
}
