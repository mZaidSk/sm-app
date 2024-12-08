import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SettingSidebar } from "./SettingSidebar";

// Sidebar menu items
const menuItems = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];

function SettingLayout() {
    return (
        <div className="!h-[90vh] overflow-hidden">
            <SidebarProvider className="flex h-full items-start">
                {/* Sidebar with fixed height */}
                <SettingSidebar className="flex-shrink-0 w-64 bg-blue-200 h-full overflow-auto" />

                {/* Scrollable content area */}
                <SidebarInset className="flex-1 h-full overflow-y-auto bg-red-200">
                    <div className="gap-4 p-4 overflow-y-auto">
                        {/* Outlet or other content */}
                        <Outlet />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}

export default SettingLayout;
