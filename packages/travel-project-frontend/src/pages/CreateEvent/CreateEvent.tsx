import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// import { getItineraries } from "../../httpClient/itinerary";
import { createEvent } from "../../httpClient/event";
import { useLocation, useNavigate } from "react-router-dom";

function CreateEvent(): React.ReactElement {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [cost, setCost] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  // const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const fetchItineraries = async (): Promise<void> => {
  //     try {
  //       const userId = localStorage.getItem("userId");
  //       if (userId !== null) {
  //         const fetchedItineraries = await getItineraries(parseInt(userId));
  //         setItineraries(fetchedItineraries);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching itineraries:", error);
  //     }
  //   };

  //   fetchItineraries().catch(Error);
  // }, []);

  const handleChange = (event: SelectChangeEvent): void => {
    setEventType(event.target.value);
  };

  function handleCreateButtonClick(): void {
    (async () => {
      try {
        const eventData = {
          name: eventType,
          startTime: parseInt(startTime),
          endTime: parseInt(endTime),
          cost: parseFloat(cost),
          link: ticketLink,
          location: eventLocation,
        };

        const dayId = parseInt(location.state?.dayId);
        await createEvent(eventData, dayId);
        navigate(`/day/${dayId}`);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    })().catch(Error);
  }

  return (
    <Container maxWidth="sm">
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
            <Grid container spacing={2}>
              <Grid xs={3}>
                <TextField
                  label="Start Time"
                  type="time"
                  variant="outlined"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300,
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#3355A8",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#203973",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid xs={3}>
                <TextField
                  label="End Time"
                  type="time"
                  variant="outlined"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300,
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#3355A8",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#203973",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <FormControl
                  fullWidth
                  required
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
                >
                  <InputLabel id="demo-simple-select-label">
                    EventType
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={eventType}
                    label="Event Type*"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Conference"}>Conference</MenuItem>
                    <MenuItem value={"Drive"}>Drive</MenuItem>
                    <MenuItem value={"Concert"}>Concert</MenuItem>
                    <MenuItem value={"Hotel"}>Hotel</MenuItem>
                    <MenuItem value={"Flight"}>Flight</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <TextField
                  label="Reservation/Ticket Link"
                  variant="outlined"
                  value={ticketLink}
                  onChange={(e) => {
                    setTicketLink(e.target.value);
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
                  label="Cost"
                  variant="outlined"
                  value={cost}
                  onChange={(e) => {
                    setCost(e.target.value);
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
                  label="Location"
                  variant="outlined"
                  value={eventLocation}
                  onChange={(e) => {
                    setEventLocation(e.target.value);
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
              {/* Create Event Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCreateButtonClick}
                sx={{
                  m: 2,
                  backgroundColor: "#203973",
                  ":hover": {
                    bgcolor: "#3355A8",
                  },
                }}
              >
                Create Event
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default CreateEvent;
