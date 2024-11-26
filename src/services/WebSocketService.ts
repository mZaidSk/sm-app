import socket from "./instance/webSocketInstance";

export const sendMessage = (
    chatId: string,
    senderId: string,
    content: string
) => {
    socket.emit("sendMessage", { chatId, senderId, content });
};

export const joinChat = (chatId: string) => {
    socket.emit("joinChat", chatId);
};

export const leaveChat = (chatId: string) => {
    socket.emit("leaveChat", chatId);
};

export const markMessageAsRead = (messageId: string, userId: string) => {
    socket.emit("markMessageAsRead", { messageId, userId });
};
