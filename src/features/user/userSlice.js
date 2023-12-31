import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import customFetch from "../../util/axios";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../util/localStorage";

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
    isSidebarOpen: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        logoutUser: (state) => {
            state.user = null
            state.isSidebarOpen = false
            removeUserFromLocalStorage()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hello There ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);

                toast.success(`Welcome Back ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
        // .addCase(updateUser.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(updateUser.fulfilled, (state, { payload }) => {
        //     const { user } = payload;
        //     state.isLoading = false;
        //     state.user = user;
        //     addUserToLocalStorage(user);

        //     toast.success(`User Updated!`);
        // })
        // .addCase(updateUser.rejected, (state, { payload }) => {
        //     state.isLoading = false;
        //     toast.error(payload);
        // })
        // .addCase(clearStore.rejected, () => {
        //     toast.error('There was an error..');
        // });
    },
})

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/register', user);
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/login', user);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const {toggleSidebar,logoutUser} = userSlice.actions
export default userSlice.reducer