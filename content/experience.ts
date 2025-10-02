import { z } from 'zod';
import type { Experience } from './types';
import experience from './experience.json';

const ExperienceSchema = z.object({
  title: z.string(),
  organization: z.string(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  highlights: z.array(z.string()),
});

const ExperiencesSchema = z.array(ExperienceSchema);

export function getExperience(): Experience[] {
  const parsed = ExperiencesSchema.safeParse(experience);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'} - ${i.message}`).join('\n');
    throw new Error(`Invalid experience.json:\n${message}`);
  }
  return parsed.data as Experience[];
}
