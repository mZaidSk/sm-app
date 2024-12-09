import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell } from "lucide-react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import FriendRequestPopover from "@/components/common/FriendRequestPopover";
import { getPendingRequests } from "@/store/slice/FriendSlice";

const MainLayout = () => {
    const dispatch = useDispatch<AppDispatch>();

    // const authUserSelector = useSelector((state: RootState) => state.auth.user);
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

    useEffect(() => {
        fetchPendingRequest();
    }, []);

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

    const pendingRequests = [
        { name: "John Doe", requestDate: "2024-12-05" },
        { name: "Jane Smith", requestDate: "2024-12-07" },
    ]; // Example pending requests

    const fetchPendingRequest = () => {
        dispatch(getPendingRequests());
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
                        <FriendRequestPopover />
                        <Bell className="text-gray-500 cursor-pointer" />
                    </div>
                </header>
                <main className="bg-gray-50 flex-1">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
};

export default MainLayout;
