import { z } from 'zod';
import type { Award } from './types';
import awards from './awards.json';

const AwardSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  date: z.string().optional(),
  description: z.string().optional(),
  image: z.string(),
  credentialUrl: z.string().url().optional(),
  highlight: z.string().optional(),
  icon: z.string().optional(),
});

const AwardsSchema = z.array(AwardSchema);

export function getAwards(): Award[] {
  const parsed = AwardsSchema.safeParse(awards);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'} - ${i.message}`).join('\n');
    throw new Error(`Invalid awards.json:\n${message}`);
  }
  return parsed.data as Award[];
}
