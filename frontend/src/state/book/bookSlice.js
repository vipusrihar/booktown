import { createSlice } from '@reduxjs/toolkit';
import { getBookById } from './Action';

const initialValues = {
    books: [],
    selectedBook: null,
    isLoading: false,
    error: null,
    success: null,
};

const bookSlice = createSlice({
    name: 'book',
    initialState: initialValues,
    reducers: {
        getAllBooksStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getAllBooksSuccess: (state, action) => {
            state.isLoading = false;
            state.books = action.payload.books;
            state.success = true;
        },
        getAllBooksFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getBookByIdStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getBookByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.selectedBook = action.payload;
            state.success = true;
        },
        getBookByIdFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        addBookStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addBookSuccess: (state, action) => {
            state.isLoading = false;
            state.books.push(action.payload);
            state.success = true;
        },
        addBookFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        updateBookStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateBookSuccess: (state, action) => {
            state.isLoading = false;
            state.books = state.books.map(book =>
                book._id === action.payload._id ? action.payload : book);
            state.success = true;
        },
        updateBookFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        deleteBookStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteBookSuccess: (state, action) => {
            state.isLoading = false;
            state.books = state.books.filter(book => book.id !== action.payload);
            state.success = true;
        },
        deleteBookFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        clearBookState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.selectedBook = null;
            state.success = null;
            // books need even after we logout
            // state.books = null
        },
        

    },

});

export const {
    addBookFailure, addBookStart, addBookSuccess,
    getAllBooksFailure, getAllBooksStart, getAllBooksSuccess,
    updateBookFailure, updateBookStart, updateBookSuccess,
    getBookByIdFailure, getBookByIdStart, getBookByIdSuccess,
    deleteBookFailure, deleteBookStart, deleteBookSuccess,
    clearBookState,
} = bookSlice.actions;

export default bookSlice.reducer;