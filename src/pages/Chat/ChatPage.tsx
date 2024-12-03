import { useDispatch, useSelector } from "react-redux";
import ChatList from "./components/ChatList";
import ChatRoom from "./components/ChatRoom";
import { AppDispatch, RootState } from "@/store/store";
import useChatSocket from "@/hooks/useChatSocket";
import { useEffect, useState } from "react";
import {
    fetchChatById,
    fetchChatsByUserId,
    fetchMessagesByChatId,
} from "@/store/slice/ChatSlice";
import websocket from "@/services/WebSocketService";
import { addMessage } from "@/store/slice/ChatSocketSlice";

const ChatPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    // const userSelector = useSelector((state: RootState) => state.auth.user);
    const [message, setMessage] = useState("");

    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    // console.log(userSelector);

    websocket.connect(localStorage.getItem("token") || "");

    useEffect(() => {
        dispatch(fetchChatsByUserId("806e3060-db33-4875-a1ce-3e39bdf68e35"));
    }, [dispatch]);

    useEffect(() => {
        if (selectedChatId) {
            dispatch(fetchMessagesByChatId(selectedChatId));
            dispatch(fetchChatById(selectedChatId));
        }
    }, [dispatch, selectedChatId]);

    // Initialize WebSocket listeners

    return (
        <div className="h-[calc(100vh-5rem)] flex flex-col">
            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left side: Chat Room */}
                <div className="flex-1 border-r border-gray-300 h-full overflow-auto">
                    <ChatRoom chatId={selectedChatId} />
                </div>

                {/* Right side: Chat List */}
                <div className="flex-2 h-full p-0">
                    <ChatList setChatId={setSelectedChatId} />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
