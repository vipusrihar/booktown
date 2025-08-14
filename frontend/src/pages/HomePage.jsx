import React from 'react'
import NavBar from '../components/NavBar'
import BooksList from '../components/BooksList'
import { Box, TextField } from '@mui/material'



const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("https://images2.alphacoders.com/261/26102.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        marginTop: 0,
        paddingBottom: 10,
      }}
    >
      <BooksList />

    </Box>
  )
}

export default HomePage
