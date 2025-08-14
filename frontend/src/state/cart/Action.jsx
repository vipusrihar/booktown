import { securedApi } from "../../config/API";
import {
  addCartItemStart, addCartItemSuccess, addCartItemFailure,
  getCartItemsStart, getCartItemsSuccess, getCartItemsFailure,
  clearCartState
} from "./cartSlice";

// Helper function to handle API errors consistently
const handleCartError = (error, dispatch, failureAction) => {
  const message = error.response?.data?.message || error.message ||  'Cart operation failed. Please try again.';
  dispatch(failureAction(message));
  console.error(`${failureAction.type}:`, message);
  return message;
};

export const addCartItem = (productId, quantity, userId) => async (dispatch) => {
  dispatch(addCartItemStart());
  
  try {
    if (!productId || !userId) {
      throw new Error('Product ID and User ID are required');
    }

    const response = await securedApi.post(`/users/${userId}/cart/add`, {
      productId,
      quantity
    });

    dispatch(addCartItemSuccess(response.data));
    // Refresh the cart after adding an item
    await dispatch(getCartByUserId(userId));
    return response.data;
  } catch (error) {
    const message = handleCartError(error, dispatch, addCartItemFailure);
    throw new Error(message);
  }
};

export const getCartByUserId = (userId) => async (dispatch) => {
  dispatch(getCartItemsStart());
  
  try {
    if (!userId) throw new Error('User ID is required');
    
    const response = await securedApi.get(`/users/${userId}/cart`);
    dispatch(getCartItemsSuccess(response.data));
    return response.data;
  } catch (error) {
    const message = handleCartError(error, dispatch, getCartItemsFailure);
    throw new Error(message);
  }
};

export const clearCartByUserId = (userId) => async (dispatch) => {
  try {
    if (!userId) throw new Error('User ID is required');
    
    const response = await securedApi.delete(`/users/${userId}/cart/clear`);
    
    if (response.status === 200) {
      dispatch(clearCartState());
      await dispatch(getCartByUserId(userId)); // Refresh empty cart
    } else {
      throw new Error(response.data?.message || 'Failed to clear cart');
    }
    
    return true;
  } catch (error) {
    const message = handleCartError(error, dispatch, getCartItemsFailure);
    throw new Error(message);
  }
};