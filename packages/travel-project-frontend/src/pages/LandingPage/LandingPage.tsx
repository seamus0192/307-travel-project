import React from "react";
import { Paper, Typography, Link } from "@mui/material";
import Box from "@mui/system/Box";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
// import LandingPageBackground from "../../assets/background.jpg";
const landing =
  "url('https://afar.brightspotcdn.com/dims4/default/2bf2b30/2147483647/strip/true/crop/1000x637+0+0/resize/1440x917!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2F7e%2F18%2F203e24c54a25880e3e516907e065%2Fshutterstock-1455531734.jpg')";

function LandingPage(): React.ReactElement {
  return (
    <div id="parent">
      <div
        className="image"
        style={{
          height: "850px",
          width: "900x",
          backgroundImage: landing,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "33%",
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
      >
        <Paper elevation={6} style={{ width: "100%", padding: "2em" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="subtitle1" gutterBottom>
              Welcome to Vacation Tracker
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Here you can create an Itinerary for your trips and keep track of
              your events!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Please Login or Signup below to begin!
            </Typography>
            <Grid container spacing={4}>
              <Grid xs="auto">
                <Link component={RouterLink} to="/login" color="secondary">
                  Log in
                </Link>
              </Grid>
              <Grid xs="auto">
                <Link component={RouterLink} to="/signup" color="secondary">
                  Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default LandingPage;
