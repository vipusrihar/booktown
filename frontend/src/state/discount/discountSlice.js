import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  discounts: [],
  discountsByBookId: {},
  error: null,
  success: null,
  isLoading: false,
};

const discountSlice = createSlice({
  name: "discount",
  initialState: initialValues,
  reducers: {
    // Create
    createDiscountStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    createDiscountSuccess: (state, action) => {
      state.isLoading = false;
      state.discounts.push(action.payload);
      state.success = "Discount created successfully.";
    },
    createDiscountFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to create discount.";
    },

    // Edit
    editDiscountStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    editDiscountSuccess: (state, action) => {
      state.isLoading = false;
      const updated = action.payload;
      state.discounts = state.discounts.map((d) =>
        d._id === updated._id ? updated : d
      );
      state.success = "Discount updated successfully.";
    },
    editDiscountFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to edit discount.";
    },

    // Get All
    getAllDiscountsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getAllDiscountsSuccess: (state, action) => {
      state.isLoading = false;
      state.discounts = action.payload;
    },
    getAllDiscountsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch discounts.";
    },

    // Update Status
    updateDiscountStatusStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateDiscountStatusSuccess: (state, action) => {
      state.isLoading = false;
      const updated = action.payload;
      state.discounts = state.discounts.map((d) =>
        d._id === updated._id ? updated : d
      );
      state.success = "Discount status updated.";
    },
    updateDiscountStatusFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to update status.";
    },

    // Get By Book ID
    getDiscountByBookIdStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getDiscountByBookIdSuccess: (state, action) => {
      state.isLoading = false;

      const discountsArray = action.payload; 
      discountsArray.forEach((discount) => {
        discount.books.forEach((bookId) => {
          state.discountsByBookId[bookId] = discount;
        });
      });
    },

    getDiscountByBookIdFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch by book ID.";
    },



    // Delete Discount by ID
    deleteDiscountStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false; // Optional: reset success flag on start
    },
    deleteDiscountSuccess: (state) => {
      state.isLoading = false;
      state.success = true;
    },
    deleteDiscountFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Set error from action
      state.success = false;
    }
  },

});

export const {
  createDiscountStart, createDiscountSuccess, createDiscountFailure,
  editDiscountStart, editDiscountSuccess, editDiscountFailure,
  getAllDiscountsStart, getAllDiscountsSuccess, getAllDiscountsFailure,
  updateDiscountStatusStart, updateDiscountStatusSuccess, updateDiscountStatusFailure,
  getDiscountByBookIdStart, getDiscountByBookIdSuccess, getDiscountByBookIdFailure,
  deleteDiscountStart, deleteDiscountSuccess, deleteDiscountFailure
} = discountSlice.actions;

export default discountSlice.reducer;
