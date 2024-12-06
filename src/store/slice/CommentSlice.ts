import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createCommentApi,
    getCommentByPostIdApi,
} from "@/services/CommentService";
import { crateCommentType } from "@/lib/types";

export const createComment = createAsyncThunk(
    "comments/createComment",
    async (postData: crateCommentType, { rejectWithValue }) => {
        try {
            const response = await createCommentApi(postData); // Call the API to create a post
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to create post"
            );
        }
    }
);

export const getCommentByPostId = createAsyncThunk(
    "feeds/getCommentByPostId",
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await getCommentByPostIdApi(postId);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch feeds"
            );
        }
    }
);

interface FeedState {
    comments: any[]; // Adjust based on your API response
    loading: boolean;
    error: string | null;
}

const initialState: FeedState = {
    comments: [],
    loading: false,
    error: null,
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(
                createComment.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch feeds";
                }
            )

            .addCase(getCommentByPostId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getCommentByPostId.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.comments = action.payload;
                }
            )
            .addCase(
                getCommentByPostId.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch feeds";
                }
            );
    },
});

export default commentSlice.reducer;
