import { z } from 'zod';
import type { Certification } from './types';
import certifications from './certifications.json';

const CertificationSchema = z.object({
  title: z.string(),
  issuer: z.string().optional(),
  date: z.string().optional(),
  status: z.string().optional(),
  description: z.string().optional(),
  highlight: z.string().optional(),
  credentialUrl: z.string().url().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  icon: z.string().optional(),
  category: z.enum(['certification', 'completion', 'achievement', 'recognition']).optional(),
});

const CertificationsSchema = z.array(CertificationSchema);

export function getCertifications(): Certification[] {
  const parsed = CertificationsSchema.safeParse(certifications);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'} - ${i.message}`).join('\n');
    throw new Error(`Invalid certifications.json:\n${message}`);
  }
  return parsed.data as Certification[];
}
