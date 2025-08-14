import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Stack, Typography, Box, Modal, TextField, IconButton, Switch
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDiscount, deleteDiscountById, editDiscount, getAllDiscounts, updateDiscountStatusById
} from '../state/discount/Action';
import { getAllBooks } from '../state/book/Action';
import AddDiscountForm from './AddDiscountForm';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { id: 'code', label: 'Code', minWidth: 100 },
  { id: 'amount', label: 'Amount (%)', minWidth: 80 },
  { id: 'validFrom', label: 'Valid From', minWidth: 120 },
  { id: 'validTo', label: 'Valid To', minWidth: 120 },
  { id: 'books', label: 'Applied For', minWidth: 100 },
  { id: 'appliesToAll', label: 'Applies All', minWidth: 100 },
  { id: 'active', label: 'Active', minWidth: 80 },
  { id: 'actions', label: 'Actions', minWidth: 200 },
];

const defaultDiscount = {
  code: '',
  amount: '',
  validFrom: '',
  validTo: '',
  appliesToAll: false,
  books: [],
  active: true,
};

const DiscountsPage = () => {
  const dispatch = useDispatch();
  const discounts = useSelector((store) => store.discounts.discounts);

  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState('add');
  const [selectedDiscount, setSelectedDiscount] = useState(defaultDiscount);
  const [search, setSearch] = useState('');

  const handleOpenDialog = (type, discount = null) => {
    setDialogType(type);

    if (discount) {
      const normalized = {
        ...discount,
        books: discount.books.map((b) => (typeof b === 'object' ? b._id : b)),
      };
      setSelectedDiscount(normalized);
    } else {
      setSelectedDiscount(defaultDiscount);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDiscount(defaultDiscount);
  };

  const handleChange = (field, value) => {
    setSelectedDiscount((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const { code, amount, validFrom, validTo, appliesToAll, books } = selectedDiscount;

    if (!code || !amount || !validFrom || !validTo) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!appliesToAll && (!books || books.length === 0)) {
      alert('Please select at least one book or enable "Applies to all".');
      return;
    }

    dialogType === 'add'
      ? dispatch(createDiscount(selectedDiscount))
      : dispatch(editDiscount(selectedDiscount._id, selectedDiscount));

    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      dispatch(deleteDiscountById(id))
    }
  };

  const handleToggleActive = (discount) => {
    dispatch(updateDiscountStatusById(discount._id, !discount.active));
  };

  useEffect(() => {
    dispatch(getAllDiscounts());
    dispatch(getAllBooks());
  }, [dispatch]);

  const filteredDiscounts = discounts.filter((d) => {
    const searchLower = search.toLowerCase();
    return (
      d.code?.toLowerCase().includes(searchLower) ||
      String(d.amount).includes(searchLower) ||
      d.books?.some((b) =>
        typeof b === 'object'
          ? b.title.toLowerCase().includes(searchLower)
          : false
      )
    );
  });

  return (
    <Box p={2}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#78350F' }}>
          Manage Discount Offers
        </Typography>
        <Button onClick={() => handleOpenDialog('add')}>
          <AddIcon sx={{ width: 40, height: 40, color: '#78350F' }} />
        </Button>
      </Box>

      <Box mb={2}>
        <TextField
          label="Search by Code, Amount, or Book"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Box>

      <Modal open={open} onClose={handleClose} sx={{ overflow: 'scroll' }}>
        <Box>
          <AddDiscountForm
            dialogType={dialogType}
            selectedDiscount={selectedDiscount}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCloseDialog={handleClose}
          />
        </Box>
      </Modal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    sx={{
                      minWidth: col.minWidth,
                      backgroundColor: '#FCD34D',
                      color: '#78350F',
                      fontWeight: 'bold',
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDiscounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No matching discounts found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDiscounts.map((row) => (
                  <TableRow hover key={row._id}>
                    {columns.map((column) =>
                      column.id === 'actions' ? (
                        <TableCell key="actions">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              color="primary"
                              onClick={() => handleOpenDialog('edit', row)}
                              disabled={new Date(row.validTo) < new Date()}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(row._id)}

                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      ) : column.id === 'books' ? (
                        <TableCell key="books">
                          {row.books?.map((b) =>
                            typeof b === 'object' ? b.title : b
                          ).join(', ')}
                        </TableCell>
                      ) : column.id === 'active' ? (
                        <TableCell key="active">
                          <Switch
                            checked={row.active}
                            onChange={() => handleToggleActive(row)}
                            disabled={new Date(row.validTo) < new Date()}
                          />
                        </TableCell>
                      ) : column.id === 'appliesToAll' ? (
                        <TableCell key="appliesToAll">
                          {row.appliesToAll ? 'Yes' : 'No'}
                        </TableCell>
                      ) : column.id === 'validFrom' || column.id === 'validTo' ? (
                        <TableCell key={column.id}>
                          {new Date(row[column.id]).toLocaleDateString()}
                        </TableCell>
                      ) : (
                        <TableCell key={column.id}>
                          {String(row[column.id])}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DiscountsPage;
