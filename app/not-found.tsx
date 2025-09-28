export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        The page you’re looking for doesn’t exist. Return to <a className="underline" href="/">home</a>.
      </p>
    </main>
  );
}
