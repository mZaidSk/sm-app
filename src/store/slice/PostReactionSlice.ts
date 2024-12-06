import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserFeedApi } from "@/services/FeedService";

export const getUserFeed = createAsyncThunk(
    "feeds/getUserFeed",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserFeedApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch feeds"
            );
        }
    }
);

interface FeedState {
    feedPost: any[]; // Adjust based on your API response
    loading: boolean;
    error: string | null;
}

const initialState: FeedState = {
    feedPost: [],
    loading: false,
    error: null,
};

const feedSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserFeed.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getUserFeed.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.feedPost = action.payload;
                }
            )
            .addCase(
                getUserFeed.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch feeds";
                }
            );
    },
});

export default feedSlice.reducer;
