import { Persona } from "~/models/persona";
import { CommonSubHeader } from "~/components/common/CommonSubHeader";

// loader

import { loader as dashboardLoader } from "@/routes/loader+/feature+/dashboard+/dashboard.loader";
import { CreatorDashboard } from "~/components/creator/routes/dashboard/creator-dashboard";
export const loader = dashboardLoader;

export const renderDashboard = ({ role }: { role: Persona }) => {
  if (role === Persona.CREATOR) {
    return <CreatorDashboard />;
  } else if (role === Persona.EDITOR) {
    return <div>Editor</div>;
  }
  return <div>Admin</div>;
};

export default function Dashboard() {
  return (
    <div className="h-fit w-full p-3">
      <CommonSubHeader userName="Harsha Leo" role="Admin" />
      {renderDashboard({ role: Persona.CREATOR })}
    </div>
  );
}
