import { securedApi } from "../../config/API";
import {
  getAllUsersFailure, getAllUsersStart, getAllUsersSuccess,
  getUserByIdFailure, getUserByIdStart, getUserByIdSuccess,
  updateUserFailure, updateUserStart, updateUserSuccess
} from "./userSlice";

// Centralized error handler
const handleUserError = (error, dispatch, failureAction) => {
  const message = error.response?.data?.message || error.message || 'User operation failed. Please try again.';
  dispatch(failureAction(message));
  console.error(`${failureAction.type} error:`, message, error);
  return message;
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(getAllUsersStart());
  
  try {
    const response = await securedApi.get("/user/all");
    dispatch(getAllUsersSuccess(response.data.response));
    return response.data; // Return data for potential chaining
  } catch (error) {
    const message = handleUserError(error, dispatch, getAllUsersFailure);
    throw new Error(message); // Re-throw for component handling
  }
};

export const getUserById = (id) => async (dispatch) => {
  dispatch(getUserByIdStart());
  
  try {
    if (!id) throw new Error('User ID is required');
    
    const response = await securedApi.get(`/user/${id}`);
    dispatch(getUserByIdSuccess(response.data.response));
    return response.data;
  } catch (error) {
    const message = handleUserError(error, dispatch, getUserByIdFailure);
    throw new Error(message);
  }
};

export const updateUser = (id, updatedData) => async (dispatch) => {
  dispatch(updateUserStart());
  
  try {
    if (!id) throw new Error('User ID is required');
    if (!updatedData || typeof updatedData !== 'object') {
      throw new Error('Invalid update data');
    }
    console.log(updatedData);
    const response = await securedApi.put(`/user/edit/${id}`, updatedData);
    console.log(response.data)
    dispatch(updateUserSuccess(response.data.response));
    return response.data;
  } catch (error) {
    const message = handleUserError(error, dispatch, updateUserFailure);
    throw new Error(message);
  }
};