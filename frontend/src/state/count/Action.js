import { securedApi } from '../../config/API';
import { getCountsStart, getCountsSuccess, getCountsFailure } from './countSlice';

export const fetchAllCounts = () => async (dispatch) => {
    dispatch(getCountsStart());

    try {
        const [users, orders, books, discounts] = await Promise.all([
            securedApi.get('/user/count'),
            securedApi.get('/order/count'),
            securedApi.get('/book/count'),
            securedApi.get('/discount/count')
        ]);

        dispatch(getCountsSuccess({
            users: users.data.response,
            orders: orders.data.response,
            books: books.data.response,
            discounts: discounts.data.response,
        }));

        return {
            users: users.data.count,
            orders: orders.data.count,
            books: books.data.count,
            discounts: discounts.data.count,
        };

    } catch (error) {
        // Handle specific API errors if needed
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch dashboard counts';

        console.error('Dashboard counts error:', error);
        dispatch(getCountsFailure(errorMessage));
        throw new Error(errorMessage); // Re-throw for component handling
    }
};