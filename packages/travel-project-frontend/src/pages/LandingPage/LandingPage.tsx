import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const landing =
  "url('https://afar.brightspotcdn.com/dims4/default/2bf2b30/2147483647/strip/true/crop/1000x637+0+0/resize/1440x917!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2F7e%2F18%2F203e24c54a25880e3e516907e065%2Fshutterstock-1455531734.jpg')";

const theme1 = createTheme({
  typography: {
    fontSize: 60,
  },
});

const theme2 = createTheme({
  typography: {
    fontSize: 20,
  },
});

function LandingPage(): React.ReactElement {
  return (
    <div id="parent">
      {/* Parallax Background */}
      <div
        className="image"
        style={{
          height: "55vh",
          width: "100%",
          backgroundImage: landing,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Adjusted Position for Welcome Card */}
      <Box
        sx={{
          position: "absolute",
          top: "30%", // Adjusted top position
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%", // Adjusted width
        }}
      >
        <ThemeProvider theme={theme1}>
          <Typography align="center" variant="subtitle2" gutterBottom>
            <strong>Welcome to Vacation Tracker!</strong>
          </Typography>
        </ThemeProvider>

        <Paper
          elevation={6}
          style={{ padding: "2em", backgroundColor: "#daeee7" }}
        >
          <ThemeProvider theme={theme2}>
            <Typography align="center" variant="subtitle1" gutterBottom>
              Here you can create an Itinerary for your trips and keep track of
              your events!
            </Typography>
            <Typography align="center" variant="subtitle1" gutterBottom>
              Please Login or Signup below to begin!
            </Typography>
            <Box textAlign="center">
              <Button
                component={RouterLink}
                to="/login"
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: "#203973",
                  ":hover": {
                    bgcolor: "#3355A8",
                  },
                  m: 1,
                }}
              >
                Log in
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                color="secondary"
                variant="contained"
                sx={{
                  backgroundColor: "#203973",
                  ":hover": {
                    bgcolor: "#3355A8",
                  },
                  m: 1,
                }}
              >
                Sign up
              </Button>
            </Box>
          </ThemeProvider>
        </Paper>
      </Box>

      {/* Information Section */}
      <Box sx={{ my: 8, mx: "auto", maxWidth: "lg" }}>
        <Paper elevation={3} sx={{ p: 6, backgroundColor: "#daeee7" }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            About Vacation Tracker
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Vacation Tracker helps you plan and organize your trips with ease.
            Create detailed itineraries, manage events, and enjoy a seamless
            travel planning experience.
          </Typography>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              <Typography variant="body1">
                Easily create and manage itineraries
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Keep track of all your travel events
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Share your travel plans with friends and family
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Access your itineraries on the go
              </Typography>
            </li>
          </ul>
        </Paper>
      </Box>
    </div>
  );
}

export default LandingPage;
