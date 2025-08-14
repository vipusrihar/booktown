import { createSlice } from "@reduxjs/toolkit"

const initialValues = {
    users : [],
    selectedUser: '',
    isLoading : false,
    error : null,
    success : null
}

const userSlice = createSlice({
    name : 'user',
    initialState : initialValues,
    reducers : {
        getAllUsersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getAllUsersSuccess: (state, action) => {
            state.isLoading = false;
            state.users = action.payload.users;
            state.success = true;
        },
        getAllUsersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getUserByIdStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getUserByIdSuccess: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.selectedUser = action.payload
            state.success = true;
        },
        getUserByIdFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
       
        updateUserStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateUserSuccess : (state, action) => {
            state.isLoading = false,
            state.selectedUser = action.payload
            state.users = state.users.map(user => 
                user._id === action.payload.user._id ? action.payload.user : user
            );
            state.success = true;
        },
        updateUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        deleteUserStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        deleteUserSuccess: (state, action) => {
            state.isLoading = false;
            state.users = state.users.filter(user => user._id !== action.payload.userId);
            state.success = true;
        },
        deleteUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        clearUserState : (state) =>{
            state.error = null;
            state.isLoading = false;
            state.success = null;
            state.users = []
        }
    }
})

export const {
    getAllUsersStart, getAllUsersSuccess, getAllUsersFailure,
    getUserByIdStart, getUserByIdSuccess, getUserByIdFailure,
    updateUserStart, updateUserSuccess, updateUserFailure,
    deleteUserStart, deleteUserSuccess, deleteUserFailure,
    clearUserState
} = userSlice.actions; 

export default userSlice.reducer;