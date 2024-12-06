import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createPostApi,
    createPostReactionApi,
    getAllPostApi,
    getAllPostByUserIdApi,
    removePostReactionApi,
} from "@/services/PostService";

// Types
interface Reaction {
    id: string;
    reaction: "LIKE" | "LOVE" | "LAUGH";
    userId: string;
    reactedAt: any;
}

interface Post {
    id: string;
    content: string; // Example property, adjust based on API response
    reactions: Reaction[];
    [key: string]: any; // Include other dynamic post properties
}

interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

// Async Thunks
export const createPost = createAsyncThunk(
    "posts/createPost",
    async (postData: any, { rejectWithValue }) => {
        try {
            const response = await createPostApi(postData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to create post"
            );
        }
    }
);

export const getAllPost = createAsyncThunk(
    "posts/getAllPost",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllPostApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch posts"
            );
        }
    }
);

export const getAllPostByUserId = createAsyncThunk(
    "posts/getAllPostByUserId",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await getAllPostByUserIdApi(userId);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch posts"
            );
        }
    }
);

export const createPostReaction = createAsyncThunk(
    "posts/createPostReaction",
    async (
        payload: { postId: string; reaction: "LIKE" | "LOVE" | "LAUGH" },
        { rejectWithValue }
    ) => {
        try {
            const response = await createPostReactionApi(payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to create post reaction"
            );
        }
    }
);

export const removePostReaction = createAsyncThunk(
    "posts/removePostReaction",
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await removePostReactionApi(postId);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to remove post reaction"
            );
        }
    }
);

// Slice
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // Create Post
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createPost.fulfilled,
                (state, action: PayloadAction<Post>) => {
                    state.loading = false;
                    state.posts.push(action.payload);
                }
            )
            .addCase(
                createPost.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to create post";
                }
            )

            // Fetch All Posts
            .addCase(getAllPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllPost.fulfilled,
                (state, action: PayloadAction<Post[]>) => {
                    state.loading = false;
                    state.posts = action.payload;
                }
            )
            .addCase(
                getAllPost.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch posts";
                }
            )

            // Fetch Posts by User ID
            .addCase(getAllPostByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllPostByUserId.fulfilled,
                (state, action: PayloadAction<Post[]>) => {
                    state.loading = false;
                    state.posts = action.payload;
                }
            )
            .addCase(
                getAllPostByUserId.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch posts";
                }
            )

            // Create Post Reaction
            .addCase(createPostReaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createPostReaction.fulfilled,
                (state, action: PayloadAction<Post[]>) => {
                    state.loading = false;
                }
            )
            .addCase(
                createPostReaction.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to create post reaction";
                }
            )

            // Remove Post Reaction
            .addCase(removePostReaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                removePostReaction.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                }
            )
            .addCase(
                removePostReaction.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Failed to remove post reaction";
                }
            );
    },
});

export default postSlice.reducer;
