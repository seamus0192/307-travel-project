import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Container,
  Card,
  Typography,
} from "@mui/material";
// import { getItineraries } from '../../httpClient/itinerary'
import Grid from "@mui/material/Grid";
import ForestIcon from "@mui/icons-material/Forest";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import NordicWalkingIcon from "@mui/icons-material/NordicWalking";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import CabinIcon from "@mui/icons-material/Cabin";
import SnowshoeingIcon from "@mui/icons-material/Snowshoeing";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AnchorIcon from "@mui/icons-material/Anchor";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleIcon from "@mui/icons-material/People";
import { Link as RouterLink } from "react-router-dom";
import { getItineraries } from "../../httpClient/itinerary";

interface Itinerary {
  id: number;
  name: string;
  icon?: string; // Optional icon
  startDate: Date; // Using string to represent dates, can be adjusted based on how dates are handled
  endDate: Date;
  travelerCount: number;
}

interface IconItem {
  name: string;
  icon: React.ReactElement;
}

function HomePage(): JSX.Element {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const icons: IconItem[] = [
    {
      name: "Forest",
      icon: <ForestIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Beach",
      icon: <BeachAccessIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Hike",
      icon: <NordicWalkingIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Explore",
      icon: (
        <EmojiTransportationIcon style={{ height: "5rem", width: "5rem" }} />
      ),
    },
    {
      name: "Cabin",
      icon: <CabinIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Ski",
      icon: <SnowshoeingIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Village",
      icon: <HolidayVillageIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Cold",
      icon: <AcUnitIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Travel",
      icon: <TravelExploreIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Sea",
      icon: <AnchorIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "Boat",
      icon: <DirectionsBoatIcon style={{ height: "5rem", width: "5rem" }} />,
    },
    {
      name: "City",
      icon: <LocationCityIcon style={{ height: "5rem", width: "5rem" }} />,
    },
  ];

  useEffect((): void => {
    getItineraries(localStorage.userId as number)
      .then((data) => {
        setItineraries(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }): void => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (): void => {
    console.log(searchTerm.toLowerCase());
    const filteredItineraries = itineraries.filter((itinerary) =>
      itinerary.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setItineraries(filteredItineraries);
  };

  return (
    <div>
      <AppBar
        position="static"
        elevation={0}
        style={{ padding: "5rem 0", backgroundColor: "transparent" }}
      >
        <Toolbar style={{ justifyContent: "center" }}>
          <TextField
            label="Search Itinerary"
            variant="outlined"
            onChange={handleSearchChange}
            style={{ marginRight: "10px", width: "50%" }}
          />
          <Button
            style={{
              backgroundColor: "#7139a8",
              height: "3.25rem",
              width: "7rem",
            }}
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        {itineraries.map((itinerary) => (
          <Card
            key={itinerary.id}
            style={{
              marginBottom: "20px",
              color: "#7139a8",
              textDecoration: "none",
            }}
            component={RouterLink}
            to="/itinerary"
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                {
                  icons.find((iconItem) => iconItem.name === itinerary.icon)
                    ?.icon
                }
              </Grid>
              <Grid item xs>
                <Typography variant="h5">{itinerary.name}</Typography>
                <Grid>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <PeopleIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {itinerary.travelerCount}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ padding: "0 1rem 0 1rem" }}
                >
                  Start Date: {itinerary.startDate.toString().substring(0, 10)}
                </Typography>
                <Typography
                  variant="body1"
                  style={{ padding: "0 1rem 0 1rem" }}
                >
                  End Date: &nbsp;
                  {itinerary.endDate.toString().substring(0, 10)}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default HomePage;
