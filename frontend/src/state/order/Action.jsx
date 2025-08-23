import {
    getAllOrdersStart, getAllOrdersFailure, getAllOrdersSuccess,
    changeOrderStatusStart, changeOrderStatusFailure, changeOrderStatusSuccess,
    getOrderByIdSuccess, getOrderByIdStart, getOrderByIdFailure,
    getOrderByUserIDStart, getOrderByUserIDSuccess, getOrderByUserIDFailure,
    createOrderStart, createOrderSuccess, createOrderFailure,
} from '../order/orderSlice';
import { clearCartState } from '../cart/cartSlice';
import { securedApi } from '../../config/API';

// Helper function for input validation
const validateOrderDetails = (orderDetails) => {
    if (!orderDetails || typeof orderDetails !== 'object') {
        throw new Error('Invalid order details');
    }

    const requiredFields = ['userId', 'items', 'totalAmount'];
    requiredFields.forEach(field => {
        if (!orderDetails[field]) {
            throw new Error(`Missing required field: ${field}`);
        }
    });

    if (!Array.isArray(orderDetails.items) || orderDetails.items.length === 0) {
        throw new Error('Order must contain at least one item');
    }
};

export const createOrder = (orderDetails) => async (dispatch) => {
    dispatch(createOrderStart());

    try {
        validateOrderDetails(orderDetails);
        const response = await securedApi.post('/orders', orderDetails);

        if (response.status === 201) {
            dispatch(createOrderSuccess(response.data.response));
            dispatch(clearCartState());
            return response.data;
        }

        throw new Error('Unexpected response status');
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create order';
        dispatch(createOrderFailure(errorMessage));
        console.error('Create order error:', error);
        throw error; // Re-throw for component-level handling
    }
};

export const getAllOrders = () => async (dispatch) => {
    dispatch(getAllOrdersStart());

    try {
        const response = await securedApi.get('/order/all');
        dispatch(getAllOrdersSuccess(response.data.response ));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch orders';
        dispatch(getAllOrdersFailure(errorMessage));
        console.error('Fetch orders error:', error);
        throw error;
    }
};

export const getOrdersByUserID = (userId) => async (dispatch) => {
    dispatch(getOrderByUserIDStart());

    try {
        if (!userId) throw new Error('User ID is required');

        const response = await securedApi.get(`/orders/user/${userId}`);
        dispatch(getOrderByUserIDSuccess({ orders: response.data }));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user orders';
        dispatch(getOrderByUserIDFailure(errorMessage));
        console.error('Fetch user orders error:', error);
        throw error;
    }
};

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch(getOrderByIdStart());

    try {
        if (!orderId) throw new Error('Order ID is required');

        const response = await securedApi.get(`/orders/${orderId}`);
        dispatch(getOrderByIdSuccess({ orders: [response.data] }));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch order';
        dispatch(getOrderByIdFailure(errorMessage));
        console.error('Fetch order error:', error);
        throw error;
    }
};

export const changeOrderStatus = (orderId, orderStatus) => async (dispatch) => {
    dispatch(changeOrderStatusStart());

    try {
        if (!orderId) throw new Error('Order ID is required');
        if (!orderStatus) throw new Error('Order status is required');

        const response = await securedApi.put(`/orders/${orderId}`, { orderStatus });
        dispatch(changeOrderStatusSuccess(response.data.response));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update order status';
        dispatch(changeOrderStatusFailure(errorMessage));
        console.error('Update order status error:', error);
        throw error;
    }
};