import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { signupUser } from "../../httpClient/user";

function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignupButtonClick = async (): Promise<void> => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    await signupUser({ username: email, password });
  };

  const signup = (): void => {
    handleSignupButtonClick().catch(console.error);
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
        />
        <Button
          onClick={signup}
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: "#7139a8",
            ":hover": { bgcolor: "#965ad3" },
          }}
          fullWidth
        >
          Sign Up
        </Button>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" color="secondary">
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Signup;