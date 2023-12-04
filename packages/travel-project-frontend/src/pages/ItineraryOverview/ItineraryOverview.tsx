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
} from "@mui/material";
import { type Day } from "@prisma/client";

const ItineraryOverview: React.FC = () => {
  const [days, setDays] = useState<Day[]>([]);
  const navigate = useNavigate();
  const { itineraryId } = useParams<{ itineraryId: string }>(); // Get itineraryId from route parameters

  useEffect(() => {
    const fetchDays = async (): Promise<void> => {
      try {
        // Check if itineraryId is defined and is a valid string
        if (itineraryId !== null && itineraryId !== undefined) {
          const id = parseInt(itineraryId.substring(1), 10);
          if (!isNaN(id)) {
            const fetchedDays = await getDays(id);
            const formattedDays = fetchedDays.map((day) => ({
              ...day,
              // Convert day.date to a Date object and then to an ISO string
              date: day.date,
            }));
            setDays(formattedDays);
          } else {
            console.error("Invalid itineraryId");
            // Handle invalid itineraryId
          }
        } else {
          console.error("itineraryId is undefined");
          // Handle undefined itineraryId
        }
      } catch (error) {
        console.error("Error fetching days:", error);
      }
    };

    if (itineraryId !== null && itineraryId !== undefined) {
      fetchDays().catch(Error);
    }
  }, [itineraryId]);

  return (
    <Container style={{ marginTop: "20px" }}>
      {/* Added margin to the top */}
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
                navigate(`/day/${day.id}`);
              }}
            >
              <CardContent>
                <Typography variant="h5">Day #{index + 1}</Typography>{" "}
                {/* Displaying day number */}
                <Typography variant="subtitle1">
                  {new Date(day.date).toLocaleDateString()}
                </Typography>
                {/* Additional day details here */}
              </CardContent>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#203973", // Matching the purple theme
                  ":hover": {
                    bgcolor: "#3355A8", // Slightly lighter purple on hover
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
