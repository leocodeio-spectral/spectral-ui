import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CommonSidebar } from "../../components/common/CommonSidebar";
import { Outlet, useLoaderData } from "@remix-run/react";
import { CommonHeader } from "../../components/common/CommonHeader";
import { NavLinks } from "~/models/navlinks";

export default function FeatureLayout() {
  return (
    <SidebarProvider>
      <CommonSidebar data={NavLinks} variant="inset" />
      <SidebarInset>
        <CommonHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
