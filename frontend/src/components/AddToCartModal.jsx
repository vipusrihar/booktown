import React from 'react';
import {
  Modal,  Box,  Typography,
  TextField,  Button,} from '@mui/material';

const AddToCartModal = ({  open,  onClose,  book,  quantity,  setQuantity,  onConfirm,}) => {
  if (!book) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom className='text-center text-yellow-900 '>
          Add to Cart
        </Typography>
      <div className=''>
          <Typography><b>Title:</b> {book.title}</Typography>
        <Typography><b>Author:</b> {book.author}</Typography>
        <Typography><b>Price:</b> Rs. {book.price}</Typography>
      </div>
        <TextField
          label="Quantity"
          type="number"
          setProps={{ min: 1 }}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          fullWidth
          margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onConfirm}>Add</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddToCartModal;
