import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the message type
interface Message {
    id: string; // Unique message ID
    senderId: string; // User ID of the sender
    content: string; // Message content
    timestamp: string; // Timestamp of the message
    seen?: boolean; // Optional seen status
}

// Define the chat type
interface Chat {
    id: string; // Unique chat ID
    name: string; // Name of the chat (or user in direct messages)
    participants: string[]; // List of user IDs in the chat
    lastMessage?: any; // Last message in the chat (optional)
}

// Define the slice state type
interface ChatState {
    chats: Chat[]; // List of chats
    messages: Record<string, Message[]>; // Messages organized by chatId
    currentChatId: string | null; // Currently open chat
    error: string | null; // Error message
}

const initialState: ChatState = {
    chats: [],
    messages: {},
    currentChatId: null,
    error: null,
};

const chatSocketSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats(state, action: PayloadAction<Chat[]>) {
            console.log(action);
            state.chats = action.payload;
        },
        setMessages(state, action) {
            const { chatId, messages } = action.payload;
            state.messages[chatId] = messages;
        },

        addMessage(
            state,
            action: PayloadAction<{ chatId: string; message: Message }>
        ) {
            const { chatId, message } = action.payload;
            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }
            state.messages[chatId].push(message);

            // Update last message in the chat
            const chat = state.chats.find((chat) => chat.id === chatId);
            if (chat) {
                chat.lastMessage = message;
            }
        },

        setCurrentChatId(state, action: PayloadAction<string | null>) {
            state.currentChatId = action.payload;
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },

        // Update the last message of the chat when a new message is sent
        updateLastMessage(
            state,
            action: PayloadAction<{ chatId: string; message: Message }>
        ) {
            const { chatId, message } = action.payload;
            const chat = state.chats.find((chat) => chat.id === chatId);
            if (chat) {
                chat.lastMessage = message;
            }
        },

        // Mark messages as seen
        markMessagesAsSeen(state, action: PayloadAction<{ chatId: string }>) {
            const { chatId } = action.payload;
            if (state.messages[chatId]) {
                state.messages[chatId] = state.messages[chatId].map(
                    (message) => ({
                        ...message,
                        seen: true, // Mark as seen
                    })
                );
            }
        },

        // Delete a message from a chat
        deleteMessage(
            state,
            action: PayloadAction<{ chatId: string; messageId: string }>
        ) {
            const { chatId, messageId } = action.payload;
            if (state.messages[chatId]) {
                state.messages[chatId] = state.messages[chatId].filter(
                    (message) => message.id !== messageId
                );
            }
        },

        // Delete a chat and its messages
        deleteChat(state, action: PayloadAction<string>) {
            const chatId = action.payload;
            state.chats = state.chats.filter((chat) => chat.id !== chatId);
            delete state.messages[chatId];
        },

        // Initialize state with chats and messages
        initializeState(state, action: PayloadAction<ChatState>) {
            return action.payload;
        },
    },
});

export const {
    setChats,
    setMessages,
    addMessage,
    setCurrentChatId,
    setError,
    updateLastMessage,
    markMessagesAsSeen,
    deleteMessage,
    deleteChat,
    initializeState,
} = chatSocketSlice.actions;

export default chatSocketSlice.reducer;
