import React, { useState } from 'react';
import { TextField, Button, Container, Typography, FormControlLabel, Checkbox, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // To navigate back after creating a role
import { addRole } from '../data/mockData'; // Assuming this is where the roles are being added

const CreateRole = () => {
    const [newRole, setNewRole] = useState({ name: '', permissions: [] });
    const navigate = useNavigate();

    // Handle creating a new role
    const handleCreateRole = () => {
        if (!newRole.name || newRole.permissions.length === 0) {
            alert('Role name and at least one permission are required.');
            return;
        }

        // Add the new role with the permissions
        addRole({ name: newRole.name, permissions: newRole.permissions })
            .then(() => {
                // After creating the role, navigate back to the roles list page
                navigate('/');
            })
            .catch((error) => console.error('Error creating role:', error));
    };

    // Handle checkbox change
    const handlePermissionChange = (event) => {
        const { value, checked } = event.target;
        setNewRole((prevRole) => {
            const newPermissions = checked
                ? [...prevRole.permissions, value] // Add permission
                : prevRole.permissions.filter((perm) => perm !== value); // Remove permission
            return { ...prevRole, permissions: newPermissions };
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Create Role</Typography>

            {/* Role Name Input */}
            <TextField
                label="Role Name"
                variant="outlined"
                fullWidth
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                margin="normal"
            />

            {/* Permissions Checkboxes */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>Permissions</Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            value="read"
                            checked={newRole.permissions.includes('read')}
                            onChange={handlePermissionChange}
                        />
                    }
                    label="Read"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            value="write"
                            checked={newRole.permissions.includes('write')}
                            onChange={handlePermissionChange}
                        />
                    }
                    label="Write"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            value="delete"
                            checked={newRole.permissions.includes('delete')}
                            onChange={handlePermissionChange}
                        />
                    }
                    label="Delete"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            value="edit"
                            checked={newRole.permissions.includes('edit')}
                            onChange={handlePermissionChange}
                        />
                    }
                    label="Edit"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            value="execute"
                            checked={newRole.permissions.includes('execute')}
                            onChange={handlePermissionChange}
                        />
                    }
                    label="Execute"
                />
            </Box>

            {/* Create Role Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateRole}
                fullWidth
                sx={{ mt: 2 }}
            >
                Create Role
            </Button>
        </Container>
    );
};

export default CreateRole;
