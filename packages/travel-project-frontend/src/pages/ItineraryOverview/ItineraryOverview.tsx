// ItineraryOverview.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDays } from "../../httpClient/day"; // Import the getDays function
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { type Day } from "@prisma/client";
import { getEvents } from "../../httpClient/event";

interface DayWithEventSummary extends Day {
  eventSummary: string[];
}

const ItineraryOverview: React.FC = () => {
  const [days, setDays] = useState<DayWithEventSummary[]>([]);
  const navigate = useNavigate();
  const { itineraryId } = useParams<{ itineraryId: string }>(); // Get itineraryId from route parameters

  useEffect(() => {
    const fetchEventSummary = async (dayId: number): Promise<string[]> => {
      try {
        const events = await getEvents(dayId);
        return events
          .slice(0, 4)
          .map((e) => `${e.name} (${e.startTime} - ${e.endTime})`);
      } catch (error) {
        console.error("Error fetching events for day:", dayId, error);
        return [];
      }
    };

    const fetchDays = async (itineraryId: number): Promise<void> => {
      try {
        const fetchedDays = await getDays(itineraryId);
        const daysWithSummary = await Promise.all(
          fetchedDays.map(async (day) => {
            const eventSummary = await fetchEventSummary(day.id);
            return { ...day, eventSummary };
          }),
        );
        setDays(daysWithSummary);
      } catch (error) {
        console.error("Error fetching days:", error);
      }
    };

    if (itineraryId !== null && itineraryId !== undefined) {
      fetchDays(parseInt(itineraryId)).catch(Error);
    }
  }, [itineraryId]);

  return (
    <Container style={{ marginTop: "20px" }}>
      {/* Added margin to the top */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#203973", ":hover": { bgcolor: "#3355A8" } }}
          onClick={() => {
            navigate("/home");
          }}
        >
          Go Back
        </Button>
      </Box>
      <Grid container spacing={2}>
        {days.map((day, index) => (
          <Grid item key={day.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                minWidth: 275,
                minHeight: 275,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#daeee7", // Light greyish background
                "&:hover": {
                  boxShadow: 8,
                },
              }}
              onClick={() => {
                navigate(`/itinerary/${itineraryId}/day/${day.id}`);
              }}
            >
              <CardContent>
                <Typography variant="h5">Day #{index + 1}</Typography>
                <Typography variant="subtitle1">
                  {new Date(day.date).toLocaleDateString()}
                </Typography>
                {day.eventSummary?.map((summary, idx) => (
                  <Typography key={idx} variant="body2" color="text.secondary">
                    {summary}
                  </Typography>
                ))}
              </CardContent>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#203973",
                  ":hover": {
                    bgcolor: "#3355A8",
                  },
                  m: 2,
                }}
              >
                View Events
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItineraryOverview;
