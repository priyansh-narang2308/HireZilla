import { Calendar, LayoutDashboardIcon, List, Settings, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name: "Dashboard",
        icon: LayoutDashboardIcon,
        path: "/dashboard"
    },
    {
        name: "Scheduled Interview",
        icon: Calendar,
        path: "/scheduled-interview"
    },
    {
        name: "My Interviews",
        icon: List,
        path: "/all-interview"
    },
    {
        name: "Billing",
        icon: WalletCards,
        path: "/billing"
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings"
    }
];