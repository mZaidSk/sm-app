import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, ChevronDown, Circle, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ChatRoom = ({
    chat,
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
}: {
    chat: any;
    messages: any;
    newMessage: string;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
}) => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    console.log(chat);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Detect if the user has scrolled up
    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const bottom =
            e.currentTarget.scrollHeight ===
            e.currentTarget.scrollTop + e.currentTarget.clientHeight;
        setShowScrollToBottom(!bottom);
    };

    if (!chat?.id) {
        return (
            <div className="flex justify-center items-center h-full text-gray-500">
                <p>
                    No chat room selected. Please select a valid chat room to
                    continue.
                </p>
            </div>
        );
    }

    return (
        <Card className="flex h-full flex-col shadow-lg bg-white border border-gray-200 rounded-lg p-0 m-0 relative">
            <CardHeader className="px-4 py-2 flex items-start justify-between sticky top-0 border-b-2 bg-white z-auto">
                <Link
                    to={`/profile/${chat?.otherUser?.id}`}
                    className="flex items-center space-x-4 w-full"
                >
                    <Avatar className="w-16 h-16">
                        <AvatarImage
                            src={chat?.otherUser?.profilePictureUrl}
                            alt="Profile Img"
                        />
                        <AvatarFallback>
                            {chat?.otherUser?.firstName
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>

                    {chat?.chatType === "DIRECT" ? (
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    <span className="font-medium">
                                        {chat?.otherUser?.firstName}
                                    </span>{" "}
                                    <span className="font-medium">
                                        {chat?.otherUser?.lastName}
                                    </span>
                                </h2>
                                <span className="text-xs block text-gray-600">
                                    @{chat?.otherUser?.username}
                                </span>
                            </div>
                            {chat?.otherUser?.status === "ACTIVE" ? (
                                <div className="flex items-center gap-2">
                                    <Circle
                                        className="w-4 h-4 text-green-500"
                                        fill="currentColor"
                                    />
                                    <span className="text-sm font-medium text-green-600">
                                        Online
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">
                                        Last seen: 10 minutes ago
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                John Doe
                            </h2>
                            <span className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-4 h-4" />
                                {formatDistanceToNow(
                                    new Date(
                                        chat?.otherUser?.lastActiveAt?.sentAt
                                    ),
                                    {
                                        addSuffix: true,
                                    }
                                )}
                            </span>
                        </div>
                    )}
                </Link>
            </CardHeader>

            {/* Chat Messages Area */}
            <CardContent
                className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50"
                onScroll={handleScroll}
            >
                {messages.length ? (
                    messages.map((mes: any) => {
                        // Check if the message is sent by the authenticated user
                        if (mes?.sender?.id === authUser?.id) {
                            return (
                                <div className="flex justify-end" key={mes?.id}>
                                    <div className="flex items-start gap-4 flex-row-reverse max-w-lg">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage
                                                src={
                                                    mes?.sender
                                                        ?.profilePictureUrl
                                                }
                                                alt="Sender Name"
                                            />
                                            <AvatarFallback>J</AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <div className="bg-gray-700 text-white p-4 shadow-sm rounded-lg min-w-56">
                                                {mes?.content}
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1 block text-right">
                                                {mes?.sentAt &&
                                                    formatDistanceToNow(
                                                        new Date(mes?.sentAt),
                                                        { addSuffix: true }
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    className="flex justify-start"
                                    key={mes?.id}
                                >
                                    <div className="flex items-start gap-4 max-w-lg">
                                        <Link
                                            to={`/profile/${mes?.sender?.id}`}
                                        >
                                            <Avatar className="w-12 h-12">
                                                <AvatarImage
                                                    src={
                                                        mes?.sender
                                                            ?.profilePictureUrl
                                                    }
                                                    alt="Sender Name"
                                                />
                                                <AvatarFallback>
                                                    J
                                                </AvatarFallback>
                                            </Avatar>
                                        </Link>
                                        <div>
                                            <div className="bg-gray-300 p-4 text-gray-900 shadow-sm rounded-lg min-w-56">
                                                {mes?.content}
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1 block">
                                                {mes?.sentAt &&
                                                    formatDistanceToNow(
                                                        new Date(mes?.sentAt),
                                                        { addSuffix: true }
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })
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
                <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <CardFooter className="p-4 bg-gray-100 border-t border-gray-200 sticky bottom-0">
                <div className="flex items-center space-x-4 w-full">
                    <Textarea
                        value={newMessage} // Bind value to newMessage
                        onChange={(e) => setNewMessage(e.target.value)} // Update newMessage when user types
                        className="flex-grow border border-gray-300 px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all overflow-hidden"
                        placeholder="Type your message..."
                        rows={1}
                    />
                    <Button
                        className="bg-gray-700 text-white hover:bg-gray-800 px-6 py-2 flex items-center space-x-2 shadow-lg transition-all"
                        onClick={sendMessage}
                    >
                        <MessageCircle size={20} />
                        <span>Send</span>
                    </Button>
                </div>
            </CardFooter>

            {/* Scroll to bottom button */}
            {showScrollToBottom && (
                <Button
                    className="fixed bottom-28 right-96 bg-gray-700 text-white p-2 shadow-lg"
                    onClick={() => {
                        if (messagesEndRef.current) {
                            messagesEndRef.current.scrollIntoView({
                                behavior: "smooth",
                            });
                        }
                    }}
                >
                    <ChevronDown size={20} />
                </Button>
            )}
        </Card>
    );
};

export default ChatRoom;
