import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");

  const { email, password, role } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      console.log(res.data); // Handle success (e.g., save token, redirect to dashboard)
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      setOpenSnackbar(true); // Show snackbar on error
    }
  };

  const handleForgotPassword = () => {
    setOpenModal(true);
  };

  const handleForgotUsername = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEmailForReset(""); // Clear the email input
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint for sending reset link
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: emailForReset,
      });
      alert("Reset link sent to your email!"); // You can replace this with a snackbar or alert
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setError("Failed to send reset link. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundImage: `url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Event Management Application
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1 }} />,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1 }} />,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={role}
                onChange={onChange}
                label="Role"
              >
                <MenuItem value="user">Login as User</MenuItem>
                <MenuItem value="admin">Login as Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                Sign up as User or Admin
              </Link>
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              <Link
                to="#"
                onClick={handleForgotPassword}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                Forgot Password?
              </Link>
              {" | "}
              <Link
                to="#"
                onClick={handleForgotUsername}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                Forgot Username?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Reset Password / Username
          </Typography>
          <Box component="form" onSubmit={handleResetSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="reset-email"
              label="Email Address"
              name="reset-email"
              autoComplete="email"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Send Reset Link
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Login;
