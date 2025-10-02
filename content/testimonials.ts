import { z } from 'zod';
import type { Testimonial } from './types';
import testimonials from './testimonials.json';

const TestimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string().optional(),
  quote: z.string(),
  image: z.string().optional(),
});

const TestimonialsSchema = z.array(TestimonialSchema);

export function getTestimonials(): Testimonial[] {
  const parsed = TestimonialsSchema.safeParse(testimonials);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'} - ${i.message}`).join('\n');
    throw new Error(`Invalid testimonials.json:\n${message}`);
  }
  return parsed.data as Testimonial[];
}
