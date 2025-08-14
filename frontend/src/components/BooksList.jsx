import React, { useEffect, useState, } from 'react';
import {
  Box, Chip, Grid, Paper, Typography,
  IconButton, Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getBookById } from '../state/book/Action';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import AddToCartModal from './AddToCartModal';
import { addCartItem } from '../state/cart/Action';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative',
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  '&:hover .overlay': {
    opacity: 1,
  },
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  zIndex: 2,
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginTop: 10,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  border: '2px solid black',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '50ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
}));


const BooksList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books) || [];
  const userId = useSelector((state) => state.auth.selectedUser?.id) || null;
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (books.length === 0) {
      dispatch(getAllBooks());
    }
  }, [dispatch, books]);


  const handleViewBook = (hashid) => {
    dispatch(getBookById(hashid));
    navigation(`/book/${hashid}`);
  }

  const handleAddToCart = (book) => {
    setSelectedBook(book);
    setQuantity(1);
    if (!userId) {
      alert("Please login to add items to your cart.");
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmAddToCart = () => {
    dispatch(addCartItem(selectedBook._id, quantity, userId));
    alert("Item added to cart successfully!");
    console.log("Add to Cart:", selectedBook, quantity);
    setModalOpen(false);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()) ||
      book.isbn.includes(searchText)
    return matchesSearch;
  });


  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Box sx={{ pt: 0, mt: 0 }}>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center', marginTop: 0
          }}>
          <Search>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..........By book Name or By Author Name or By ISBN number"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

          </Search>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 4, }}>
        <Grid container spacing={4}>
          {filteredBooks.map((book) => (
            <Grid size={3} key={book._id}>
              <Item>
                <ImageContainer>
                  <Chip
                    label={`Rs. ${book.price}`}
                    variant="outlined"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      fontWeight: 'bold',
                      backgroundColor: 'yellow',
                      color: '#78350F',
                      zIndex: 3,
                    }}
                  />

                  <Box
                    component="img"
                    src={book.image}
                    alt={book.title}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />

                  <Overlay className="overlay">
                    <Tooltip title="View Book">
                      <IconButton
                        sx={{ color: '#fff', backgroundColor: '#00000088' }}
                        aria-label="View Book"
                        onClick={() => handleViewBook(book.hashid)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add to Cart">
                      <IconButton
                        sx={{ color: '#fff', backgroundColor: '#00000088' }}
                        aria-label="Add to Cart"
                        onClick={() => handleAddToCart(book)}>
                        <ShoppingCartIcon />
                      </IconButton>
                    </Tooltip>
                  </Overlay>


                </ImageContainer>

                <Typography variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mt: 2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                  {book.title}
                </Typography>

              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      {
        userId && (
          <AddToCartModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            book={selectedBook}
            quantity={quantity}
            setQuantity={setQuantity}
            onConfirm={handleConfirmAddToCart}
          />
        )
      }

    </>
  );
};

export default BooksList;
