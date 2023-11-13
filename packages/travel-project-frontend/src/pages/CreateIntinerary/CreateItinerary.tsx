// import styles from './CreateItinerary.module.css'
import React, { useState } from 'react'
import { Container, TextField, Button, Box, Paper } from '@mui/material'
import IconSelection from '../../components/IconSelection/IconSelection'
import ForestIcon from '@mui/icons-material/Forest'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import NordicWalkingIcon from '@mui/icons-material/NordicWalking'
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation'
import CabinIcon from '@mui/icons-material/Cabin'
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import AnchorIcon from '@mui/icons-material/Anchor'
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat'
import LocationCityIcon from '@mui/icons-material/LocationCity'

interface IconItem {
  name: string
  icon: JSX.Element
}

function CreateItinerary (): JSX.Element {
  const [itenTitle, setItenTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [location, setLocation] = useState('')
  const [numTravelers, setNumTravelers] = useState('')
  const handleCreateButtonClick = (): void => {
    console.log('Itinerary Title:', itenTitle)
    // Adding logic later for connection with backend
  }

  const icons: IconItem[] = [
    { name: 'Forest', icon: <ForestIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Beach', icon: <BeachAccessIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Hike', icon: <NordicWalkingIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Explore', icon: <EmojiTransportationIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Cabin', icon: <CabinIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Ski', icon: <SnowshoeingIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Village', icon: <HolidayVillageIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Cold', icon: <AcUnitIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Travel', icon: <TravelExploreIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Sea', icon: <AnchorIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'Boat', icon: <DirectionsBoatIcon style={ { height: '5rem', width: '5rem' } }/> },
    { name: 'City', icon: <LocationCityIcon style={ { height: '5rem', width: '5rem' } }/> }
  ]

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
      >
        <Paper elevation={6} style={{ width: '100%', padding: '2em' }}>
          <IconSelection icons={icons} />
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
