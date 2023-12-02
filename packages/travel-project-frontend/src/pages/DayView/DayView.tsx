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

// Dummy Data for cards, change to fit DB Schema later
interface Event {
  id: number;
  name: string;
  startTime: number; // Assuming this is a timestamp
  endTime: number; // Assuming this is a timestamp
  cost: number;
  link: string | null;
  dayId: number;
}

// DayCard component
const BookingCard: React.FC<Event> = ({
  id,
  name,
  startTime,
  endTime,
  cost,
  link,
  dayId,
}) => {
  function formatTime(time: number): React.ReactNode {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  }

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
            Start Time: {formatTime(startTime)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            End Time: {formatTime(endTime)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cost: ${cost}
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
                backgroundColor: "#7139a8",
                ":hover": {
                  bgcolor: "#965ad3",
                },
                mt: 2,
              }}
              href={link}
              target="_blank"
              fullWidth
            >
              View Details
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

  useEffect(() => {
    if (dayId !== null && dayId !== undefined) {
      getEvents(parseInt(dayId))
        .then(setEvents)
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [dayId]);

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
        sx={{
          m: 2,
          backgroundColor: "#7139a8",
          ":hover": {
            bgcolor: "#965ad3",
          },
        }}
      >
        Go Home
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
