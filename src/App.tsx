import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './login-form/LoginForm';
import BookList from './book-list/BookList';

function App() {
  return (
    <div className="App">
      <BookList></BookList>
    </div>
  );
}

export default App;
