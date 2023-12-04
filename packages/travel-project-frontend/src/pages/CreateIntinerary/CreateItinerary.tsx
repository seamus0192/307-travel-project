// import styles from "./CreateItinerary.module.css"
import React, { useState } from "react";
import { Container, TextField, Button, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import IconSelection from "../../components/IconSelection/IconSelection";
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
import { createItinerary } from "../../httpClient/itinerary";
import { useNavigate } from "react-router-dom";

interface IconItem {
  name: string;
  icon: React.ReactElement;
}

function CreateItinerary(): React.ReactElement {
  const [itenTitle, setItenTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [location, setLocation] = useState("");
  const [numTravelers, setNumTravelers] = useState(0);
  const [icon, setIcon] = useState("");
  const nav = useNavigate();

  const handleCreateButtonClick = (): void => {
    console.log({
      name: itenTitle,
      icon,
      endDate,
      travelerCount: numTravelers,
      location,
      startDate,
    });

    const create = async (): Promise<void> => {
      try {
        await createItinerary(
          {
            name: itenTitle,
            icon,
            endDate,
            travelerCount: numTravelers,
            location,
            startDate,
          },
          localStorage.userId as number,
        );
      } catch (error) {
        console.error(error);
      }
    };

    create().catch(console.error);
    nav("/home");
  };

  function formatDate(date: string | number | Date): string {
    if (date === "") return "";

    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
      >
        <Paper elevation={6} style={{ width: "100%", padding: "2em" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid container spacing={2}>
              <IconSelection
                icons={icons}
                onSelectIcon={(selectedIconName) => {
                  setIcon(selectedIconName);
                }}
              />
              <Grid xs={8}>
                <TextField
                  label="Itinerary Title"
                  variant="outlined"
                  value={itenTitle}
                  onChange={(e) => {
                    setItenTitle(e.target.value);
                  }}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid xs={3}>
                <TextField
                  label="Start Date (DD/MM/YYYY)"
                  type="date"
                  variant="outlined"
                  value={formatDate(startDate)} // Format the date for the input
                  onChange={(e) => {
                    setStartDate(new Date(e.target.value)); // e.target.value is in YYYY-MM-DD format
                  }}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={3}>
                <TextField
                  label="End Date (DD/MM/YYYY)"
                  type="date"
                  variant="outlined"
                  value={formatDate(endDate)} // Format the date for the input
                  onChange={(e) => {
                    setEndDate(new Date(e.target.value)); // e.target.value is in YYYY-MM-DD format
                  }}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="# of Travelers"
                  type="number"
                  variant="outlined"
                  value={numTravelers}
                  onChange={(e) => {
                    setNumTravelers(parseFloat(e.target.value));
                  }}
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
                backgroundColor: "#7139a8",
                ":hover": {
                  bgcolor: "#965ad3",
                },
              }}
            >
              Create Itinerary!
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default CreateItinerary;
