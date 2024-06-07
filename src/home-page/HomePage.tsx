import React from 'react';
import './HomePage.css';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleListOfBooksClick = () => {
    navigate('/booklist');
  };

  const handleListOfLoansClick = () => {
    navigate('/loanlist');
  };

  const handleListOfUsersClick = () => {
    navigate('/userlist');
  };

  return (
    <div className="home-page-container">
      <div className="home-page">
        <h1>Welcome to the library!</h1>
        <p>Choose what you want to do: </p>
      </div>
      <Stack spacing={2} direction="column" alignItems="center">
        <Button
          className="large-button"
          variant="contained"
          onClick={handleListOfBooksClick}
        >
          List of books
        </Button>
        <Button
          className="large-button"
          variant="contained"
          onClick={handleListOfLoansClick}
        >
          List of loans
        </Button>
        <Button
          className="large-button"
          variant="contained"
          onClick={handleListOfUsersClick}
        >
          List of users
        </Button>
      </Stack>
    </div>
  );
}

export default HomePage;
