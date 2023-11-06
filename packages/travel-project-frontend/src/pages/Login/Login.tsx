import styles from './Login.module.css'
import React from "react";

import { Container, Typography, Box } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

{/*    

ALL OF THIS CAN BE DELETED,
Just thought it would be funny to have for now rather than an empty page

*/}


function Login() {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <ConstructionIcon
            sx={{
              fontSize: 80,
              color: "#7139a8",
            }}
          />
          <Typography variant="h4" gutterBottom>
            Under Construction
          </Typography>
          <Typography variant="subtitle1">
            We're working hard to finish the development of this page. Check
            back soon!
          </Typography>
        </Box>
      </Container>
    );
}

export default Login;