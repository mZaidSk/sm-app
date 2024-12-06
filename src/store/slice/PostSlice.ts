import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createPostApi,
    getAllPostApi,
    getAllPostByUserIdApi,
} from "@/services/PostService"; // Replace with your actual service imports

// Define the create post service as an async thunk
export const createPost = createAsyncThunk(
    "posts/createPost",
    async (postData: any, { rejectWithValue }) => {
        try {
            const response = await createPostApi(postData); // Call the API to create a post
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to create post"
            );
        }
    }
);

// Define the fetch posts service as an async thunk
export const getAllPost = createAsyncThunk(
    "posts/getAllPost",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllPostApi(); // Fetch all posts
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch posts"
            );
        }
    }
);

// Define the fetch posts service as an async thunk
export const getAllPostByUserId = createAsyncThunk(
    "posts/getAllPostByUserId",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await getAllPostByUserIdApi(userId); // Fetch all posts
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch posts"
            );
        }
    }
);

// Define the post state
interface PostState {
    posts: any[]; // Adjust based on your API response
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

// Create the post slice
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
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.posts.push(action.payload); // Add the new post to the state
                }
            )
            .addCase(
                createPost.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to create post";
                }
            )

            // Fetch User Posts
            .addCase(getAllPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllPost.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.posts = action.payload; // Update the state with fetched posts
                }
            )
            .addCase(
                getAllPost.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch posts";
                }
            )

            // Fetch Posts by User id
            .addCase(getAllPostByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllPostByUserId.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.posts = action.payload; // Update the state with fetched posts
                }
            )
            .addCase(
                getAllPostByUserId.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch posts";
                }
            );
    },
});

export default postSlice.reducer;
