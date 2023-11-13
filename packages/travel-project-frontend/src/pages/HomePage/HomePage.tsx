import React, { useState } from 'react'
import { TextField, Button, Paper, Box } from '@mui/material'

function CreateHomePage (): JSX.Element {
  const [searchTitle, setSearchTitle] = useState('')
  const [searchAuthor, setSearchAuthor] = useState('')

  const handleSearchButtonClick = (): void => {
    console.log('Search Title:', searchTitle, 'Search Author:', searchAuthor)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '500px',
          p: 4,
          m: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <TextField
          label="Enter Title"
          variant="outlined"
          value={searchTitle}
          onChange={ (e) => { setSearchTitle(e.target.value) } }
          margin="normal"
          fullWidth
        />
        <TextField
          label="Enter Author"
          variant="outlined"
          value={searchAuthor}
          onChange={ (e) => { setSearchAuthor(e.target.value) } }
          margin="normal"
          fullWidth
        />
        <Button
          onClick={handleSearchButtonClick}
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: '#7139a8',
            ':hover': {
              bgcolor: '#965ad3'
            }
          }}
        >
          Search
        </Button>
      </Paper>
    </Box>
  )
}

export default CreateHomePage
