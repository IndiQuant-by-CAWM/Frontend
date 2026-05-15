import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppRouter } from "@/router/app-router";

function App() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IndiQuant",
    url: "https://indiquantresearch.in",
    sameAs: ["https://indiquantresearch.in/team/", "https://indiquantresearch.in/careers/"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,var(--color-grid)_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(26,58,109,0.35),transparent_45%),radial-gradient(circle_at_78%_8%,rgba(58,133,173,0.14),transparent_40%),linear-gradient(180deg,#070b10_0%,#070b10_100%)]" />
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <SiteHeader />
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 sm:px-6 lg:px-10">
          <main className="flex-1">
            <AppRouter />
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}

export default App;
