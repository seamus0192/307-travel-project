// import styles from "./CreateItinerary.module.css"
import React, { useEffect, useState } from "react";
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
import { type Day, type Prisma } from "@prisma/client";
import axios from "axios";

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
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkValidity =
      itenTitle !== "" &&
      startDate !== new Date() &&
      endDate !== new Date() &&
      location !== "" &&
      icon !== "" &&
      numTravelers !== 0;
    setIsValid(checkValidity);
  }, [itenTitle, startDate, endDate, location, icon, numTravelers]);

  const handleCreateButtonClick = (): void => {
    (async () => {
      try {
        const itinerary = await createItinerary(
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

        // Generate the range of dates for the itinerary
        const dateRange = generateDateRange(startDate, endDate);

        // Create a day for each date in the range
        for (const date of dateRange) {
          await createDay({ date, icon: "some-default-icon" }, itinerary.id);
        }

        nav("/home");
      } catch (error) {
        console.error(error);
      }
    })().catch((error) => {
      // Handle any additional errors that might occur
      console.error("An unexpected error occurred:", error);
    });
  };

  function formatDate(date: string | number | Date): string {
    if (date === "") return "";

    console.log(date);
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const generateDateRange = (startDat: Date, endDate: Date): Date[] => {
    const dates = [];
    const currentDate = new Date(startDate.getTime());

    while (true) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate > endDate) {
        break;
      }
    }
    console.log(dates);
    return dates;
  };

  const createDay = async (
    day: Omit<Prisma.DayCreateInput, "itinerary">,
    itineraryId: number,
  ): Promise<Day> => {
    const formattedDate =
      day.date instanceof Date ? day.date.toISOString() : day.date;

    const { data } = await axios.post<Day>(
      `${process.env.REACT_APP_API_URL}/day/${itineraryId}`,
      {
        date: formattedDate,
        icon: day.icon,
      },
    );

    return data;
  };

  const handleDateChange = (
    dateString: string,
    setDate: React.Dispatch<React.SetStateAction<Date>>,
  ): void => {
    const localDate = new Date(dateString);
    localDate.setMinutes(
      localDate.getMinutes() + localDate.getTimezoneOffset(),
    );
    setDate(localDate);
  };

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
            <Grid container spacing={2}>
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
                <TextField
                  label="Start Date (DD/MM/YYYY)"
                  type="date"
                  variant="outlined"
                  value={formatDate(startDate)} // Format the date for the input
                  onChange={(e) => {
                    handleDateChange(e.target.value, setStartDate);
                  }}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                <TextField
                  label="End Date (DD/MM/YYYY)"
                  type="date"
                  variant="outlined"
                  value={formatDate(endDate)} // Format the date for the input
                  onChange={(e) => {
                    handleDateChange(e.target.value, setEndDate);
                  }}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
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
              onClick={handleCreateButtonClick}
              disabled={!isValid}
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
