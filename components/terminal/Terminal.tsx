"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { getSiteContent } from '@/content/schema';

type Entry = { text: string; type: 'input' | 'output' };

const site = getSiteContent();
const commands = new Set(["help", "projects", "backend", "security", "awards", "testimonials", "resume", "contact", "chess", "clear", "ls", "whoami"]);

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([]);
  const [pointer, setPointer] = useState<number>(-1);
  const [line, setLine] = useState<string>('');
  const [entries, setEntries] = useState<Entry[]>([
    { type: 'output', text: 'Welcome to Abdulrazzaq CLI. Type `help` to get started.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPrefRef = useRef<string>('');
  const cycleIndexRef = useRef<number>(0);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { inputRef.current?.scrollIntoView({ block: 'end' }); }, [entries]);

  const helpText = useMemo(() => (
    `Available commands:\n` +
    `  help      - show this help\n` +
    `  projects  - list all projects\n` +
  `  backend   - backend-related projects\n` +
  `  security  - security-related projects & certifications\n` +
  `  awards    - awards and certifications with highlights\n` +
  `  testimonials - short quotes from collaborators\n` +
    `  resume    - link to download CV\n` +
    `  contact   - show contact info\n` +
    `  chess     - chess teaching experience\n` +
    `  ls        - alias for projects\n` +
    `  clear     - clear the screen\n` +
    `  whoami    - show profile summary\n`
  ), []);

  function run(cmd: string) {
    const parts = cmd.trim().split(/\s+/);
    const c = parts[0]?.toLowerCase();
    if (!c) return;
    const out: string[] = [];
    switch (c) {
      case 'help':
        out.push(helpText + '\n(Hint: Press Tab to autocomplete, Shift+Tab to cycle backwards)');
        break;
      case 'clear':
        setEntries([{ type: 'output', text: 'Welcome to Abdulrazzaq CLI. Type `help` to get started.' }]);
        setPointer(-1);
        setLine('');
        return; // do not append input/output lines after clear
      case 'ls':
        out.push(site.projects.map(p => `• ${p.name} — ${p.description}`).join('\n'));
        break;
      case 'projects':
        out.push(site.projects.map(p => `• ${p.name} — ${p.description}`).join('\n'));
        break;
      case 'backend': {
        const list = site.projects.filter(p => p.tags?.includes('backend'));
        out.push(list.length ? list.map(p => `• ${p.name} — ${p.description}`).join('\n') : 'No backend projects found.');
        break;
      }
      case 'security': {
        const list = site.projects.filter(p => p.tags?.includes('security'));
        const certs = site.certifications?.map(c => `• ${c.title}${c.status ? ` — ${c.status}` : ''}`).join('\n') || '';
        const proj = list.length ? list.map(p => `• ${p.name} — ${p.description}`).join('\n') : '';
        out.push([proj, certs].filter(Boolean).join('\n'));
        break;
      }
      case 'awards': {
        const list = site.awards?.map((a) => `• ${a.title} — ${a.issuer}${a.date ? ` (${a.date})` : ''}${a.description ? `\n    ${a.description}` : ''}`);
        out.push(list && list.length ? list.join('\n') : 'No awards recorded yet.');
        break;
      }
      case 'testimonials': {
        const list = site.testimonials?.map((t) => `• ${t.name} (${t.role}${t.company ? `, ${t.company}` : ''})\n    “${t.quote}”`);
        out.push(list && list.length ? list.join('\n') : 'No testimonials available yet.');
        break;
      }
      case 'resume':
        out.push(site.hero.cta?.downloadCvUrl ? `CV: ${site.hero.cta.downloadCvUrl}` : 'CV link not available.');
        break;
      case 'contact':
        out.push(`Email: ${site.contact.email}\nLinkedIn: ${site.contact.linkedin || '-'}\nGitHub: ${site.contact.github || '-'}\nPhone: ${site.contact.phone || '-'}`);
        break;
      case 'chess':
        out.push(site.highlights?.chess || 'No chess information available.');
        break;
      case 'whoami':
        out.push(`${site.hero.name} — ${site.hero.role}\n${site.hero.summary}`);
        break;
      default:
        out.push(`Unknown command: ${c}. Type 'help'.`);
    }
    setEntries((e) => [...e, { type: 'input', text: cmd }, { type: 'output', text: out.join('\n') }]);
    setHistory((h) => [...h, cmd]);
    setPointer(-1);
    setLine('');
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(line);
      // reset autocomplete cycle state
      lastPrefRef.current = '';
      cycleIndexRef.current = 0;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = pointer < 0 ? history.length - 1 : Math.max(0, pointer - 1);
      setPointer(next);
      setLine(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = pointer < 0 ? -1 : Math.min(history.length - 1, pointer + 1);
      setPointer(next);
      setLine(next < 0 ? '' : history[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // simple autocomplete by prefix
      const pref = line.trim();
      if (!pref) return;
      const matches = Array.from(commands).filter((c) => c.startsWith(pref));
      if (matches.length === 0) return;
      const reversed = e.shiftKey;
      if (lastPrefRef.current !== pref) {
        lastPrefRef.current = pref;
        cycleIndexRef.current = 0;
      } else {
        cycleIndexRef.current = (cycleIndexRef.current + (reversed ? -1 : 1) + matches.length) % matches.length;
      }
      setLine(matches[cycleIndexRef.current]);
      // If multiple matches and user has already the current suggestion, show a quick list
      if (matches.length > 1 && line === matches[cycleIndexRef.current]) {
        setEntries((e) => [...e, { type: 'output', text: matches.join('  ') }]);
      }
    }
  }

  return (
  <div className="mx-auto max-w-screen-xl px-6 py-12">
      <div
        ref={containerRef}
        className="h-[60vh] overflow-auto rounded-3xl border border-white/10 bg-slate-950/85 font-mono text-slate-100 shadow-[0_30px_80px_rgba(15,23,42,0.65)] backdrop-blur-xl"
        onClick={() => inputRef.current?.focus()}
        role="region"
        aria-label="Interactive terminal"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.4em] text-slate-400">
          <span className="inline-flex h-2 w-2 rounded-full bg-red-400" aria-hidden />
          <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" aria-hidden />
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          <span className="ml-4">guest@portfolio:~</span>
        </div>
        <div className="p-4">
          {entries.map((en, idx) => (
            <pre
              key={idx}
              className={en.type === 'input' ? 'text-emerald-300' : 'text-slate-100/90'}
            >
              {en.text}
            </pre>
          ))}
          <div className="mt-2 flex items-center">
            <span className="mr-2 select-none text-emerald-300">$</span>
            <input
              ref={inputRef}
              className="w-full bg-transparent text-base text-slate-100 placeholder:text-slate-600 outline-none"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a command (try: help)"
              aria-label="Terminal input"
              inputMode="text"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
