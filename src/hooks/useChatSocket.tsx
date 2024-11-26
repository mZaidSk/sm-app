import socket from "@/services/instance/webSocketInstance";
import { addMessage, setChats, setError } from "@/store/slice/ChatSocketSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useChatSocket = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Listen for the user's chats on connection
        socket.on("userChats", (chats) => {
            dispatch(setChats(chats));
        });

        // Listen for new messages
        socket.on("newMessage", (message) => {
            dispatch(addMessage({ chatId: message.chatId, message }));
        });

        // Handle errors
        socket.on("error", (error) => {
            dispatch(setError(error.message));
        });

        return () => {
            socket.off("userChats");
            socket.off("newMessage");
            socket.off("error");
        };
    }, [dispatch]);
};

export default useChatSocket;
