import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
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
import { getItineraries, deleteItinerary } from "../../httpClient/itinerary";
import { type Itinerary } from "@prisma/client";
import { authContext } from "../../authContext/authContext";

interface IconItem {
  name: string;
  icon: React.ReactElement;
}

function HomePage(): JSX.Element {
  const { user } = useContext(authContext);

  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalItineraries, setOriginalItineraries] = useState<Itinerary[]>(
    [],
  );

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
    if (user !== null) {
      getItineraries(user.id)
        .then((data) => {
          setItineraries(data);
          setOriginalItineraries(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }): void => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (): void => {
    console.log(searchTerm.toLowerCase());
    const filteredItineraries = originalItineraries.filter((itinerary) =>
      itinerary.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setItineraries(filteredItineraries);
  };

  const handleDelete = async (
    itineraryId: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.stopPropagation(); // Prevent event from bubbling up to the container click
    try {
      await deleteItinerary(itineraryId);
      setItineraries(
        itineraries.filter((itinerary) => itinerary.id !== itineraryId),
      );
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
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
            label="Search Itineraries"
            variant="outlined"
            onChange={handleSearchChange}
            style={{ marginRight: "10px", width: "50%" }}
          />
          <Button
            sx={{
              backgroundColor: "#203973",
              ":hover": {
                bgcolor: "#3355A8",
              },
            }}
            style={{
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
      <Grid container spacing={2} justifyContent="center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7139a8",
            ":hover": {
              bgcolor: "#965ad3",
            },
            mx: 1,
          }}
          component={RouterLink}
          to="/create-itinerary"
        >
          Create Itinerary
        </Button>
      </Grid>
      <Container>
        {itineraries.map((itinerary) => (
          <Card
            key={itinerary.id}
            sx={{ marginBottom: 2, mt: 2, position: "relative" }}
            style={{
              backgroundColor: "#daeee7",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c0deda";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#daeee7";
            }}
          >
            <CardContent sx={{ "&:last-child": { paddingBottom: 2 } }}>
              <RouterLink
                to={`/itinerary/${itinerary.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1,
                }}
              />
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  {
                    icons.find((iconItem) => iconItem.name === itinerary.icon)
                      ?.icon
                  }
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h5" gutterBottom>
                    {itinerary.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Start Date:{" "}
                    {itinerary.startDate.toString().substring(0, 10)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End Date: {itinerary.endDate.toString().substring(0, 10)}
                  </Typography>
                  <Typography variant="body2">
                    <PeopleIcon /> {itinerary.travelerCount}
                  </Typography>
                </Grid>
                <Grid item xs={2} sx={{ zIndex: 2 }}>
                  {" "}
                  {/* Ensure the delete button is above the link */}
                  <Button
                    style={{
                      backgroundColor: "#203973",
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          "Are you sure you want to delete this itinerary? This action cannot be undone!",
                        )
                      ) {
                        handleDelete(itinerary.id, e).catch((error) => {
                          console.error("Error deleting itinerary:", error);
                        });
                      }
                    }}
                  >
                    Delete Itinerary
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default HomePage;
