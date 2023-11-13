// import styles from './CreateItinerary.module.css'
import React, { useState } from 'react'
import { Container, TextField, Button, Box, Paper } from '@mui/material'
// import IconSelection from '../../components/IconSelection/IconSelection'

function CreateItinerary (): JSX.Element {
  const [itenTitle, setItenTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [location, setLocation] = useState('')
  const [numTravelers, setNumTravelers] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<string>('')

  const handleCreateButtonClick = (): void => {
    console.log('Itinerary Title:', itenTitle)
    // Adding logic later for connection with backend
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
      >
        <Paper elevation={6} style={{ width: '100%', padding: '2em' }}>
          { /* TODO: implement IconSelection*/ }
          { /*<IconSelection onSelect={(icon) => { setSelectedIcon(icon) }} />*/ }
          { /*{selectedIcon !== '' && <p>Selected Icon: {selectedIcon}</p>}*/ }
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              label="Itinerary Title"
              variant="outlined"
              value={itenTitle}
              onChange={ (e) => { setItenTitle(e.target.value) } }
              margin="normal"
              fullWidth
            />
            <TextField
              label="Location"
              variant="outlined"
              value={location}
              onChange={ (e) => { setLocation(e.target.value) } }
              margin="normal"
              fullWidth
            />
            <TextField
              label="Start Date (DD/MM/YYYY)"
              variant="outlined"
              value={startDate}
              onChange={ (e) => { setStartDate(e.target.value) } }
              margin="normal"
              fullWidth
            />
            <TextField
              label="End Date (DD/MM/YYYY)"
              variant="outlined"
              value={endDate}
              onChange={ (e) => { setEndDate(e.target.value) } }
              margin="normal"
              fullWidth
            />
            <TextField
              label="# of Travelers"
              variant="outlined"
              value={numTravelers}
              onChange={ (e) => { setNumTravelers(e.target.value) } }
              margin="normal"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateButtonClick}
              sx={{
                m: 2,
                backgroundColor: '#7139a8',
                ':hover': {
                  bgcolor: '#965ad3'
                }
              }}
            >
              Create
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default CreateItinerary
