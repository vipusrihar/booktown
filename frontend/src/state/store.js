import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authSlice from './authentication/authSlice'
import userSlice from './user/userSlice';
import bookSlice from './book/bookSlice'
import orderSlice from './order/orderSlice';
// import reviewSlice from './review/reviewSlice';
import cartSlice from './cart/cartSlice';
import discountSlice from './discount/discountSlice'
import countSlice from './count/countSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  users: userSlice,
  books: bookSlice,
  orders: orderSlice,
  // reviews: reviewSlice,
  cart: cartSlice,
  discounts :discountSlice,
  count : countSlice
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
})
