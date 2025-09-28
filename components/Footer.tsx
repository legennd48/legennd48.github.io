export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 py-10">
  <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-3 px-6 text-xs uppercase tracking-[0.35em] text-slate-500 sm:flex-row sm:justify-between sm:px-8 lg:px-10">
        <p>© {new Date().getFullYear()} Abdulrazzaq A. Liasu</p>
        <p className="text-slate-600">Built with care & automation</p>
      </div>
    </footer>
  );
}
