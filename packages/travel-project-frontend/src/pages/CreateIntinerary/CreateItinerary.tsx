/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import styles from "./CreateItinerary.module.css"
import React, { useContext, useState } from "react";
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
import { authContext } from "../../authContext/authContext";
import { createDay } from "../../httpClient/day";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { type Dayjs } from "dayjs";

interface IconItem {
  name: string;
  icon: React.ReactElement;
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
    icon: <EmojiTransportationIcon style={{ height: "5rem", width: "5rem" }} />,
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

function CreateItinerary(): React.ReactElement {
  const { user } = useContext(authContext);

  const [itenTitle, setItenTitle] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState("");
  const [numTravelers, setNumTravelers] = useState(0);
  const [icon, setIcon] = useState("");
  const nav = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleButtonClick = (): void => {
    const addItinerary = async (): Promise<void> => {
      setIsDisabled(true);
      const itinerary = await createItinerary(
        {
          name: itenTitle,
          startDate: startDate!.toDate(),
          endDate: endDate!.toDate(),
          location,
          travelerCount: numTravelers,
          icon,
        },
        user!.id,
      );

      // Create day objects for each day in the itinerary
      const endDay = endDate!.add(1, "day");
      let currentDay = startDate!;
      while (currentDay.isBefore(endDay)) {
        await createDay(
          {
            date: currentDay.toDate(),
            icon,
          },
          itinerary.id,
        );
        currentDay = currentDay.add(1, "day");
      }

      nav("/home");
    };
    void addItinerary();
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
      >
        <Paper
          elevation={6}
          style={{ width: "100%", padding: "2em", backgroundColor: "#daeee7" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <IconSelection
              icons={icons}
              onSelectIcon={(selectedIconName) => {
                setIcon(selectedIconName);
              }}
            />
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={12}>
                <TextField
                  label="Itinerary Title"
                  variant="outlined"
                  value={itenTitle}
                  onChange={(e) => {
                    setItenTitle(e.target.value);
                  }}
                  margin="normal"
                  fullWidth
                  sx={{
                    backgroundColor: "#fff", // Set background color to white
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#3355A8", // Optional: sets border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#203973", // Optional: sets border color when focused
                      },
                    },
                  }}
                />
              </Grid>
              <Grid xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ color: "white", backgroundColor: "white" }}
                    onChange={setStartDate}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ color: "white", backgroundColor: "white" }}
                    onChange={setEndDate}
                  />
                </LocalizationProvider>
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
                  sx={{
                    backgroundColor: "#fff", // Set background color to white
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#3355A8", // Optional: sets border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#203973", // Optional: sets border color when focused
                      },
                    },
                  }}
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
                  sx={{
                    backgroundColor: "#fff", // Set background color to white
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#3355A8", // Optional: sets border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#203973", // Optional: sets border color when focused
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleButtonClick}
              disabled={
                icon === "" ||
                itenTitle === "" ||
                startDate === null ||
                endDate === null ||
                numTravelers === 0 ||
                isDisabled
              }
              sx={{
                m: 2,
                backgroundColor: "#203973",
                ":hover": {
                  bgcolor: "#3355A8",
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
