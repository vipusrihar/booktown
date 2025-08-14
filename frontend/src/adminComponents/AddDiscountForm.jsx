import {
    Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select,
    Stack, TextField, Button, Box, Typography
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const AddDiscountForm = ({ dialogType, selectedDiscount, handleChange,
    handleSave, handleCloseDialog }) => {



    console.log(selectedDiscount);

    const availableBooks = useSelector((store) => store.books.books);
    return (
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, mb: 3, backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
                {dialogType === 'edit' ? 'Edit Discount' : 'Add Discount'}
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Code"
                    value={selectedDiscount?.code || ''}
                    onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
                    fullWidth
                />
                <TextField
                    label="Amount (%)"
                    type="number"
                    value={selectedDiscount?.amount || ''}
                    onChange={(e) => handleChange('amount', Number(e.target.value))}
                    fullWidth
                />
                <TextField
                    label="Valid From"
                    type="date"
                    value={selectedDiscount?.validFrom?.slice(0, 10) || ''}
                    onChange={(e) => handleChange('validFrom', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Valid To"
                    type="date"
                    value={selectedDiscount?.validTo?.slice(0, 10) || ''}
                    onChange={(e) => handleChange('validTo', e.target.value)}
                    fullWidth
                />
                <FormControl fullWidth disabled={selectedDiscount?.appliesToAll}>
                    <InputLabel>Select Books</InputLabel>
                    <Select
                        multiple
                        value={selectedDiscount?.books || []}
                        onChange={(e) => handleChange('books', e.target.value)}
                        renderValue={(selected) =>
                            selected
                                .map((id) => availableBooks.find((book) => book._id === id)?.title)
                                .join(', ')
                        }
                    >
                        {availableBooks.map((book) => (
                            <MenuItem key={book._id} value={book._id}>
                                <Checkbox checked={selectedDiscount?.books?.includes(book._id)} />
                                <ListItemText primary={book.title} />
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>

                <Box>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedDiscount?.appliesToAll || false}
                            onChange={(e) => handleChange('appliesToAll', e.target.checked)}
                        />{' '}
                        Applies to all books
                    </label>
                </Box>

                <Stack direction="row" spacing={2}>
                    <Button onClick={handleCloseDialog} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default AddDiscountForm;
