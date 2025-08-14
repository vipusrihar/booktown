// import { createSlice } from '@reduxjs/toolkit';

// const initialValues = {
//     reviews: [],
//     selectedReview: null,
//     isLoading: false,
//     error: null,
//     success: null,
// };

// const reviewSlice = createSlice({
//     name: 'review',
//     initialState: initialValues,
//     reducers: {
//         getAllReviewsStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         getAllReviewsSuccess: (state, action) => {
//             state.isLoading = false;
//             state.reviews = action.payload.reviews;
//             state.success = true;
//         },
//         getAllReviewsFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//             state.success = false;
//         },
//         selectReview: (state, action) => {
//             state.selectedReview = action.payload;
//         },
//         addReviewStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         addReviewSuccess: (state, action) => {
//             state.isLoading = false;
//             state.reviews.push(action.payload);
//             state.success = true;
//         },
//         addReviewFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//             state.success = false;
//         },
//         updateReviewStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         updateReviewSuccess: (state, action) => {
//             state.isLoading = false;
//             const index = state.reviews.findIndex(review => review.id === action.payload.id);
//             if (index !== -1) {
//                 state.reviews[index] = action.payload;
//             }
//             state.success = true;
//         },
//         updateReviewFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//             state.success = false;
//         },
//         deleteReviewStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         deleteReviewSuccess: (state, action) => {
//             state.isLoading = false;
//             state.reviews = state.reviews.filter(review => review.id !== action.payload);
//             state.success = true;
//         },
//         deleteReviewFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//             state.success = false;
//         },
//         getReviewsByUserIDStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         getReviewsByUserIDSuccess: (state, action) => {
//             state.isLoading = false;
//             state.reviews = action.payload.reviews;
//             state.success = true;
//         },
//         getReviewsByUserIDFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//             state.success = false;
//         },
//         clearReviewState: (state) => {
//             state.selectedReview = null;
//             state.isLoading = false;
//             state.error = null;
//             state.reviews = [];
//             state.success = null;
//         },
//     }
// });

// export const {
//     getAllReviewsStart, getAllReviewsSuccess, getAllReviewsFailure,
//     selectReview, clearReviewState,
//     addReviewStart, addReviewSuccess, addReviewFailure,
//     updateReviewStart, updateReviewSuccess, updateReviewFailure,
//     deleteReviewStart, deleteReviewSuccess, deleteReviewFailure,
//     getReviewsByUserIDStart,getReviewsByUserIDSuccess, getReviewsByUserIDFailure
// } = reviewSlice.actions;

// export default reviewSlice.reducer;