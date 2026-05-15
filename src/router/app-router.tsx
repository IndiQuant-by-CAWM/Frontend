import { Navigate, Route, Routes } from "react-router-dom";
import { CareersPage } from "@/pages/careers-page";
import { EcosystemPage } from "@/pages/ecosystem-page";
import { HomePage } from "@/pages/home-page";
import { ResearchPage } from "@/pages/research-page";
import { TeamPage } from "@/pages/team-page";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/ecosystem" element={<EcosystemPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
