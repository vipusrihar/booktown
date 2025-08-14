import { publicApi, securedApi } from '../../config/API';
import {
  addBookStart, addBookSuccess, addBookFailure,
  updateBookStart, updateBookSuccess, updateBookFailure,
  getAllBooksStart, getAllBooksSuccess, getAllBooksFailure,
  getBookByIdStart, getBookByIdSuccess, getBookByIdFailure,
  deleteBookStart, deleteBookSuccess, deleteBookFailure
} from './bookSlice';

// Helper function to handle API errors consistently
const handleBookError = (error, dispatch, failureAction) => {
  const message = error.response?.data?.message || error.message || 'Book operation failed. Please try again.';
  dispatch(failureAction(message));
  return message; // Return message for potential alert/notification
};

export const createBook = (bookData) => async (dispatch) => {
  dispatch(addBookStart());
  try {
    const response = await securedApi.post('/books', bookData);
    dispatch(addBookSuccess(response.data));
    return response.data; // Return data for component handling
  } catch (error) {
    const message = handleBookError(error, dispatch, addBookFailure);
    throw new Error(message); // Re-throw for component handling
  }
};

export const updateBook = (hashid, bookData) => async (dispatch) => {
  dispatch(updateBookStart());
  
  try {
    if (!hashid) throw new Error('Book ID is required');
    
    const response = await securedApi.put(`/books/${hashid}`, bookData);
    dispatch(updateBookSuccess(response.data));
    return response.data;
  } catch (error) {
    const message = handleBookError(error, dispatch, updateBookFailure);
    throw new Error(message);
  }
};

export const getAllBooks = () => async (dispatch) => {
  dispatch(getAllBooksStart());
  
  try {
    const response = await publicApi.get('/books');
    dispatch(getAllBooksSuccess(response.data));
    return response.data;
  } catch (error) {
    const message = handleBookError(error, dispatch, getAllBooksFailure);
    throw new Error(message);
  }
};

export const getBookById = (hashid) => async (dispatch) => {
  dispatch(getBookByIdStart());
  
  try {
    if (!hashid) throw new Error('Book ID is required');
    
    const response = await publicApi.get(`/books/${hashid}`);
    dispatch(getBookByIdSuccess(response.data));
    return response.data;
  } catch (error) {
    const message = handleBookError(error, dispatch, getBookByIdFailure);
    throw new Error(message);
  }
};

export const deleteBookById = (hashid) => async (dispatch) => {
  dispatch(deleteBookStart());
  
  try {
    if (!hashid) throw new Error('Book ID is required');
    
    await securedApi.delete(`/books/${hashid}`);
    dispatch(deleteBookSuccess(hashid)); // Pass the deleted ID
    return hashid; // Return the ID for reference
  } catch (error) {
    const message = handleBookError(error, dispatch, deleteBookFailure);
    throw new Error(message);
  }
};