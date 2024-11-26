import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; // Assuming Sidebar component is imported from shadcn/ui
import { LogOut } from "lucide-react"; // Icons
import { Link, Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/AuthSlice";

const MainLayout = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <SidebarProvider>
            {/* Sidebar */}
            <AppSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col ">
                <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-auto">
                    <SidebarTrigger />
                    <h2 className="text-xl font-semibold">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline">Search</Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://via.placeholder.com/150" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link to={"profile"}>Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2" /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Content */}
                <main className="bg-gray-100 flex-1">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;
