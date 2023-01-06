import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import "./Auth-design.css";
import { login } from "./service/auth";

export default function(props) {
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const resp = await login({ username, password });
      localStorage.setItem("token", resp.data.data.token);
      window.location.reload();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleInvalid = () => {
    setError("Username and password are required");
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <div className="Auth-form-container">
      <Paper className="Auth-form" elevation={10}>
        <form onSubmit={handleSubmit} onInvalid={handleInvalid}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <Stack spacing={2}>
            <TextField
              id="username"
              label="Username"
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              id="password"
              label="Password"
              placeholder="Enter password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />
            {error && (
              <Box>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
