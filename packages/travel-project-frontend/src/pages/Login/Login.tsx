// import styles from './Login.module.css'
import React, { useContext, useState } from "react";
import { TextField, Button, Paper, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { loginUser } from "../../httpClient/user";
import { authContext } from "../../authContext/authContext";

function Login(): JSX.Element {
  const { login } = useContext(authContext);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = (): void => {
    loginUser({ username: email, password })
      .then((response) => {
        login(response);
      })
      .catch((error) => {
        console.error("Login failed", error);
        setError("Login failed");
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5" }} // Assuming a light grey background
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          gap: 2,
          minWidth: "300px",
          maxWidth: "400px",
          backgroundColor: "#daeee7",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          fullWidth
          required
          margin="normal"
          type="email"
          sx={{
            backgroundColor: "#fff", // Set background color to white
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#3355A8", // Optional: sets border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#203973", // Optional: sets border color when focused
              },
            },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          fullWidth
          required
          margin="normal"
          type="password"
          sx={{
            backgroundColor: "#fff", // Set background color to white
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#3355A8", // Optional: sets border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#203973", // Optional: sets border color when focused
              },
            },
          }}
        />
        {error != null && <div className="error-message">{error}</div>}
        <Button
          onClick={handleLoginButtonClick}
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: "#203973",
            ":hover": { bgcolor: "#3355A8" },
          }}
          fullWidth
        >
          Login
        </Button>
        <Typography variant="body2">
          Don&apos;t have an account?{" "}
          <Link component={RouterLink} to="/signup" color="#203973">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
