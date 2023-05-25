import { createSlice } from '@reduxjs/toolkit';

const signInSlice = createSlice({
    name: 'signIn',
    initialState: {
        userLogin: null,
        error: false,
    },
    reducers: {
        userLogin: (state, action) => {
            state.userLogin = action.payload;
            state.error = false;
        },
    },
});

export const { userLogin } = signInSlice.actions;
export default signInSlice.reducer;
