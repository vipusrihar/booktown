import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, Typography, Button, Modal,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddBookForm from './AddBookForm';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, deleteBookById, getAllBooks, updateBook } from '../state/book/Action';

const columns = [
  { id: 'isbn', label: 'ISBN', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 80 },
  { id: 'author', label: 'Author', minWidth: 80 },
  { id: 'category', label: 'Category', minWidth: 80 },
  { id: 'stock', label: 'Stock', minWidth: 40 },
  { id: 'price', label: 'Price', minWidth: 40 },
];


const categories = [
  { value: "", label: "" },
  { value: "CATEGORY_FICTION", label: "Fiction" },
  { value: "CATEGORY_NON_FICTION", label: "Non-Fiction" },
  { value: "CATEGORY_SCIENCE", label: "Science" },
  { value: "CATEGORY_HISTORY", label: "History" },
  { value: "CATEGORY_BIOGRAPHY", label: "Biography" },
  { value: "CATEGORY_FANTASY", label: "Fantasy" },
  { value: "CATEGORY_ROMANCE", label: "Romance" },
  { value: "CATEGORY_HORROR", label: "Horror" },
  { value: "CATEGORY_THRILLER", label: "Thriller" },
  { value: "CATEGORY_CHILDREN", label: "Children" },
  { value: "CATEGORY_YOUNG_ADULT", label: "Young Adult" },
  { value: "CATEGORY_POETRY", label: "Poetry" },
  { value: "CATEGORY_SELF_HELP", label: "Self-Help" },
  { value: "CATEGORY_BUSINESS", label: "Business" },
  { value: "CATEGORY_TECHNOLOGY", label: "Technology" },
  { value: "CATEGORY_TRAVEL", label: "Travel" },
  { value: "CATEGORY_COOKING", label: "Cooking" },
  { value: "CATEGORY_HEALTH", label: "Health" },
  { value: "CATEGORY_RELIGION", label: "Religion" },
  { value: "CATEGORY_EDUCATION", label: "Education" }
];


const BooksPage = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const [editBook, setEditBook] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const books = useSelector((state) => state.books.books || []);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const handleAdd = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditBook(null);
  };


  const handleDelete = async (bookId) => {
    if (window.confirm(`Are you sure you want to delete this book?`)) {
      try {
        const result = await dispatch(deleteBookById(bookId));
        if (result) {
          alert('Book deleted successfully!');
        }
      } catch (error) {
        alert(error.message || 'Failed to delete book');
      }
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setOpen(true);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      (book.title?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (book.author?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (book.isbn || '').includes(searchText);

    const matchesCategory =
      categoryFilter === '' ||
      (book.category?.toLowerCase() || '') === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 1,
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: '#78350F', fontWeight: 'bold' }}>
          BOOKS
        </Typography>
        <Button onClick={handleAdd}>
          <AddIcon sx={{ width: '40px', height: '40px', color: '#78350F' }} />
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          label="Search by Title, Author or ISBN"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2, mr: 2 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <TextField
          select
          label="Filter by Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          SelectProps={{ native: true }}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2, mr: 2 }}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </TextField>
      </Box>

      <Modal open={open} onClose={handleClose} sx={{ overflow: 'scroll' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <AddBookForm
            onClose={handleClose}
            initialData={editBook}
            mode={editBook ? 'edit' : 'add'} // pass mode to form
          />
        </Box>
      </Modal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="table without pagination">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#FCD34D' }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: 'bold',
                      color: '#78350F',
                      backgroundColor: '#FCD34D',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    color: '#78350F',
                    backgroundColor: '#FCD34D',
                  }}
                >
                  Edit/Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((row, index) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                  <TableCell>
                    <Button onClick={() => handleEdit(row)}>Edit</Button>
                    <Button onClick={() => handleDelete(row.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default BooksPage;
