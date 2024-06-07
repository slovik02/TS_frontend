import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import MenuAppBar from '../app-bar/AppBar';
import { useNavigate } from 'react-router-dom';
import { LibraryClient } from '../api/library-client';
import { useApi } from '../api/ApiProvider';

export default function AddLoan() {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [rentalDate, setRentalDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const navigate = useNavigate();
  const apiClient = useApi();

  const handleAddLoan = () => {
    // Define newLoan object with mandatory properties
    const newLoan: {
      userId: string;
      bookId: string;
      rentalDate: string;
      endDate: string;
      returnDate?: string;
    } = {
      userId: userId,
      bookId: bookId,
      rentalDate: rentalDate,
      endDate: endDate,
    };

    // Optionally include the return date in the request if it's provided by the user
    if (returnDate) {
      newLoan.returnDate = returnDate;
    }

    apiClient
      .postLoans(newLoan)
      .then((response) => {
        if (response.success) {
          console.log('Loan added successfully');
          setUserId('');
          setBookId('');
          setRentalDate('');
          setEndDate('');
          setReturnDate('');
          navigate('/loanlist');
        } else {
          console.error('Failed to add loan');
        }
      })
      .catch((error) => {
        console.error('Error adding loan:', error);
      });
  };

  return (
    <>
      <MenuAppBar />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add New Loan
        </Typography>
        <Box sx={{ width: 400 }}>
          <TextField
            fullWidth
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Rental Date"
            value={rentalDate}
            onChange={(e) => setRentalDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <Box mt={2}>
            <Button
              variant="contained"
              className="add-loan"
              onClick={handleAddLoan}
            >
              Add Loan
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
