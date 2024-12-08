import React, { useState } from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    
    return (
        <div className="flex min-h-screen relative">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6 absolute top-0 left-0">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <div className="space-y-4">
                {menuItems.map((item) => (
                        <div key={item.title}>
                            {!item.subMenu ? (
                                <Link
                                    to={item.url}
                                    className="flex items-center gap-2 text-sm font-medium hover:bg-gray-700 p-2 rounded-md"
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.title}</span>
                                </Link>
                            ) : (
                                <div>
                                    <button
                                        onClick={() =>
                                            setDropdownOpen(!dropdownOpen)
                                        }
                                        className="flex items-center gap-2 text-sm font-medium hover:bg-gray-700 p-2 rounded-md w-full text-left"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="ml-6 space-y-2">
                                            {item.subMenu.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    to={subItem.url}
                                                    className={`flex items-center gap-2 text-sm font-medium hover:bg-gray-700 p-2 rounded-md ${
                                                        subItem.title ===
                                                        "Likes History"
                                                            ? "bg-gray-700"
                                                            : ""
                                                    }`}
                                                >
                                                    <subItem.icon className="h-4 w-4" />
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
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
