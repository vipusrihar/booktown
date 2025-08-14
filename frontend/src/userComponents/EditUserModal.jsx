import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../state/user/Action';

const EditUser = ({ handleClose }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.users.selectedUser);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        phoneNo: selectedUser.phoneNo || '',
        address: {
          street: selectedUser.address?.street || '',
          city: selectedUser.address?.city || '',
          state: selectedUser.address?.state || '',
          country: selectedUser.address?.country || '',
          zipCode: selectedUser.address?.zipCode || ''
        }
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(selectedUser._id, formData));
    handleClose();
  };

  return (
    <Paper
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: '50px auto',
      }}
    >
      <Typography variant="h4" gutterBottom>Edit Profile</Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
        />

        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Address</Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Street"
              name="address.street"
              fullWidth
              value={formData.address.street}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="City"
              name="address.city"
              fullWidth
              value={formData.address.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="State"
              name="address.state"
              fullWidth
              value={formData.address.state}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Country"
              name="address.country"
              fullWidth
              value={formData.address.country}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Zip Code"
              name="address.zipCode"
              fullWidth
              value={formData.address.zipCode}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box sx={{display:'flex' , justifyContent:'space-between', mt: 3 }}>
        <Button
        type='button'
        variant='contained'
        color='error'
        onClick={handleClose}

        >
        Cancel

        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
         
        >
          Save
        </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditUser;
