import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./Footer.module.css";

function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <Box
        sx={{
          backgroundColor: "#daeee7",
          color: "black",
          padding: "20px",
          textAlign: "center",
          minHeight: "60px",
        }}
      >
        <Typography variant="subtitle1">© 2023 Vacation Tracker</Typography>
        <Typography variant="subtitle2">
          Your go-to solution for managing travel itineraries
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;
