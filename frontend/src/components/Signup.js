import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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

const Signup = () => {
  const API_BASE_URL =
    process.env.REACT_APP_API_URL || "https://event-n0mx.onrender.com";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { username, email, password, role } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData
      );
      console.log(res.data); // Handle success (e.g., redirect to login)
      setSuccess(true);
      setOpenModal(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect to login after 2 seconds
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      setOpenSnackbar(true); // Show snackbar on error
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSuccess(false);
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={onChange}
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
                <MenuItem value="user">Sign up as User</MenuItem>
                <MenuItem value="admin">Sign up as Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                Login here
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
            bgcolor: "white", // Set background color to white
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {success ? "Registration Successful!" : "User Already Exists"}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {success
              ? "You have registered successfully. Redirecting to login..."
              : "The username or email you entered already exists. Please try again."}
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Signup;
