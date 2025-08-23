import { securedApi } from '../../config/API';
import {
  createDiscountFailure, createDiscountStart, createDiscountSuccess,
  deleteDiscountFailure, deleteDiscountStart, deleteDiscountSuccess,
  editDiscountFailure, editDiscountStart, editDiscountSuccess,
  getAllDiscountsFailure, getAllDiscountsStart, getAllDiscountsSuccess,
  getDiscountByBookIdFailure, getDiscountByBookIdStart, getDiscountByBookIdSuccess,
  updateDiscountStatusFailure, updateDiscountStatusStart, updateDiscountStatusSuccess,
} from './discountSlice';

// Centralized error handler
const handleDiscountError = (error, dispatch, failureAction) => {
  const message = error.response?.data?.message || error.message || 'Discount operation failed. Please try again.';
  dispatch(failureAction(message));
  console.error(`${failureAction.type}:`, message);
  return message;
};

export const createDiscount = (discountData) => async (dispatch) => {
  dispatch(createDiscountStart());

  try {
    if (!discountData || typeof discountData !== 'object') {
      throw new Error('Invalid discount data');
    }

    const response = await securedApi.post('/discount/createDiscount', { discount: discountData });
    dispatch(createDiscountSuccess(response.data.response));
    return response.data;
  } catch (error) {
    const message = handleDiscountError(error, dispatch, createDiscountFailure);
    throw new Error(message);
  }
};

export const getAllDiscounts = () => async (dispatch) => {
  dispatch(getAllDiscountsStart());

  try {
    const response = await securedApi.get('/discount/active');
    dispatch(getAllDiscountsSuccess(response.data.response));
    return response.data;
  } catch (error) {
    const message = handleDiscountError(error, dispatch, getAllDiscountsFailure);
    throw new Error(message);
  }
};

export const editDiscount = (discountId, updatedData) => async (dispatch) => {
  dispatch(editDiscountStart());

  try {
    if (!discountId) throw new Error('Discount ID is required');
    if (!updatedData || typeof updatedData !== 'object') {
      throw new Error('Invalid update data');
    }

    const response = await securedApi.put(`/discount/editDiscount/${discountId}`, updatedData);
    dispatch(editDiscountSuccess(response.data.response));
    return response.data;
  } catch (error) {
    const message = handleDiscountError(error, dispatch, editDiscountFailure);
    throw new Error(message);
  }
};

export const updateDiscountStatusById = (id, active) => async (dispatch) => {
  dispatch(updateDiscountStatusStart());

  try {
    if (!id) throw new Error('Discount ID is required');

    const response = await securedApi.put(`/discounts/updateStatus/${id}`, { active });
    dispatch(updateDiscountStatusSuccess(response.data.discount));
    return response.data;
  } catch (error) {
    const message = handleDiscountError(error, dispatch, updateDiscountStatusFailure);
    throw new Error(message);
  }
};

export const findDiscountByBookId = (bookId) => async (dispatch) => {
  dispatch(getDiscountByBookIdStart());

  try {
    if (!bookId) throw new Error('Book ID is required');

    const response = await securedApi.get(`/discount/byBook/${bookId}`);
    dispatch(getDiscountByBookIdSuccess(response.data.response));
    return response.data;
  } catch (error) {
    const message = handleDiscountError(error, dispatch, getDiscountByBookIdFailure);
    throw new Error(message);
  }
};

export const deleteDiscountById = (id) => async (dispatch) => {
  dispatch(deleteDiscountStart());

  try {
    if (!id) throw new Error('Discount ID is required');

    const response = await securedApi.delete(`/discount/${id}`);
    dispatch(deleteDiscountSuccess(response.data.response));
    return response.data;
  } catch (error) {
    const message = handleDiscountError(error, dispatch, deleteDiscountFailure);
    throw new Error(message);
  }
};