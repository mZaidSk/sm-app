import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserByUsernameApi } from "@/services/UserService";

export const getUserByUsername = createAsyncThunk(
    "users/getUserByUsername",
    async (username, { rejectWithValue }) => {
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

interface userState {
    searchUser: any[]; // Adjust based on your API response
    loading: boolean;
    error: string | null;
}

const initialState: userState = {
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
            );
    },
});

export default userSlice.reducer;
