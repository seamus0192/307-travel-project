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
import { getEvents, deleteEvent } from "../../httpClient/event";
import { useEffect, useState } from "react";
import { type Event } from "@prisma/client";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";

// DayCard component
const BookingCard: React.FC<
  Event & { handleCheck: (id: number) => void; checked: boolean }
> = ({
  id,
  name,
  startTime,
  endTime,
  cost,
  link,
  description,
  handleCheck,
  checked,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const truncatedDescription =
    description !== null && description.length > 50
      ? `${description.substring(0, 50)}...`
      : description;

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
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Checkbox
            checked={checked}
            onChange={() => {
              handleCheck(id);
            }}
            color="primary"
            sx={{ padding: 0.1 }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, marginRight: 1 }}
          >
            {name}
          </Typography>
        </Box>
        <CardContent>
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
            Notes: {truncatedDescription}
          </Typography>
          {description !== null && description.length > 50 && (
            <Button onClick={handleOpen} size="small">
              Read more
            </Button>
          )}
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Event Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{description}</Typography>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

const DayView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
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

  const handleCheck = (id: number): void => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = async (): Promise<void> => {
    try {
      // Check if dayId is defined
      if (dayId === undefined) {
        throw new Error("Day ID is undefined.");
      }

      // Show confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to delete the selected events?",
      );
      if (!isConfirmed) {
        return; // Exit the function if the user cancels the operation
      }

      // Delete selected events
      for (const id of selectedEvents) {
        await deleteEvent(id);
      }

      // Fetch updated events after deletion
      const updatedEvents = await getEvents(parseInt(dayId));
      setEvents(updatedEvents);
      setSelectedEvents([]);
    } catch (error) {
      console.error("Error:", error);
    }
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
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          handleDeleteSelected().catch((error: Error) => {
            console.error("Error in deleting selected events:", error);
          });
        }}
        disabled={selectedEvents.length === 0}
        sx={{
          backgroundColor: "#203973",
          ":hover": {
            bgcolor: "#3355A8",
          },
          mx: 1,
        }}
      >
        Delete Selected Events
      </Button>
      <Grid container spacing={2}>
        {events.map((event) => (
          <BookingCard
            key={event.id}
            {...event}
            handleCheck={handleCheck}
            checked={selectedEvents.includes(event.id)}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default DayView;
