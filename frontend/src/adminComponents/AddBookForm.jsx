import React, { useState } from "react";
import {
  Box, TextField, Button, Typography, InputLabel, Select,
  MenuItem, FormControl, Grid, CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { secureImageUpload } from '../utils/uploadImageToCloudinary';

const CATEGORIES = [
  "CATEGORY_FICTION", "CATEGORY_NON_FICTION", "CATEGORY_SCIENCE",
  "CATEGORY_HISTORY", "CATEGORY_BIOGRAPHY", "CATEGORY_FANTASY",
  "CATEGORY_ROMANCE", "CATEGORY_HORROR", "CATEGORY_THRILLER",
  "CATEGORY_CHILDREN", "CATEGORY_YOUNG_ADULT", "CATEGORY_POETRY",
  "CATEGORY_SELF_HELP", "CATEGORY_BUSINESS", "CATEGORY_TECHNOLOGY",
  "CATEGORY_TRAVEL", "CATEGORY_COOKING", "CATEGORY_HEALTH",
  "CATEGORY_RELIGION", "CATEGORY_EDUCATION"];

const AddBookForm = ({ onClose, onSubmit, initialData = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadImage, setUploadImage] = useState(false);

  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    imageLink: '',
    description: '',
    stock: '',
    price: '',
    ...initialData,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadImage(true);
    const imageUrl = await secureImageUpload(file);
    setForm(prev => ({ ...prev, image: imageUrl }));
    setUploadImage(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = 'Title is required';
    if (!form.author) newErrors.author = 'Author is required';
    if (!form.isbn) newErrors.isbn = 'ISBN is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (form.stock <= 0) newErrors.stock = 'Stock must be positive';
    if (form.price <= 0) newErrors.price = 'Price must be positive';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box
      sx={{
        padding: 3,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFF3E0',
        borderRadius: 2,
        boxShadow: 3,
        height: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: '#78350F' }}>
          Add New Book
        </Typography>
        <Button onClick={onClose}>
          <CloseIcon sx={{ color: 'red' }} />
        </Button>
      </Box>

      {/* Image Upload */}
      <Grid sx={{ mb: 2 }}>
        <input
          accept="image/*"
          id="fileInput"
          style={{ display: 'none' }}
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="fileInput">
          <span className="w-24 h-25 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
            <AddPhotoAlternateIcon />
          </span>
          {uploadImage && (
            <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
        </label>
      </Grid>

      {form.imageLink && (
        <Box sx={{ mb: 2 }}>
          <img
            src={form.imageLink}
            alt="Book Cover"
            style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
          />
        </Box>
      )}

      {/* Form Fields */}
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        variant="outlined"
        sx={{ mb: 1 }}
        required
      />
      <TextField
        fullWidth
        label="Author"
        name="author"
        value={form.author}
        onChange={handleChange}
        error={!!errors.author}
        helperText={errors.author}
        variant="outlined"
        sx={{ mb: 1 }}
        required
      />
      <TextField
        fullWidth
        label="ISBN"
        name="isbn"
        value={form.isbn}
        onChange={handleChange}
        variant="outlined"
        error={!!errors.isbn}
        helperText={errors.isbn}
        sx={{ mb: 1 }}
        required
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          {CATEGORIES.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </MenuItem>
          ))}

        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        variant="outlined"
        multiline
        error={!!errors.description}
        helperText={errors.description}
        rows={3}
        sx={{ mb: 1 }}
      />

      <TextField
        fullWidth
        label="Stock"
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        variant="outlined"
        error={!!errors.stock}
        helperText={errors.stock}
        sx={{ mb: 1 }}
        required
      />

      <TextField
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        variant="outlined"
        error={!!errors.price}
        helperText={errors.price}
        sx={{ mb: 2 }}
        required
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#D97706', color: 'white' }}
        >
          {initialData ? 'Update Book' : 'Add Book'}
        </Button>
        <Button>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddBookForm;
