import { loader as dashboardLoader } from "@/routes/loader+/feature+/dashboard+/dashboard.loader";
export const loader = dashboardLoader;

export const renderDashboard = ({role:Persona}) => {

};

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full  w-full items-center justify-center">
      {" "}
      Dashboard
    </div>
  );
}
