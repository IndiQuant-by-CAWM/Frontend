import type { Metadata } from "next";
import { CommunitySection } from "@/components/sections/community-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InfrastructureSection } from "@/components/sections/infrastructure-section";
import { IntelligenceLayerSection } from "@/components/sections/intelligence-layer-section";
import { LiveDashboardSection } from "@/components/sections/live-dashboard-section";
import { ProductEcosystemSection } from "@/components/sections/product-ecosystem-section";
import { ResearchLabSection } from "@/components/sections/research-lab-section";
import { RoadmapSection } from "@/components/sections/roadmap-section";

export const metadata: Metadata = {
  title: "Computational Intelligence Infrastructure",
  description:
    "Institutional quant ecosystem for distributed research, signal processing, and infrastructure-grade experimentation.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntelligenceLayerSection />
      <ResearchLabSection />
      <InfrastructureSection />
      <LiveDashboardSection />
      <ProductEcosystemSection />
      <CommunitySection />
      <RoadmapSection />
    </>
  );
}
