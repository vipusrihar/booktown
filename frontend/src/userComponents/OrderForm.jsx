import React, { useEffect, useState } from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select,
    TextField, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../state/user/Action';
import { createOrder } from '../state/order/Action';

const DELIVERY_CHARGE = 250;

const OrderForm = ({ user, cartItems, setOpen }) => {
    const dispatch = useDispatch();
    const discounts = useSelector((state) => state.discounts.discountsByBookId || {});
    const thisUser = useSelector((state) => state.users.selectedUser);

    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [useSavedDetails, setUseSavedDetails] = useState(false);
    const [openDialog, setOpenDialog] = useState(false); // 🔴 New State

    useEffect(() => {
        if (user?.id) {
            dispatch(getUserById(user.id));
        }
    }, [dispatch, user?.id]);

    const subtotal = cartItems.reduce((total, item) => {
        const discountObj = discounts[item.book._id];
        const discount = discountObj ? discountObj.amount : 0;
        const discountedPrice = item.book.price * (1 - discount / 100);
        return total + discountedPrice * item.quantity;
    }, 0);

    const totalWithDelivery = subtotal + DELIVERY_CHARGE;

    const handleChange = (e) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            const isMissingDetails = !thisUser?.phoneNo || !thisUser?.address ||
                Object.values(thisUser?.address || {}).some(value => !value);

            if (isMissingDetails) {
                setOpenDialog(true); // 🔴 Show dialog
                setUseSavedDetails(false);
                return;
            }

            setUseSavedDetails(true);
            setPhone(thisUser.phoneNo);
            setStreet(thisUser.address.street);
            setCity(thisUser.address.city);
            setStateName(thisUser.address.state);
            setCountry(thisUser.address.country);
            setZipCode(thisUser.address.zipCode);
        } else {
            setUseSavedDetails(false);
            setPhone('');
            setStreet('');
            setCity('');
            setStateName('');
            setCountry('');
            setZipCode('');
        }
    };

    const handleGoToProfile = () => {
        setOpenDialog(false);
        window.location.href = '/profile';
    };

    const handleFinalOrder = async () => {
        const orderDetails = {
            user: user?.id,
            phoneNo: phone,
            address: { street, city, state: stateName, country, zipCode },
            paymentMethod,
            items: cartItems,
            totalPrice: totalWithDelivery,
        };

        try {
            await dispatch(createOrder(orderDetails));
            setOpen(false);
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };


    return (
        <Box sx={{
            width: 600,
            bgcolor: 'background.paper',
            p: 4,
            mx: 'auto',
            mt: 4,
            borderRadius: 2
        }}>
            <Typography variant="h6" gutterBottom>Confirm Your Order</Typography>

            <Typography variant="subtitle1">Books:</Typography>

            <Box sx={{ borderWidth: 1, padding: 2 }}>
                {cartItems.map((item, index) => {
                    const discountObj = discounts[item.book._id];
                    const discount = discountObj ? discountObj.amount : 0;
                    const discountedPrice = item.book.price * (1 - discount / 100);
                    return (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>{item.book.title} {discount > 0 && (
                                <span style={{ color: 'green' }}> (-{discount}% off)</span>
                            )}</Typography>
                            <Typography>
                                {discountedPrice.toFixed(2)} x {item.quantity} = {(discountedPrice * item.quantity).toFixed(2)}
                            </Typography>
                        </Box>
                    );
                })}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>Rs {subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Delivery Charge:</Typography>
                    <Typography>Rs {DELIVERY_CHARGE.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontWeight: 'bold' }}>
                    <Typography>Total:</Typography>
                    <Typography>Rs {totalWithDelivery.toFixed(2)}</Typography>
                </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
                <label>
                    <input
                        type="checkbox"
                        checked={useSavedDetails}
                        onChange={handleChange}
                    />{' '}
                    Select Saved Details
                </label>
            </Box>

            <TextField
                label="Phone Number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mt: 2 }}
            />

            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={4}>
                    <TextField
                        label="Street"
                        fullWidth
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField
                        label="City"
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField
                        label="State"
                        fullWidth
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField
                        label="Country"
                        fullWidth
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField
                        label="Zip Code"
                        fullWidth
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </Grid>
            </Grid>

            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    label="Payment Method"
                >
                    <MenuItem value="cash">Cash on Delivery</MenuItem>
                    <MenuItem value="card">Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                </Select>
            </FormControl>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleFinalOrder}
                    disabled={
                        !phone || !street || !city || !stateName || !country || !zipCode || !paymentMethod
                    }
                >
                    Confirm & Place Order
                </Button>
            </Box>

             <Dialog open={openDialog} onClose={() => setOpenDialog(false)} >
                <DialogTitle>No Details Provided</DialogTitle>
                <DialogContent>
                    You did not provide any details before. 
                    If you wan to use, 
                    Please add your phone number and address details in your profile before using saved info.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleGoToProfile} variant="contained">Go to Profile</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderForm;
