import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CommonSidebar } from "../../components/common/CommonSidebar";
import { Outlet, useLoaderData } from "@remix-run/react";
import { CommonHeader } from "../../components/common/CommonHeader";
import { NavLinks } from "~/models/navlinks";

// loader

import { loader as featureLoader } from "@/routes/loader+/feature.loader";
import { Persona } from "~/models/persona";
import { CreatorNavLinks } from "~/components/creator/models/creator-nav";
import { EditorNavLinks } from "~/components/editor/models/editor-nav";

export const loader = featureLoader;

export default function FeatureLayout() {
  const { role } = useLoaderData<typeof loader>() as { role: Persona };
  const GetNavLinks = () => {
    if (role === Persona.CREATOR) {
      return CreatorNavLinks;
    }
    if (role === Persona.EDITOR) {
      return EditorNavLinks;
    }
    return NavLinks;
  };
  return (
    <SidebarProvider>
      <CommonSidebar data={GetNavLinks()} variant="inset" />
      <SidebarInset>
        <CommonHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
