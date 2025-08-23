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
  console.log(bookData)
  try {
    const response = await securedApi.post('/book/create', bookData);
    dispatch(addBookSuccess(response.data.response));
    window.alert("Book Created Successfully");
    console.log(response.data)
  } catch (error) {
    const message = handleBookError(error, dispatch, addBookFailure);
    throw new Error(message); // Re-throw for component handling
  }
};

export const updateBook = (bookId, bookData) => async (dispatch) => {
  dispatch(updateBookStart());

  try {
    if (!bookId) throw new Error('Book ID is required');

    const response = await securedApi.put(`/book/${bookId}`, bookData);
    dispatch(updateBookSuccess(response.data.response));
  } catch (error) {
    const message = handleBookError(error, dispatch, updateBookFailure);
    throw new Error(message);
  }
};

export const getAllBooks = () => async (dispatch) => {
  dispatch(getAllBooksStart());

  try {
    const response = await publicApi.get('/book/all');
    dispatch(getAllBooksSuccess(response.data.response));
    console.log(response.data);
  } catch (error) {
    const message = handleBookError(error, dispatch, getAllBooksFailure);
    throw new Error(message);
  }
};

export const getBookById = (bookId) => async (dispatch) => {
  dispatch(getBookByIdStart());

  try {
    if (!bookId) throw new Error('Book ID is required');

    const response = await publicApi.get(`/book/${bookId}`);
    dispatch(getBookByIdSuccess(response.data.response));
  } catch (error) {
    const message = handleBookError(error, dispatch, getBookByIdFailure);
    throw new Error(message);
  }
};

export const deleteBookById = (bookId) => async (dispatch) => {
  dispatch(deleteBookStart());
  try {
    if (!bookId) throw new Error('Book ID is required');

    const response = await securedApi.delete(`/book/${bookId}`);
    const { isSuccess, response: isDeleted, message } = response.data;

    if (!isSuccess || !isDeleted) {
      throw new Error(message || 'Book deletion failed');
    }

    dispatch(deleteBookSuccess(bookId)); 
    
  } catch (error) {
    const message = handleBookError(error, dispatch, deleteBookFailure);
    throw new Error(message);
  }
};
