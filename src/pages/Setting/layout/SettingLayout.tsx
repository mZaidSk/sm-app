import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

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
        <div className="flex min-h-screen relative">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6 absolute top-0 left-0">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <div className="space-y-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.title}
                            to={item.url}
                            className="flex items-center gap-2 text-sm font-medium hover:bg-gray-700 p-2 rounded-md"
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 ml-64">
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default SettingLayout;
