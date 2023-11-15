import React from 'react'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import VacationTrackerLogo from '../../assets/vacation_tracker.jpg'

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        overflow: 'hidden'
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <IconButton component={RouterLink} to="/home">
            <img
              src={VacationTrackerLogo}
              alt="Vacation Tracker"
              width="50"
              height="50"
            />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: '\'Roboto\', sans-serif',
              fontWeight: 500,
              marginLeft: 1
            }}
          >
            Vacation Tracker
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7139a8',
              ':hover': {
                bgcolor: '#965ad3'
              },
              mx: 1
            }}
            component={RouterLink}
            to="/login"
          >
            Login / Sign Up
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7139a8',
              ':hover': {
                bgcolor: '#965ad3'
              },
              mx: 1
            }}
            component={RouterLink}
            to="/create-itinerary"
          >
            Create Itinerary
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7139a8',
              ':hover': {
                bgcolor: '#965ad3'
              },
              mx: 1
            }}
            component={RouterLink}
            to="/itinerary/day"
          >
            TEMP: Day View
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
