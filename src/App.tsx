import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import { Route, Navigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import BookList from './book-list/BookList';
import HomePage from './home-page/HomePage';
import LoanList from './loan-list/LoanList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/booklist" element={<BookList />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/loanlist" element={<LoanList />}>
        <Route
          path="1"
          element={
            <>
              <div
                style={{
                  height: '300px',
                  width: '100%',
                  backgroundColor: 'red',
                }}
              />
            </>
          }
        />
        <Route
          path="2"
          element={
            <>
              <div
                style={{
                  height: '300px',
                  width: '100%',
                  backgroundColor: 'blue',
                }}
              />
            </>
          }
        />
      </Route>
      <Route
        path="3"
        element={
          <>
            <div
              style={{
                height: '300px',
                width: '100%',
                backgroundColor: 'red',
              }}
            />
          </>
        }
      />
      <Route
        path="4"
        element={
          <>
            <div
              style={{
                height: '300px',
                width: '100%',
                backgroundColor: 'blue',
              }}
            />
          </>
        }
      />
    </Routes>
  );
}

export default App;
