import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Initialize user token if user exists
if (user?.token) {
    userService.setAuthToken(user.token);
}

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Helper function to normalize user data structure
const normalizeUserData = (data) => {
    // If data is already in the correct format (has data property), return as is
    if (data?.data) {
        return data;
    }
    // Otherwise, wrap it in a data property
    return { data: data };
};

// Create user
export const createUser = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            const response = await userService.createUser(user);
            return normalizeUserData(response);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete user
export const deleteUser = createAsyncThunk(
    'user/delete',
    async (user, thunkAPI) => {
        try {
            const response = await userService.deleteUser(user);
            return normalizeUserData(response);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;