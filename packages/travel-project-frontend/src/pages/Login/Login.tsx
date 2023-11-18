// import styles from './Login.module.css'
import React, { useState } from 'react'
import { TextField, Button, Paper, Box, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

/*

ALL OF THIS CAN BE DELETED,
Just thought it would be funny to have for now rather than an empty page

*/

function Login (): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginButtonClick = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8000/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: password })
      })

      if (response.ok) {
        const userData = await response.json()
        console.log('Login successful:', userData)
        // Handle successful login here (e.g., redirect, store user data)
      } else {
        console.error('Login failed')
        // Handle login failure here (e.g., show error message)
      }
    } catch (error) {
      console.error('Network error:', error)
    }
  }

  const login = (): void => {
    handleLoginButtonClick().catch(Error) // Call the async function without awaiting it
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={ { backgroundColor: '#f5f5f5' } } // Assuming a light grey background
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          gap: 2,
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={ (e) => { setEmail(e.target.value) } }
          fullWidth
          required
          margin="normal"
          type="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={ (e) => { setPassword(e.target.value) } }
          fullWidth
          required
          margin="normal"
          type="password"
        />
        <Button
          onClick={login}
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: '#7139a8',
            ':hover': { bgcolor: '#965ad3' }
          }}
          fullWidth
        >
          Login
        </Button>
        <Typography variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={ RouterLink } to="/signup" color="secondary">
            Sign up
        </Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default Login
