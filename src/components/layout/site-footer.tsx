import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <p className="terminal-label text-[11px] text-primary-strong">IndiQuant</p>
          <p className="mt-3 text-sm text-ink-300">
            Institutional quant research infrastructure for distributed intelligence and auditable signal systems.
          </p>
          <p className="terminal-label mt-4 text-[10px] text-ink-500">Mumbai, Maharashtra</p>
        </div>

        <div>
          <p className="terminal-label text-[11px] text-ink-300">Platform</p>
          <div className="mt-3 space-y-2 text-sm text-ink-300">
            <Link to="/research" className="block hover:text-primary-strong">Research Lab</Link>
            <Link to="/ecosystem" className="block hover:text-primary-strong">Ecosystem</Link>
            <Link to="/team" className="block hover:text-primary-strong">Team</Link>
            <Link to="/careers" className="block hover:text-primary-strong">Careers</Link>
          </div>
        </div>

        <div>
          <p className="terminal-label text-[11px] text-ink-300">Contact</p>
          <div className="mt-3 space-y-2 text-sm text-ink-300">
            <a href="mailto:apply@indiquantresearch.in" className="block hover:text-primary-strong">apply@indiquantresearch.in</a>
            <a href="https://indiquantresearch.in/team/" className="block hover:text-primary-strong">Leadership Directory</a>
            <a href="https://indiquantresearch.in/careers/" className="block hover:text-primary-strong">Open Roles</a>
          </div>
        </div>

        <div>
          <p className="terminal-label text-[11px] text-ink-300">Data Notice</p>
          <p className="mt-3 text-sm text-ink-300">
            Dashboard and infrastructure insights are served with delayed data windows and do not represent real-time market feeds.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-border pt-4 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} IndiQuant Research. All rights reserved.</p>
        <p>Research infrastructure · Delayed telemetry publication</p>
      </div>
    </footer>
  );
}
