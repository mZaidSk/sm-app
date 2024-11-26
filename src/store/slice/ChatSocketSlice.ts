import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the message type
interface Message {
    id: string; // Unique message ID
    senderId: string; // User ID of the sender
    content: string; // Message content
    timestamp: string; // Timestamp of the message
}

// Define the chat type
interface Chat {
    id: string; // Unique chat ID
    name: string; // Name of the chat (or user in direct messages)
    participants: string[]; // List of user IDs in the chat
    lastMessage?: Message; // Last message in the chat (optional)
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
            state.chats = action.payload;
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
        },
        setCurrentChatId(state, action: PayloadAction<string | null>) {
            state.currentChatId = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setChats, addMessage, setCurrentChatId, setError } =
    chatSocketSlice.actions;

export default chatSocketSlice.reducer;
