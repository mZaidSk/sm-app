import React, { useState, useEffect, useRef } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User, Settings, Search } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/AuthSlice";

const MainLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<
        {
            name: string;
            avatar: string;
        }[]
    >([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);

    const users = [
        { name: "Alice", avatar: "https://via.placeholder.com/40" },
        { name: "Bob", avatar: "https://via.placeholder.com/40" },
        { name: "Charlie", avatar: "https://via.placeholder.com/40" },
        { name: "David", avatar: "https://via.placeholder.com/40" },
        { name: "Eva", avatar: "https://via.placeholder.com/40" },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSuggestions(users);
        } else {
            const filteredSuggestions = users.filter((user) =>
                user.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        setShowSuggestions(false);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10 border-b-2 border-gray-100">
                    <SidebarTrigger />
                    <div className="relative w-full max-w-lg" ref={inputRef}>
                        {/* Search Input */}
                        <div className="relative flex items-center">
                            <Input
                                type="text"
                                placeholder="Search for users..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={() => setShowSuggestions(true)}
                                className="pr-10 pl-4 py-2 h-10 rounded-md border-gray-300 shadow-sm focus:ring-2 w-full"
                            />
                            <Search className="absolute right-3 top-2 text-gray-400" />
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && (
                            <Card className="absolute bg-white border mt-2 w-full max-h-60 overflow-y-auto z-20 shadow-md rounded-md">
                                <CardContent>
                                    {suggestions.length === 0 ? (
                                        <div className="text-gray-500 text-center py-2">
                                            No user found
                                        </div>
                                    ) : (
                                        suggestions.map(({ name, avatar }) => (
                                            <div
                                                key={name}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-md"
                                                onClick={() =>
                                                    handleSuggestionClick(name)
                                                }
                                            >
                                                <Avatar>
                                                    <AvatarImage src={avatar} />
                                                    <AvatarFallback>
                                                        {name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-gray-800 font-medium">
                                                    {name}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://via.placeholder.com/150" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <User className="mr-2" />
                                    <Link to={"profile"}>Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2" /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="bg-gray-50 flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;
