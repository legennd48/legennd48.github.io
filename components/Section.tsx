type Props = {
  id?: string;
  title: string;
  children: React.ReactNode;
};

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="mt-20 scroll-mt-28">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-sm uppercase tracking-[0.45em] text-slate-300">
          {title}
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" aria-hidden />
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
