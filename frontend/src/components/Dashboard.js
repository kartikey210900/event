import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
} from "@mui/material";
import { Add, Logout, Edit, Delete, AccountCircle } from "@mui/icons-material";
import "./Dashboard.css";

const Dashboard = () => {
  const API_BASE_URL =
    process.env.REACT_APP_API_URL || "https://event-n0mx.onrender.com";

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    category: "",
  });

  const [editingEventId, setEditingEventId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [
    "Conference",
    "Workshop",
    "Meetup",
    "Seminar",
    "Hackathon",
    "Networking",
    "Webinar",
    "Tech Talk",
  ];

  // ✅ Fetch events from backend on component mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddOrUpdateEvent = async () => {
    if (
      !newEvent.name ||
      !newEvent.description ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.category
    )
      return;

    try {
      if (editingEventId) {
        // ✅ Update event in backend
        const response = await axios.put(
          `${API_BASE_URL}/api/events/${editingEventId}`,
          newEvent
        );
        setEvents(
          events.map((event) =>
            event._id === editingEventId ? response.data : event
          )
        );
        setEditingEventId(null);
      } else {
        // ✅ Add new event to backend
        const response = await axios.post(
          `${API_BASE_URL}/api/events`,
          newEvent
        );
        setEvents([...events, response.data]);
      }
    } catch (error) {
      console.error("Error adding/updating event:", error);
    }

    // Reset form
    setNewEvent({
      name: "",
      description: "",
      date: "",
      time: "",
      category: "",
    });
    setShowCreateForm(false);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEditEvent = (event) => {
    setNewEvent(event);
    setEditingEventId(event._id);
    setShowCreateForm(true);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory ? event.category === filterCategory : true)
  );

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Event Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Paper className="paper-background">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setEditingEventId(null);
            setNewEvent({
              name: "",
              description: "",
              date: "",
              time: "",
              category: "",
            });
          }}
          sx={{ marginBottom: 2 }}
        >
          {showCreateForm ? "Cancel" : "Create Event"}
        </Button>

        {showCreateForm && (
          <Paper className="form-container">
            <TextField
              fullWidth
              label="Event Name"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Time"
              type="time"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newEvent.category}
                onChange={handleInputChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrUpdateEvent}
            >
              {editingEventId ? "Save Changes" : "Add Event"}
            </Button>
          </Paper>
        )}

        <TextField
          fullWidth
          label="Search Events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card className="event-card">
                <CardContent>
                  <Typography variant="h5">{event.name}</Typography>
                  <Typography>
                    {event.date} | {event.category}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    <Delete />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
