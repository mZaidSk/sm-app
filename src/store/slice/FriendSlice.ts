import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserFeedApi } from "@/services/FeedService";
import { getSuggestFriendsApi } from "@/services/FriendService";

export const getSuggestFriends = createAsyncThunk(
    "feeds/getSuggestFriends",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getSuggestFriendsApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch feeds"
            );
        }
    }
);

interface FeedState {
    suggestFriendList: any[]; // Adjust based on your API response
    loading: boolean;
    error: string | null;
}

const initialState: FeedState = {
    suggestFriendList: [],
    loading: false,
    error: null,
};

const feedSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
                    state.error = action.payload || "Failed to fetch feeds";
                }
            );
    },
});

export default feedSlice.reducer;
