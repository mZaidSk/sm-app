import { getLoginUserApi, logInApi } from "@/services/AuthService";
import websocket from "@/services/WebSocketService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the login service as an async thunk
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await logInApi(credentials);
            return response.data;
        } catch (error: any) {
            // Handle errors
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

// Define the getLoginUser service as an async thunk
export const getLoginUser = createAsyncThunk(
    "auth/getLoginUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("No token found");

            const response = await getLoginUserApi(); // Fetch user details using the token
            return response.data;
        } catch (error: any) {
            // Handle errors
            return rejectWithValue(
                error.response?.data || "Unable to fetch user details"
            );
        }
    }
);

// Define the auth state
interface AuthState {
    user: null | any; // Adjust according to your API response
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Create the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem("token"); // Clear token from local storage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.user = action.payload;
                    localStorage.setItem("token", action.payload.token); // Store token in local storage
                    localStorage.setItem("userId", action.payload.userId); // Store token in local storage
                    websocket.connect(action.payload.token);
                }
            )
            .addCase(
                loginUser.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "Login failed";
                }
            )
            .addCase(getLoginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getLoginUser.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    localStorage.setItem("userId", action.payload.userId);
                    state.user = action.payload;
                    websocket.disconnect();
                }
            )
            .addCase(
                getLoginUser.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error =
                        action.payload || "Unable to fetch user details";
                }
            );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
