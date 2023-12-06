import React, { useContext, useState } from "react";
import { TextField, Button, Paper, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { signupUser } from "../../httpClient/user";
import { authContext } from "../../authContext/authContext";

function Signup(): JSX.Element {
  const { login } = useContext(authContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignupButtonClick = (): void => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    signupUser({ username: email, password })
      .then((response) => {
        login(response);
      })
      .catch((error) => {
        console.error("Signup failed", error);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5" }}
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
          Sign Up
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
        <TextField
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
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
        <Button
          onClick={handleSignupButtonClick}
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: "#203973",
            ":hover": { bgcolor: "#3355A8" },
          }}
          fullWidth
        >
          Sign Up
        </Button>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" color="#203973">
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Signup;
