import React, { useState } from "react";
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
        title: 'Edit Profile',
        url: '/setting/edit-profile',
        icon: Home,
    },
    {
        title: 'Password',
        url: '/setting/password',
        icon: Home,
    },
    
    {
        title: "History",
        icon: Home,
        subMenu: [
            {
                title: "Likes",
                url: "/setting/history/likes",
                icon: Home,
            },
            {
                title: "Comments",
                url: "/setting/history/comments",
                icon: Home,
            },
        ],
    },
    {
        title: 'Help',
        url: '/setting/help',
        icon: Home,
    },
    {
        title: 'Privacy',
        url: '/setting/privacy',
        icon: Home,
    },
    
];

function SettingLayout() {

    
    return (
        <div className="!h-[90vh] overflow-hidden">
            <SidebarProvider className="flex h-full items-start">
                {/* Sidebar with fixed height */}
                <SettingSidebar className="flex-shrink-0 w-64 h-full overflow-auto" />

                {/* Scrollable content area */}
                <SidebarInset className="flex-1 h-full overflow-y-auto">
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
