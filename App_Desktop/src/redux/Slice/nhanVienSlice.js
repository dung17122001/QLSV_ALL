import { createSlice } from '@reduxjs/toolkit';

const nhanVienSlice = createSlice({
    name: 'nhanVien',
    initialState: {
        currentNhanVien: null,
        error: false,
    },
    reducers: {
        currentNhanVien: (state, action) => {
            state.currentNhanVien = action.payload;
            state.error = false;
        },
    },
});

export const { currentNhanVien } = nhanVienSlice.actions;

export default nhanVienSlice.reducer;
