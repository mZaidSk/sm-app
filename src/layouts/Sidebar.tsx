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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    url: "/settings",
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
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={authUserSelector?.profilePictureUrl}
                      alt={authUserSelector?.firstName}
                    />
                    <AvatarFallback className="rounded-lg">
                      {authUserSelector?.firstName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">LatZio</span>
                  </div>

                  {/* Chevron Icon */}
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
                  <SidebarMenuButton asChild size="lg" tooltip={item.title}>
                    {/* <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link> */}

                    <Link to={item.url}>
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                        <item.icon size={24} color="gray" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold">{item.title}</span>
                      </div>
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
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={authUserSelector?.profilePictureUrl}
                      alt={authUserSelector?.firstName}
                    />
                    <AvatarFallback className="rounded-lg">
                      {authUserSelector?.firstName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {authUserSelector?.firstName}
                    </span>
                    <span className="truncate text-xs">
                      @{authUserSelector?.username}
                    </span>
                  </div>

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
