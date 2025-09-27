import { getSiteContent } from '@/content/schema';

export default function HomePage() {
  const site = getSiteContent();
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Hero */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight">{site.hero.name}</h1>
        <p className="mt-1 text-lg text-neutral-600 dark:text-neutral-300">{site.hero.role}</p>
        {site.hero.location && (
          <p className="text-sm text-neutral-500">{site.hero.location}</p>
        )}
        <p className="mt-4 max-w-3xl leading-relaxed text-neutral-700 dark:text-neutral-200">
          {site.hero.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a className="underline" href={`mailto:${site.hero.contacts.email}`}>Email</a>
          {site.hero.contacts.linkedin && (
            <a className="underline" href={site.hero.contacts.linkedin} target="_blank">LinkedIn</a>
          )}
          {site.hero.contacts.github && (
            <a className="underline" href={site.hero.contacts.github} target="_blank">GitHub</a>
          )}
          {site.hero.cta?.downloadCvUrl && (
            <a className="underline" href={site.hero.cta.downloadCvUrl} target="_blank">Download CV</a>
          )}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {site.skills.map((cat) => (
            <div key={cat.category} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
              <h3 className="font-medium">{cat.category}</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
