import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

const CreateUserForm = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    role: "",
    email: "",
    status: "Active",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.username || !user.role || !user.email) {
      alert("Name, Username, Role, and Email are required.");
      return;
    }
    if (!validateEmail(user.email)) {
      setError("Please enter a valid email address.");
      return;
    } else {
      setError("");
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { ...user, id: Date.now() };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/users");
  };

  // Define the handleInputChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Create User
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ flexGrow: 1 }}>
        <Box mb={2}>
          <TextField
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            fullWidth
            error={!!error}
            helperText={error || ""}
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth>
            <Select
              name="status"
              value={user.status}
              onChange={handleInputChange}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                Select Status
              </MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default CreateUserForm;
