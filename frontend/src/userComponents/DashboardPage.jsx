import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCartByUserId } from '../state/cart/Action';
// import { getReviewsbyUserID } from '../state/review/Action';
import { getOrdersByUserID } from '../state/order/Action';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth?.user?.id;

  const cartItems = useSelector((store) => store.cart.cartItems);
  const orders = useSelector((store) => store.orders.orders);
  // const reviews = useSelector((store) => store.reviews.reviews);

  const currentOrders = orders.filter((order) => {
    if (order.orderStatus !== 'delivered') {
      return order
    }
  })

  const deliveredOrders = orders.filter((order) => {
    if (order.orderStatus === 'delivered') {
      return order
    }
  });

  useEffect(() => {
    if (userId) {
      dispatch(getCartByUserId(userId));
      // dispatch(getReviewsbyUserID(userId));
      dispatch(getOrdersByUserID(userId));
    }
  }, [dispatch, userId]);

  return (
    <Box sx={{ mx: 'auto', mt: 2, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Activity
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Orders
        </Typography>
        <List>
          {currentOrders?.length > 0 ? (
            currentOrders.map((order, index) => (
              <ListItem
                key={index}
                sx={{ display: 'block' }}
              >
                <Typography variant="body2"> OrderedAt: {order?.orderdAt ? order.orderdAt.split("T")[0] : 'Unknown Date'}</Typography>
                <Typography variant="body2">Price: {order.totalPrice}</Typography>
                <Typography variant="body2">Status: {order.orderStatus}</Typography>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">No pending orders.</Typography>
          )}
        </List>
      </Paper>


      <Grid container spacing={2} sx={{ mt: 3 }}>
        {/* Orders */}
        <Grid size={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Delivered Orders
            </Typography>
            <List dense>
              {deliveredOrders?.length > 0 ? (
                deliveredOrders.map((order, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: 'block' }}
                  >
                    <Typography variant="body2"> OrderedAt: {order?.orderdAt ? order.orderdAt.split("T")[0] : 'Unknown Date'}</Typography>
                    <Typography variant="body2">Price: {order.totalPrice}</Typography>
                    <Typography variant="body2">Status: {order.orderStatus}</Typography>
                  </ListItem>
                ))


              ) : (
                <Typography variant="body2">No delivered orders found.</Typography>
              )}
            </List>
          </Paper>
        </Grid>

        {/* <Grid size={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Your Reviews
            </Typography>
            <List dense>
              {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Book: ${review.book?.title || 'Unknown'}`}
                      secondary={`Comment: ${review.comment}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No reviews yet.</Typography>
              )}
            </List>
          </Paper>
        </Grid> */}


        <Grid size={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Cart Items
            </Typography>
            <List dense>
              {cartItems?.length > 0 ? (
                cartItems.map((item, index) => (
                  <ListItem key={item._id || index} sx={{ borderWidth: 1, display: 'flex', alignItems: 'center', marginBottom: 0.5 }}>
                    <ListItemText
                      primary={item.book?.title || 'Unknown Book'}
                      secondary={`Quantity: ${item.quantity}`}
                      sx={{ flexGrow: 1 }}
                    />
                    <img
                      src={item?.book?.image || ''}
                      alt={item.book?.title || 'Book Cover'}
                      style={{ width: '50px', height: 'auto', marginLeft: '16px' }}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">Your cart is empty.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
