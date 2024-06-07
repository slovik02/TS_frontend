import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import { Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import BookList from './book-list/BookList';
import HomePage from './home-page/HomePage';
import LoanList from './loan-list/LoanList';
import ApiProvider from './api/ApiProvider';
import UserList from './user-list/UserList';
import AddBook from './book-list/AddBook';
import AddLoan from './loan-list/AddLoan';
import AddUser from './user-list/AddUser';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/loanlist" element={<LoanList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/addloan" element={<AddLoan />} />
          <Route path="/adduser" element={<AddUser />}>
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
          <Route
            path="5"
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
          <Route
            path="6"
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
          <Route
            path="7"
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
          <Route
            path="8"
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
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
