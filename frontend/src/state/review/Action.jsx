import { securedApi } from "../../config/API";
import {
  getAllReviewsFailure, getAllReviewsStart, getAllReviewsSuccess,
  getReviewsByUserIDFailure, getReviewsByUserIDStart, getReviewsByUserIDSuccess
} from "./reviewSlice";

// Centralized error handler for reviews
const handleReviewError = (error, dispatch, failureAction) => {
  const message = error.response?.data?.message ||
    error.message ||
    'Failed to fetch reviews. Please try again.';
  dispatch(failureAction(message));
  console.error(`${failureAction.type}:`, message, error);
  return message;
};

export const getAllReviews = () => async (dispatch) => {
  dispatch(getAllReviewsStart());

  try {
    const response = await securedApi.get("/reviews");
    dispatch(getAllReviewsSuccess(response.data.response));
    return response.data; // Return data for potential chaining
  } catch (error) {
    const message = handleReviewError(error, dispatch, getAllReviewsFailure);
    throw new Error(message); // Re-throw for component handling
  }
};

export const getReviewsByUserID = (userId) => async (dispatch) => {
  dispatch(getReviewsByUserIDStart());

  try {
    if (!userId) throw new Error('User ID is required');

    const response = await securedApi.get(`/reviews/user/${userId}`);
    dispatch(getReviewsByUserIDSuccess(response.data.response));
    return response.data;
  } catch (error) {
    const message = handleReviewError(error, dispatch, getReviewsByUserIDFailure);
    throw new Error(message);
  }
};