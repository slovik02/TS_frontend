import React, { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import MenuAppBar from '../app-bar/AppBar';
import { useNavigate } from 'react-router-dom';
import { LibraryClient } from '../api/library-client';
import { useApi } from '../api/ApiProvider';

export default function AddUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const apiClient: LibraryClient = useApi();

  const handleAddUser = () => {
    const newUser = {
      username: username,
      password: password,
      role: role,
      email: email,
    };

    apiClient
      .postUsers(newUser)
      .then((response) => {
        if (response.success) {
          console.log('User added successfully');
          setUsername('');
          setPassword('');
          setRole('');
          setEmail('');
          navigate('/userlist');
        } else {
          console.error('Failed to add user');
        }
      })
      .catch((error) => {
        console.error('Error adding user:', error);
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
          Add New User
        </Typography>
        <Box sx={{ width: 400 }}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Role"
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            margin="normal"
          >
            <MenuItem value="ROLE_ADMIN">ROLE_ADMIN</MenuItem>
            <MenuItem value="ROLE_READER">ROLE_READER</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <Box mt={2}>
            <Button
              variant="contained"
              className="add-user"
              onClick={handleAddUser}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
