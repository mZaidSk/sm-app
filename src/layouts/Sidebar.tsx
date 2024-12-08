import {
    Calendar,
    ChevronDown,
    ChevronUp,
    Home,
    Inbox,
    MessageCircle,
    Search,
    Settings,
    SquarePlus,
    User2,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/slice/AuthSlice";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },

    {
        title: "Post",
        url: "/post",
        icon: SquarePlus,
    },
    {
        title: "Chat",
        url: "/chat",
        icon: MessageCircle,
    },

    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];

export function AppSidebar() {
    const dispatch = useDispatch<AppDispatch>();

    const authUserSelector = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    };

    return (
        <Sidebar collapsible="icon" side="left">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="py-5">
                                    <Home /> LatZio
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Privacy Policy</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Term & Conditions</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="py-5">
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="py-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex items-center py-5 gap-3">
                                    {/* Profile Picture */}
                                    <div className="w-8 h-8 rounded-full overflow-hidden">
                                        {authUserSelector.profilePictureUrl ? (
                                            <img
                                                src={
                                                    authUserSelector.profilePictureUrl
                                                }
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                                                {authUserSelector.firstName[0]}
                                            </div>
                                        )}
                                    </div>
                                    {/* Username */}
                                    <span className="text-sm font-medium text-gray-800">
                                        {authUserSelector.username}
                                    </span>
                                    {/* Chevron Icon */}
                                    <ChevronUp className="ml-auto text-gray-500" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <Link to={"profile"}>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                </Link>

                                <DropdownMenuItem
                                    onClick={() => handleLogout()}
                                    className="cursor-pointer"
                                >
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
