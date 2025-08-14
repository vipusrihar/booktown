import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    orders: [],
    selectedOrder: null,
    isLoading: false,
    error: null,
    success: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState: initialValues,
    reducers: {
        getAllOrdersStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getAllOrdersSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.orders;
            state.success = true;
        },
        getAllOrdersFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getOrderByIdStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getOrderByIdSuccess: (state, action) => {
            state.isLoading = false;
            const order = state.orders.find(order => order.id === action.payload.id);
            if (order) {
                state.selectedOrder = order;
            }
            state.success = true;
        },
        getOrderByIdFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        createOrderStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        createOrderSuccess: (state, action) => {
            state.isLoading = false;
            state.orders.push(action.payload);
            state.success = true;
        },
        createOrderFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        getOrderByUserIDStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getOrderByUserIDSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.orders;
            state.success = true;
        },
        getOrderByUserIDFailure: (state) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        changeOrderStatusStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        changeOrderStatusSuccess: (state, action) => {
            state.isLoading = false;
            state.orders = state.orders.map(order =>
                order._id === action.payload._id ? action.payload : order)
            state.success = true;
        },
        changeOrderStatusFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        },
        clearOrderState: (state) => {
            state.error = null;
            state.isLoading = false;
            state.orders = [],
                state.selectedOrder = null;
            state.success = null;
        }
    },
})

export const {
    getAllOrdersFailure, getAllOrdersStart, getAllOrdersSuccess,
    getOrderByIdStart, getOrderByIdSuccess, getOrderByIdFailure,
    getOrderByUserIDStart, getOrderByUserIDSuccess, getOrderByUserIDFailure,
    changeOrderStatusFailure, changeOrderStatusStart, changeOrderStatusSuccess,
    createOrderFailure, createOrderStart, createOrderSuccess,
    clearOrderState
} = orderSlice.actions;

export default orderSlice.reducer;