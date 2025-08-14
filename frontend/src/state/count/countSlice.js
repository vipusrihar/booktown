import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: 0,
    orders: 0,
    books: 0,
    discounts: 0,
    isLoading: false,
    error: null,
    success: null,
};

const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        getCountsStart: (state) => {
            state.isLoading = true;
            state.error = null;
            state.success = null;
        },
        getCountsSuccess: (state, action) => {
            const { users, orders, books, discounts } = action.payload;

            state.isLoading = false;
            state.users = users;
            state.orders = orders;
            state.books = books;
            state.discounts = discounts;
            state.success = true;
        },
        getCountsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        clearCountState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = null;
        }
    }
});

export const {
    getCountsStart,
    getCountsSuccess,
    getCountsFailure,
    clearCountState
} = countSlice.actions;

export default countSlice.reducer;
