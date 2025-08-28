import { securedApi } from "../../config/API";
import {
  addCartItemStart, addCartItemSuccess, addCartItemFailure,
  getCartItemsStart, getCartItemsSuccess, getCartItemsFailure,
  clearCartState,
} from "./cartSlice";

// 🔹 Helper function to handle API errors
const handleCartError = (error, dispatch, failureAction) => {
  const message =
    error.response?.data?.message ||
    error.message ||
    "Cart operation failed. Please try again.";

  dispatch(failureAction(message));

  console.error("Cart Error:", message);
  return message;
};


// 🔹 Add item to cart
export const addCartItem = (bookId, quantity, userId) => async (dispatch) => {
  dispatch(addCartItemStart());

  try {
    if (!bookId || !userId) throw new Error("Book ID and User ID are required");

    console.log(bookId, " ", userId)

    const response = await securedApi.put(`/cart/${userId}`, { bookId, quantity });

    console.log(response);

 //   dispatch(addCartItemSuccess(response.data));

    // Refresh cart after adding
    await dispatch(getCartByUserId(userId));
  } catch (error) {
    const message = handleCartError(error, dispatch, addCartItemFailure);
    throw new Error(message);
  }
};

// 🔹 Get cart by user ID
export const getCartByUserId = (userId) => async (dispatch) => {
  dispatch(getCartItemsStart());

  try {
    if (!userId) throw new Error("User ID is required");

    const response = await securedApi.get(`/cart/${userId}`);
    console.log(response.data);

    dispatch(getCartItemsSuccess(response.data.response));
  } catch (error) {
    const message = handleCartError(error, dispatch, getCartItemsFailure);
    throw new Error(message);
  }
};

// 🔹 Clear user's cart
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
