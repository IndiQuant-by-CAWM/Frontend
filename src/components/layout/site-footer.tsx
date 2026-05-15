export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="terminal-label text-[11px] text-ink-300">
          IndiQuant · Mumbai, Maharashtra
        </p>
        <p className="text-xs text-ink-500">
          Demo telemetry is simulated frontend data for product visualization only.
        </p>
      </div>
    </footer>
  );
}
