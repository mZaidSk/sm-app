import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    getUserApi,
    getUserByIdApi,
    getUserByUsernameApi,
} from "@/services/UserService";

export const getUser = createAsyncThunk(
    "users/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch users"
            );
        }
    }
);

export const getUserByUsername = createAsyncThunk(
    "users/getUserByUsername",
    async ({ username }: { username: string }, { rejectWithValue }) => {
        try {
            const response = await getUserByUsernameApi(username);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch users"
            );
        }
    }
);

export const getUserById = createAsyncThunk(
    "users/getUserById",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await getUserByIdApi(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch users"
            );
        }
    }
);

interface userState {
    user: any;
    searchUser: any[]; // Adjust based on your API response
    loading: boolean;
    error: string | null;
}

const initialState: userState = {
    user: {},
    searchUser: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getUser.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.user = action.payload;
                }
            )
            .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch users";
            })
            .addCase(getUserByUsername.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getUserByUsername.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.searchUser = action.payload;
                }
            )
            .addCase(
                getUserByUsername.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch users";
                }
            )

            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getUserById.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    state.loading = false;
                    state.user = action.payload;
                }
            )
            .addCase(
                getUserById.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch users";
                }
            );
    },
});

export default userSlice.reducer;
