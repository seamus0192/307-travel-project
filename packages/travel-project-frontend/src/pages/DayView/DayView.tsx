// DayView.tsx
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { getEvents } from "../../httpClient/event";
import { useEffect, useState } from "react";
import { type Event } from "@prisma/client";

// DayCard component
const BookingCard: React.FC<Event> = ({
  name,
  startTime,
  endTime,
  cost,
  link,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        variant="outlined"
        sx={{
          minWidth: 275,
          minHeight: 275,
          flex: "1 0 auto",
          m: 2,
          transition: "0.3s",
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#daeee7",
          "&:hover": {
            boxShadow: 8,
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start Time: {startTime}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            End Time: {endTime}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cost: ${cost}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location: ${cost}
          </Typography>
        </CardContent>
        {link !== null && link !== "" && (
          <Box
            sx={{
              flexGrow: 0,
              p: 2,
              pt: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#203973",
                ":hover": {
                  bgcolor: "#3355A8",
                },
                mt: 2,
              }}
              href={link}
              target="_blank"
              fullWidth
            >
              Reservation Link
            </Button>
          </Box>
        )}
      </Card>
    </Grid>
  );
};

const DayView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const { dayId } = useParams<{ dayId: string }>(); // Get dayId from route parameters
  const { itineraryId } = useParams<{ itineraryId: string }>();

  useEffect(() => {
    if (dayId !== null && dayId !== undefined) {
      getEvents(parseInt(dayId))
        .then(setEvents)
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [dayId]);

  const handleCreateBtn = (): void => {
    navigate(`/itinerary/${itineraryId}/day/${dayId}/create-event`, {
      state: { dayId, itineraryId },
    });
  };

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/itinerary/${itineraryId}`);
        }}
        sx={{
          m: 2,
          backgroundColor: "#203973",
          ":hover": {
            bgcolor: "#3355A8",
          },
        }}
      >
        Go Back
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#203973",
          ":hover": {
            bgcolor: "#3355A8",
          },
          mx: 1,
        }}
        onClick={() => {
          handleCreateBtn();
        }}
      >
        Create Event
      </Button>
      <Grid container spacing={2}>
        {events.map((event: Event) => (
          <BookingCard key={event.id} {...event} />
        ))}
      </Grid>
    </Container>
  );
};

export default DayView;
