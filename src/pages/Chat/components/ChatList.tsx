import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ChatList = ({ setChatId }: { setChatId: (id: string) => void }) => {
    const chatSelector = useSelector((state: RootState) => state.chat.chats);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="relative h-full flex">
            {/* Toggle Button for Mobile */}
            <Button
                className="fixed bottom-8 right-4 z-20 bg-gray-700 text-white lg:hidden rounded-full p-3 shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <Menu size={20} />
            </Button>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 right-0 w-80 bg-gray-50 transform transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 lg:relative lg:w-96 lg:flex flex-col z-50`}
            >
                {/* Search Bar */}
                <div className="px-4 py-5 bg-gradient-to-r from-white to-gray-100 sticky top-0 z-10 shadow-sm border-2">
                    <Input
                        type="text"
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    />
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatSelector.length > 0 ? (
                        chatSelector.map((chat) => (
                            <Card
                                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-transform transform group-hover:scale-[1.02]"
                                key={chat.chatId}
                                onClick={() => setChatId(chat.chatId)} // Set chatId on click
                            >
                                {/* Avatar */}
                                <div className="relative">
                                    <Avatar className="w-14 h-14 border-2 border-blue-500">
                                        <AvatarImage
                                            src={
                                                chat?.participants[0]?.user
                                                    ?.profilePictureUrl ||
                                                "https://via.placeholder.com/80"
                                            }
                                        />
                                        <AvatarFallback className="text-white bg-blue-500">
                                            {chat?.participants[0]?.user?.firstName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Online Badge */}
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                </div>

                                {/* Chat Details */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium text-gray-800 truncate">
                                            {
                                                chat?.participants[0]?.user
                                                    ?.userName
                                            }
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                chat.lastMessageAt
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">
                                        Last message at{" "}
                                        {new Date(
                                            chat.lastMessageAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center mt-10">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="No chats found"
                                className="mx-auto mb-6 w-40 h-40 opacity-40"
                            />
                            <p className="text-gray-500">No chats found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Background Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default ChatList;
