// import styles from './CreateItinerary.module.css'
import React, { useState } from 'react'
import { Container, TextField, Button, Box, Paper, Select, FormControl, MenuItem, InputLabel } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import Grid from '@mui/material/Unstable_Grid2'

function CreateEvent(): React.ReactElement {
    const [itenTitle, setItenTitle] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [location, setLocation] = useState('')
    const [numTravelers, setNumTravelers] = useState('')
    const [age, setAge] = React.useState('')
    const handleCreateButtonClick = (): void => {
        console.log('Itinerary Title:', itenTitle) // Adding logic later for connection with backend
    }
    const handleChange = (event: SelectChangeEvent): void => {
        setAge(event.target.value)
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
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid container spacing={2}>
                            <Grid xs={8}>
                                <TextField
                                    label="Itinerary"
                                    variant="outlined"
                                    value={itenTitle}
                                    onChange={(e) => { setItenTitle(e.target.value) }}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="Day"
                                    variant="outlined"
                                    value={startDate}
                                    onChange={(e) => { setStartDate(e.target.value) }}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={3}>
                                <TextField
                                    label="Start Time"
                                    variant="outlined"
                                    value={endDate}
                                    onChange={(e) => { setEndDate(e.target.value) }}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={3}>
                                <TextField
                                    label="End Time"
                                    variant="outlined"
                                    value={endDate}
                                    onChange={(e) => { setEndDate(e.target.value) }}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Event Type*"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Conference'}>Conference</MenuItem>
                                        <MenuItem value={'Drive'}>Drive</MenuItem>
                                        <MenuItem value={'Concert'}>Concert</MenuItem>
                                        <MenuItem value={'Hotel'}>Hotel</MenuItem>
                                        <MenuItem value={'Flight'}>Flight</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    label="Reservation/Ticket"
                                    variant="outlined"
                                    value={location}
                                    onChange={(e) => { setLocation(e.target.value) }}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    label="Cost"
                                    variant="outlined"
                                    value={location}
                                    onChange={(e) => { setLocation(e.target.value) }}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="Location"
                                    variant="outlined"
                                    value={numTravelers}
                                    onChange={(e) => { setNumTravelers(e.target.value) }}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
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

export default CreateEvent
