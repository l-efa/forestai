export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6">
      <section className="w-full rounded-2xl border border-forest-500 bg-surface-black p-8 text-center shadow-2xl shadow-forest-900/30">
        <p className="text-sm uppercase tracking-[0.2em] text-content-secondary">404</p>
        <h1 className="mt-2 text-4xl font-bold text-forest-400">
          Page Not Found
        </h1>
        <p className="mt-3 text-content-soft">
          The page you requested does not exist.
        </p>
        <a href="/" className="btn btn-emerald mt-8 inline-block">
          Return Home
        </a>
      </section>
    </main>
  );
}
