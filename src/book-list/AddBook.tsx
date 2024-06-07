import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import MenuAppBar from '../app-bar/AppBar';
import { useNavigate } from 'react-router-dom';
import { LibraryClient } from '../api/library-client';
import { useApi } from '../api/ApiProvider';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');
  const [yearOfPublish, setYearOfPublish] = useState('');
  const [availableCopies, setAvailableCopies] = useState('');

  const navigate = useNavigate();
  const apiClient: LibraryClient = useApi();

  const handleAddBook = () => {
    // Create a book object with the entered information
    const newBook = {
      title: title,
      author: author,
      isbn: isbn,
      publisher: publisher,
      yearOfPublish: yearOfPublish,
      availableCopies: availableCopies,
    };

    apiClient
      .postBook(newBook)
      .then((response) => {
        if (response.success) {
          console.log('Book added successfully');
          // Optionally, you can clear the input fields after successful addition
          setTitle('');
          setAuthor('');
          setIsbn('');
          setPublisher('');
          setYearOfPublish('');
          setAvailableCopies('');
          navigate('/booklist'); // Redirect to book list page after successful addition
        } else {
          console.error('Failed to add book');
        }
      })
      .catch((error) => {
        console.error('Error adding book:', error);
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
          Add New Book
        </Typography>
        <Box sx={{ width: 400 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Year of Publish"
            value={yearOfPublish}
            onChange={(e) => setYearOfPublish(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Available Copies"
            value={availableCopies}
            onChange={(e) => setAvailableCopies(e.target.value)}
            margin="normal"
          />
          <Box mt={2}>
            <Button
              variant="contained"
              className="add-loan"
              onClick={handleAddBook}
            >
              Add Book
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
