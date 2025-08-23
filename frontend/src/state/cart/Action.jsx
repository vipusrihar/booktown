import { securedApi } from "../../config/API";
import {
  addCartItemStart,
  addCartItemSuccess,
  addCartItemFailure,
  getCartItemsStart,
  getCartItemsSuccess,
  getCartItemsFailure,
  clearCartState,
} from "./cartSlice";

// Helper function to handle API errors
const handleCartError = (error, dispatch, failureAction) => {
  const message = error.response?.data?.message || error.message || "Cart operation failed. Please try again.";
  dispatch(failureAction(message));
  console.error(`${failureAction.type}:`, message);
  return message;
};

// Add item to cart
export const addCartItem = (bookId, quantity, userId) => async (dispatch) => {
  dispatch(addCartItemStart());

  try {
    if (!bookId || !userId) throw new Error("Book ID and User ID are required");
      console.log("Item added to cart successfully! 1");

    const response = await securedApi.put(`/cart/${userId}`, { bookId, quantity });
      console.log("Item added to cart successfully 2!");

    // Ensure items array exists
    console.log(response.data)
      console.log("Item added to cart successfully3!");

    dispatch(addCartItemSuccess(response.data));

      console.log("Item added to cart successfully4!");

    // Refresh cart
    await dispatch(getCartByUserId(userId));
    console.log("Item added to cart successfully5!");
  } catch (error) {
    const message = handleCartError(error, dispatch, addCartItemFailure);
    throw new Error(message);
  }
};

// Get cart by user ID
export const getCartByUserId = (userId) => async (dispatch) => {
  dispatch(getCartItemsStart());

  try {
    if (!userId) throw new Error("User ID is required");

    const response = await securedApi.get(`/cart/${userId}`);

    console.log(response.data);

    dispatch(getCartItemsSuccess(response.data));
  } catch (error) {
    const message = handleCartError(error, dispatch, getCartItemsFailure);
    throw new Error(message);
  }
};

// Clear user's cart
export const clearCartByUserId = (userId) => async (dispatch) => {
  dispatch(getCartItemsStart());

  try {
    if (!userId) throw new Error("User ID is required");

    const response = await securedApi.put(`/cart/${userId}/clear`);

    if (response.status === 200) {
      dispatch(clearCartState());
      console.log("Cart cleared successfully!");
    } else {
      throw new Error(response.data?.message || "Failed to clear cart");
    }
  } catch (error) {
    const message = handleCartError(error, dispatch, getCartItemsFailure);
    throw new Error(message);
  }
};
