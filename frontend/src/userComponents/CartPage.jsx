import React, { useState, useEffect } from 'react';
import {
  Modal, Typography, Button, Box, Table, TableHead,
  TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findDiscountByBookId } from '../state/discount/Action';
import { addCartItem, getCartByUserId } from '../state/cart/Action';
import CloseIcon from '@mui/icons-material/Close';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import OrderForm from './OrderForm';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.selectedUser);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const discounts = useSelector((state) => state.discounts.discountsByBookId || {});

  const [open, setOpen] = useState(false);
  const DELIVERY_CHARGE = 250;

  useEffect(() => {
    if (user?.id) {
      dispatch(getCartByUserId(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    cartItems?.forEach(item => {
      dispatch(findDiscountByBookId(item.book.id));
    });
  }, [cartItems, dispatch]);

  // Helper to calculate discounted price
  const getDiscountedPrice = (bookId, price) => {
    const discount = discounts[bookId];
    if (discount?.active && discount.amount > 0) {
      return price - (price * discount.amount) / 100;
    }
    return price;
  };

  const cartTotal = cartItems?.reduce((total, item) => {
    const price = getDiscountedPrice(item.book.id, item.book.price);
    return total + price * item.quantity;
  }, 0) || 0;

  const finalTotal = cartTotal + DELIVERY_CHARGE;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#FCD34D' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Original Price (Rs)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Discount %</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Discounted Price (Rs)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total (Rs)</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => {
                const originalPrice = item.book.price;
                const discount = discounts[item.book.id];
                const discountAmount = discount?.active ? discount.amount : 0;
                const discountedPrice = getDiscountedPrice(item.book.id, originalPrice);
                const totalForItem = discountedPrice * item.quantity;

                return (
                  <TableRow key={index}>
                    <TableCell>{item.book.title}</TableCell>
                    <TableCell>
                      <Button onClick={() => dispatch(addCartItem(item.book.id, -1, user.id))}>
                        <RemoveTwoToneIcon sx={{ width: 15, height: 15 }} />
                      </Button>
                      {item.quantity}
                      <Button onClick={() => dispatch(addCartItem(item.book.id, 1, user.id))}>
                        <AddTwoToneIcon sx={{ width: 15, height: 15 }} />
                      </Button>
                    </TableCell>
                    <TableCell>{originalPrice.toFixed(2)}</TableCell>
                    <TableCell>{discountAmount > 0 ? `${discountAmount}%` : '-'}</TableCell>
                    <TableCell>{discountedPrice.toFixed(2)}</TableCell>
                    <TableCell>{totalForItem.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button onClick={() => dispatch(addCartItem(item.book.id, -item.quantity, user.id))}>
                        <CloseIcon sx={{ color: 'red' }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={5} sx={{ fontWeight: 'bold' }}>Subtotal</TableCell>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>{cartTotal.toFixed(2)} Rs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{ fontWeight: 'bold' }}>Delivery Charge</TableCell>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>{DELIVERY_CHARGE.toFixed(2)} Rs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{ fontWeight: 'bold' }}>Final Total</TableCell>
                <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>{finalTotal.toFixed(2)} Rs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' onClick={() => navigate('/home')}>Back To Search</Button>
        {cartItems.length > 0 && (
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Place Order
          </Button>
        )}
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box>
          <OrderForm
            user={user}
            cartItems={cartItems}
            setOpen={setOpen}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CartPage;
