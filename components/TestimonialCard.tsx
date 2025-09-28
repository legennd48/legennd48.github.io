import Image from 'next/image';
import type { Testimonial } from '@/content/types';

type Props = { testimonial: Testimonial };

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <figure className="reveal flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.3)] backdrop-blur transition duration-300 hover:border-fuchsia-300/60 hover:shadow-[0_24px_70px_rgba(232,121,249,0.25)]">
      <div className="flex items-center gap-4">
        {testimonial.image ? (
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
            <Image
              src={testimonial.image}
              alt={`${testimonial.name} portrait`}
              fill
              sizes="56px"
              className="object-cover"
              priority={false}
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/20 text-lg font-semibold text-slate-300">
            {testimonial.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>
        )}
        <div>
          <figcaption className="font-display text-base text-slate-100">
            {testimonial.name}
          </figcaption>
          <p className="text-sm text-slate-300/80">
            {testimonial.role}
            {testimonial.company ? ` · ${testimonial.company}` : ''}
          </p>
        </div>
      </div>
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-200/90">
        “{testimonial.quote}”
      </blockquote>
    </figure>
  );
}
