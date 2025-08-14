import { createSlice } from "@reduxjs/toolkit"

const initialValues = {
    cartItems : [],
    isLoading : false,
    error : null,
    success : null
}

const cartSlice = createSlice({
    name : 'cart',
    initialState : initialValues,
    reducers : {
        addCartItemStart : (state) =>{
            state.isLoading = true;
        },
        addCartItemSuccess : (state, action) => {
            state.isLoading = true;
            state.success = true;
            state.cartItems = action.payload;
        },
        addCartItemFailure : (state) =>{
            state.isLoading = false;
            state.success  = false;
            state.error = action.payload
        },
        getCartItemsStart : (state) =>{
            state.isLoading = true;
            state.success = null;
        },
        getCartItemsSuccess : (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.cartItems = action.payload.items;
        },
        getCartItemsFailure : (state, action) => {
            state.isLoading = false;
            state.success = false;
            state.error = action.payload;
        },
        clearCartState : (state) =>{
            state.cartItems = [];
            state.error = null;
            state.isLoading = false;
            state.success = null;
        }
    },
})

export const { 
    addCartItemStart, addCartItemSuccess, addCartItemFailure,
    getCartItemsStart, getCartItemsSuccess, getCartItemsFailure,
    clearCartState
} = cartSlice.actions;  

export default cartSlice.reducer;