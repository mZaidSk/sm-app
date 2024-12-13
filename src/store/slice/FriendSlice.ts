import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    Dispatch,
} from "@reduxjs/toolkit";
import {
    acceptFriendRequestApi,
    getFriendListApi,
    getPendingRequestsApi,
    getSuggestFriendsApi,
    removeFriendApi,
    sendFriendRequestApi,
} from "@/services/FriendService";

export const sendFriendRequest = createAsyncThunk(
    "friend/sendFriendRequest",
    async ({ friendId }: { friendId: string }, { rejectWithValue }) => {
        try {
            const response = await sendFriendRequestApi(friendId);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to send friend request"
            );
        }
    }
);

export const acceptFriendRequest = createAsyncThunk(
    "friend/acceptFriendRequest",
    async ({ friendId }: { friendId: string }, { rejectWithValue }) => {
        try {
            const response = await acceptFriendRequestApi(friendId);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to send friend request"
            );
        }
    }
);

export const removeFriend = createAsyncThunk(
    "friend/removeFriend",
    async ({ requestId }: { requestId: string }, { rejectWithValue }) => {
        try {
            const response = await removeFriendApi(requestId);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to send friend request"
            );
        }
    }
);

export const getFriendList = createAsyncThunk(
    "friend/getFriendList",
    async (
        { userId }: { userId?: string }, // Make userId optional
        { rejectWithValue }
    ) => {
        try {
            // If userId is provided, call the API with it. If not, call the API without userId
            const response = userId
                ? await getFriendListApi(userId)
                : await getFriendListApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch friend list"
            );
        }
    }
);

export const getPendingRequests = createAsyncThunk(
    "friend/getPendingRequests",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getPendingRequestsApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch pending request"
            );
        }
    }
);

export const getSuggestFriends = createAsyncThunk(
    "friend/getSuggestFriends",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getSuggestFriendsApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch suggested friends"
            );
        }
    }
);

interface FeedState {
    friendList: any[];
    suggestFriendList: any[]; // Adjust based on your API response
    pendingFriendList: any[];
    loading: boolean;
    error: string | null;
}

const initialState: FeedState = {
    friendList: [],
    suggestFriendList: [],
    pendingFriendList: [],
    loading: false,
    error: null,
};

const friendSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(sendFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendFriendRequest.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(
                sendFriendRequest.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch friends";
                }
            )

            .addCase(acceptFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(acceptFriendRequest.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(
                acceptFriendRequest.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch friends";
                }
            )

            .addCase(removeFriend.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFriend.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(
                removeFriend.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch friends";
                }
            )

            .addCase(getFriendList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getFriendList.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.friendList = action.payload;
                }
            )
            .addCase(
                getFriendList.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch friends";
                }
            )

            .addCase(getPendingRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getPendingRequests.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.pendingFriendList = action.payload;
                }
            )
            .addCase(
                getPendingRequests.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch friends";
                }
            )

            .addCase(getSuggestFriends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getSuggestFriends.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.suggestFriendList = action.payload;
                }
            )
            .addCase(
                getSuggestFriends.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to fetch suggested friends";
                }
            );
    },
});

export default friendSlice.reducer;
