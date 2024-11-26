// src/slices/chatSlice.ts
import {
    createDirectChatApi,
    createGroupChatApi,
    getChatByChatIdApi,
    getChatsByUserIdApi,
    getMessagesApi,
} from "@/services/ChatService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ChatState {
    chats: any[];
    messages: any[];
    selectedChat: any | null; // Add selectedChat to store the chat by ID
    loading: boolean;
    error: string | null;
}

const initialState: ChatState = {
    chats: [],
    messages: [],
    selectedChat: null, // Initialize with null
    loading: false,
    error: null,
};

// Async thunks to handle the API calls
export const fetchChatsByUserId = createAsyncThunk(
    "chat/fetchChatsByUserId",
    async (userId: string) => {
        const response = await getChatsByUserIdApi(userId);
        return response.data;
    }
);

// Async thunk to fetch a chat by its ID
export const fetchChatById = createAsyncThunk(
    "chat/fetchChatById",
    async (chatId: string) => {
        const response = await getChatByChatIdApi(chatId); // Assuming you have a function to fetch the chat
        return response.data;
    }
);

export const fetchMessagesByChatId = createAsyncThunk(
    "chat/fetchMessagesByChatId",
    async (chatId: string) => {
        const response = await getMessagesApi({ chatId });
        return response.data;
    }
);

export const createDirectChat = createAsyncThunk(
    "chat/createDirectChat",
    async (payload: any) => {
        const response = await createDirectChatApi(payload);
        return response.data;
    }
);

export const createGroupChat = createAsyncThunk(
    "chat/createGroupChat",
    async (payload: any) => {
        const response = await createGroupChatApi(payload);
        return response.data;
    }
);

// Slice
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch chats by user ID
            .addCase(fetchChatsByUserId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChatsByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload;
            })
            .addCase(fetchChatsByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch chats";
            })
            // Fetch messages by chat ID
            .addCase(fetchMessagesByChatId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessagesByChatId.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessagesByChatId.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch messages";
            })
            // Create direct chat
            .addCase(createDirectChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDirectChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chats.push(action.payload);
            })
            .addCase(createDirectChat.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to create direct chat";
            })
            // Create group chat
            .addCase(createGroupChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(createGroupChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chats.push(action.payload);
            })
            .addCase(createGroupChat.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to create group chat";
            })
            // Fetch chat by ID
            .addCase(fetchChatById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChatById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedChat = action.payload; // Store the selected chat
            })
            .addCase(fetchChatById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch chat by ID";
            });
    },
});

export default chatSlice.reducer;
