import React, { useState } from "react";
import { Container, TextField, Button, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { createEvent } from "../../httpClient/event";
import { useLocation, useNavigate } from "react-router-dom";

function CreateEvent(): React.ReactElement {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [cost, setCost] = useState(0);
  const [eventLocation, setEventLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  function handleCreateButtonClick(): void {
    (async () => {
      setIsValid(false);
      try {
        const eventData = {
          name: eventTitle,
          startTime,
          endTime,
          cost,
          link: ticketLink,
          description,
        };

        const dayId = parseInt(location.state?.dayId);
        const itenId = parseInt(location.state?.itineraryId);
        await createEvent(eventData, dayId);
        navigate(`/itinerary/${itenId}/day/${dayId}/`);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    })().catch(Error);
  }

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
            <Grid container spacing={2}>
              <Grid xs={6}>
                <TextField
                  label="Event Title"
                  variant="outlined"
                  value={eventTitle}
                  onChange={(e) => {
                    setEventTitle(e.target.value);
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
              <Grid xs={6}>
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
              <Grid xs={6}>
                <TextField
                  label="Estimated Cost"
                  variant="outlined"
                  inputMode="numeric"
                  value={cost}
                  onChange={(e) => {
                    setCost(parseInt(e.target.value));
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
                  label="More Info/ Notes" // Changed label to reflect paragraph input
                  variant="outlined"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  margin="normal"
                  fullWidth
                  multiline
                  rows={3}
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
              {/* Create Event Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCreateButtonClick}
                disabled={
                  eventTitle === "" ||
                  startTime === "" ||
                  endTime === "" ||
                  !isValid
                }
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
