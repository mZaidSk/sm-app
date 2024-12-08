import * as React from "react";
import { GalleryVerticalEnd, Settings } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Profile Settings",
            items: [
                {
                    title: "Edit Profile",
                    url: "/settings/edit-profile",
                },
                {
                    title: "Change Password",
                    url: "/settings/change-password",
                },
            ],
        },
        {
            title: "History Settings",
            items: [
                {
                    title: "Likes",
                    url: "/settings/likes",
                },
                {
                    title: "Comments",
                    url: "/settings/comments",
                },
            ],
        },

        {
            title: "General Settings",
            items: [
                {
                    title: "Help",
                    url: "/settings/help",
                },
                {
                    title: "FAQ",
                    url: "/settings/faq",
                },
            ],
        },

        {
            title: "Terms and Policies",
            items: [
                {
                    title: "Terms & Conditions",
                    url: "/settings/tandc",
                },
                {
                    title: "Privacy Policies",
                    url: "/settings/pandp",
                },
            ],
        },
    ],
};

export function SettingSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props} collapsible="none" className="bg-blue-200">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/settings">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Settings className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        Settings
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <SidebarGroup key={item.title}>
                                <SidebarGroupLabel>
                                    {item.title}
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    {/* isActive={item.isActive} */}
                                                    <Link to={item.url}>
                                                        {item.title}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
