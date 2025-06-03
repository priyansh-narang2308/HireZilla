"use client";

import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarOptions } from "@/services/constant";
import { Plus, LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { supabase } from "@/services/supabase-client";
import toast from "react-hot-toast";
import Link from "next/link";

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout failed:", error.message);
            toast.error("Logout Failed!");
        } else {
            router.push("/auth");
            toast.success("Logout Successfull!");
        }
    };

    return (
        <Sidebar className="min-h-screen w-[260px] bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)] shadow-lg">
            <SidebarHeader className="flex flex-col items-center gap-4 p-6">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="HireZilla"
                        width={190}
                        height={170}
                        className="drop-shadow-md"
                    />
                </Link>
                <Button
                    onClick={() => router.push("/dashboard/create-interview")}
                    className="w-full bg-green-500 cursor-pointer hover:bg-green-400 text-black font-semibold text-sm py-2 rounded-lg transition-all shadow-green-500/20 shadow-md"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Interview
                </Button>
            </SidebarHeader>

            <SidebarContent className="px-4">
                <SidebarGroup>
                    <SidebarMenu className="space-y-1">
                        {SidebarOptions.map((option, index) => (
                            <SidebarMenuItem
                                key={index}
                                onClick={() => router.push(option.path)}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all",
                                    pathname === option.path
                                        ? "bg-green-600/20 text-green-700 font-semibold"
                                        : "text-[var(--sidebar-foreground)] hover:bg-green-600/10 hover:text-black"
                                )}
                            >
                                <option.icon className="w-5 h-5" />
                                <span className="text-sm">{option.name}</span>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto p-4 border-t border-[var(--sidebar-border)]">
                <Button
                    variant="ghost"
                    className="w-full cursor-pointer justify-start text-[var(--sidebar-foreground)] hover:text-black hover:bg-green-600/10"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
