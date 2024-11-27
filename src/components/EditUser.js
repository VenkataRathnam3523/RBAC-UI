import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material';

const EditUser = () => {
    const { id } = useParams(); // Get the user ID from the route
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', username: '', role: '', email: '', status: '' });

    // Fetch the user data to edit
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userToEdit = users.find((user) => user.id === Number(id));
        if (userToEdit) {
            setUser(userToEdit);
        }
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Save changes to the localStorage
    const handleSaveChanges = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        navigate('/users'); // Redirect back to the Users page
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Edit User
            </Typography>
            <Box
                component="form"
                onSubmit={handleSaveChanges}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextField
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Role"
                    name="role"
                    value={user.role}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
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
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Save Changes
                </Button>
            </Box>
        </Container>
    );
};

export default EditUser;
