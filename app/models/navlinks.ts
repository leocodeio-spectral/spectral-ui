import { DashboardIcon } from "@radix-ui/react-icons";

import { HomeIcon } from "@radix-ui/react-icons";

export const NavLinks = [
  { name: "Home", to: "/feature/home", icon: HomeIcon, role: [] },
  { name: "Dashboard", to: "/feature/dashboard", icon: DashboardIcon, role: ["creator"] },
];
