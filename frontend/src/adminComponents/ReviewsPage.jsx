// import React, {  useEffect, useState } from 'react';
// import {
//   Paper,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,
//   Typography,  Box,  MenuItem,  FormControl,  Select,  InputLabel,  Stack,
//   Button,
// } from '@mui/material';
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
// import StarIcon from '@mui/icons-material/Star';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllReviews } from '../state/review/Action';

// const columns = [
//   { id: '_id', label: 'Review ID', minWidth: 80 },
//   { id: `book.title`, label: 'Book Title', minWidth: 150 },
//   { id: `user.name`, label: 'User', minWidth: 120 },
//   { id: 'rating', label: 'Rating', minWidth: 100 },
//   { id: 'comment', label: 'Comment', minWidth: 200 },
// ];

// const ReviewsPage = () => {
//   const [bookFilter, setBookFilter] = useState('');
//   const [ratingFilter, setRatingFilter] = useState('');
//   const dispatch = useDispatch();

//   const reviews = useSelector((store) => store.reviews.reviews) || [];

//   useEffect(()=>{
//     dispatch(getAllReviews());
//   },[dispatch])

//   const filteredReviews = reviews.filter((row) => {
//     const matchesBook = bookFilter ? row.bookTitle === bookFilter : true;
//     const matchesRating = ratingFilter ? row.rating === parseInt(ratingFilter) : true;
//     return matchesBook && matchesRating;
//   });

//   const uniqueBooks = [...new Set(reviews.map((r) => r.bookTitle))];

//   return (
//     <Box p={3}>
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ fontWeight: 'bold', color: '#78350F' }}
//       >
//         Book Reviews
//       </Typography>

//       {/* Filters */}
//       <Stack direction="row" spacing={2} mb={2}>
//         <FormControl size="small" sx={{ minWidth: 200 }}>
//           <InputLabel>Filter by Book</InputLabel>
//           <Select
//             value={bookFilter}
//             label="Filter by Book"
//             onChange={(e) => setBookFilter(e.target.value)}
//           >
//             <MenuItem value="">All</MenuItem>
//             {uniqueBooks.map((book) => (
//               <MenuItem key={book} value={book}>
//                 {book}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl size="small" sx={{ minWidth: 200 }}>
//           <InputLabel>Filter by Rating</InputLabel>
//           <Select
//             value={ratingFilter}
//             label="Filter by Rating"
//             onChange={(e) => setRatingFilter(e.target.value)}
//           >
//             <MenuItem value="">All</MenuItem>
//             {[5, 4, 3, 2, 1].map((rating) => (
//               <MenuItem key={rating} value={rating}>
//                 {rating} Stars
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button onClick={() => { setBookFilter(''); setRatingFilter(''); }}>Clear Filters</Button>

//       </Stack>

//       <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
//         <TableContainer sx={{ maxHeight: 550 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     sx={{
//                       minWidth: column.minWidth,
//                       backgroundColor: '#FCD34D',
//                       color: '#78350F',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredReviews.map((row, index) => (
//                 <TableRow
//                   key={row._id}
//                   hover
//                   sx={{
//                     backgroundColor: index % 2 === 0 ? '#FAFAFA' : 'white',
//                   }}
//                 >
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>
//                       {column.id === 'rating' ? (
//                         [...Array(5)].map((_, i) =>
//                           i < row.rating ? (
//                             <StarIcon key={i} sx={{ color: '#FBBF24', fontSize: 20 }} />
//                           ) : (
//                             <StarOutlineIcon key={i} sx={{ color: '#E0E0E0', fontSize: 20 }} />
//                           )
//                         )
//                       ) : (
//                         row[column.id]
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//               {filteredReviews.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} align="center">
//                     No reviews found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// };

// export default ReviewsPage;
