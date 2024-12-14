import ChatList from "./components/ChatList";
import ChatRoom from "./components/ChatRoom";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect, useState, useRef } from "react";

const ChatPage = () => {
    const socketService = useContext(SocketContext);
    const [chats, setChats] = useState<any>([]);
    const [messages, setMessages] = useState<any>([]);
    const [currentChat, setCurrentChat] = useState<any>(null);
    const [newMessage, setNewMessage] = useState<string>(""); // State to handle new message input
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!socketService) return;

        // Load chats
        socketService.emit("loadChats");
        socketService.on("chatsLoaded", ({ chats }) => {
            setChats(chats);
        });

        // Listen for new messages
        socketService.on("receiveMessage", (message) => {
            setMessages((prevMessages: any) => [...prevMessages, message]);
        });

        socketService.on("messageSent", ({ message }) => {
            console.log(message);
            setMessages((prevMessages: any) => [...prevMessages, message]);
        });

        return () => {
            socketService.socket?.off("chatsLoaded");
            socketService.socket?.off("receiveMessage");
            socketService.socket?.off("messageSent");
        };
    }, [socketService]);

    const joinChat = (chat: any) => {
        if (!socketService) return;

        socketService.emit("joinChat", { chatId: chat.id });
        setCurrentChat(chat);

        socketService.on("chatJoined", ({ messages }) => {
            setMessages(messages);
        });
    };

    const sendMessage = () => {
        if (!socketService || !currentChat.id || !newMessage.trim()) return;

        // setMessages((prevMessages: any) => [...prevMessages, newMessage]);

        socketService.emit("sendMessage", {
            chatId: currentChat.id,
            content: newMessage,
            messageType: "TEXT",
        });

        setNewMessage(""); // Clear the message input after sending
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="h-[calc(100vh-5rem)] flex flex-col">
            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 border-r border-gray-300 h-full overflow-auto">
                    <ChatRoom
                        chat={currentChat}
                        messages={messages}
                        newMessage={newMessage} // Pass newMessage to ChatRoom
                        setNewMessage={setNewMessage} // Pass setNewMessage to ChatRoom
                        sendMessage={sendMessage} // Pass sendMessage to ChatRoom
                    />
                </div>

                <div className="flex-2 h-full p-0">
                    <ChatList
                        chats={chats}
                        joinChat={(chat: any) => joinChat(chat)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
