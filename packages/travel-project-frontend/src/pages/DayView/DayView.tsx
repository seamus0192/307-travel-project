// DayView.tsx
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Dummy Data for cards, change to fit DB Schema later
interface Booking {
  id: number;
  date: string; 
  startTime: string; 
  endTime: string; 
  location: string;
  reservationLink: string;
  bookingType: "hotel" | "concert" | "restaurant" | "flight" | "other";
}

const dummyBookings: Booking[] = [
  {
    id: 1,
    date: '2023-11-10',
    startTime: '18:00',
    endTime: '20:00',
    location: 'Hotel Sunshine, 123 Beach Avenue, Miami',
    reservationLink: 'https://www.hotelbooking.com/reservation/123456',
    bookingType: 'hotel',
  },
  {
    id: 2,
    date: '2023-12-05',
    startTime: '20:00',
    endTime: '23:00',
    location: 'Grand Concert Hall, 456 Music Street, New York',
    reservationLink: 'https://www.concerttickets.com/purchase/789123',
    bookingType: 'concert',
  },
  {
    id: 3,
    date: '2023-11-15',
    startTime: '19:30',
    endTime: '21:00',
    location: 'La Bella Restaurant, 789 Gourmet Blvd, San Francisco',
    reservationLink: 'https://www.opentable.com/booking/555777',
    bookingType: 'restaurant',
  },
  {
    id: 4,
    date: '2023-11-20',
    startTime: '07:00',
    endTime: '09:00',
    location: 'International Airport, 321 Skyway Rd, Los Angeles',
    reservationLink: 'https://www.airlinebookings.com/itinerary/998877',
    bookingType: 'flight',
  },
  {
    id: 5,
    date: '2023-12-25',
    startTime: '12:00',
    endTime: '14:00',
    location: '123 Event Plaza, Central City',
    reservationLink: 'https://www.events.com/details/554433',
    bookingType: 'other', 
  },
];

// DayCard component
const BookingCard: React.FC<Booking> = ({
  id,
  date,
  startTime,
  endTime,
  location,
  reservationLink,
  bookingType,
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
          "&:hover": {
            boxShadow: 8,
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} Booking
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Date: {date}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Time: {startTime} - {endTime}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location: {location}
          </Typography>
        </CardContent>
        <Box
          sx={{ flexGrow: 0, p: 2, pt: 0,display: "flex", justifyContent: "center", alignItems: "center" }}
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
            href={reservationLink}
            target="_blank"
            fullWidth
          >
            View Reservation
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

const DayView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
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
        {dummyBookings.map((item: Booking) => (
          <BookingCard key={item.id} {...item} />
        ))}
      </Grid>
    </Container>
  );
};

export default DayView;
