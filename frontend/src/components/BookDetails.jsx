import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getBookById } from '../state/book/Action';
import AddToCartModal from './AddToCartModal';
import { addCartItem } from '../state/cart/Action';

const BookDetails = () => {
  const hashid = window.location.pathname.split('/').pop();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookById(hashid));
  }, [dispatch, hashid]);

  const book = useSelector((state) => state.books.selectedBook);
  const userId = useSelector((state) => state.auth.selectedUser?.id) || null;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  const handleAddToCart = (book) => {
    setSelectedBook(book);
    setQuantity(1);
    if (!userId) {
      alert("Please login to add items to your cart.");
      return;
    }
    setModalOpen(true);

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 30000);
  };


  const handleConfirmAddToCart = () => {
    dispatch(addCartItem(selectedBook._id, quantity, userId));
    alert("Item added to cart successfully!")
    console.log("Add to Cart:", selectedBook, quantity);
    setModalOpen(false);
  };


  return (
    <>
      <Grid container spacing={4} alignItems="flex-start" sx={{ padding: 4, border: 1, margin: 4 }}>
        <Grid size={2}>
          <Box
            component="img"
            src={book.image}
            alt={book.title}
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid size={10} >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {book.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            by {book.author}
          </Typography>

          <Chip
            label={`Rs. ${book.price}`}
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#78350F',
            }}
          />

          <Typography variant="body1" sx={{ mb: 3 }}>
            {book.description || 'No description available.'}
          </Typography>

          <Button variant="contained" color="primary" onClick={() => {
            handleAddToCart(book);
            disabled = { isAdded };
          }}>
            {isAdded ? "Added" : "Add to Cart"}
          </Button>
        </Grid>
      </Grid>

      <AddToCartModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        book={selectedBook}
        quantity={quantity}
        setQuantity={setQuantity}
        onConfirm={handleConfirmAddToCart}
      />

    </>
  );
};

export default BookDetails;
