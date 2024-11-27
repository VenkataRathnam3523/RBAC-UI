import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRoleById, updateRole, mockPermissions } from '../data/mockData'; // Import mock functions
import { TextField, Checkbox, Button, Box, FormControlLabel } from '@mui/material';

const EditRole = () => {
    const { roleId } = useParams(); // Get the role ID from the URL params
    const navigate = useNavigate();
    const [role, setRole] = useState({ name: '', permissions: [] });
    const [name, setName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    // Fetch role data when the component mounts
    useEffect(() => {
        fetchRoleById(Number(roleId))
            .then((fetchedRole) => {
                setRole(fetchedRole);
                setName(fetchedRole.name);
                setSelectedPermissions(fetchedRole.permissions);
            })
            .catch((error) => console.error('Error fetching role:', error));
    }, [roleId]);

    // Handle permission changes (checkbox selection)
    const handlePermissionChange = (event) => {
        const { value, checked } = event.target;
        setSelectedPermissions((prevPermissions) => 
            checked
                ? [...prevPermissions, value]
                : prevPermissions.filter((perm) => perm !== value)
        );
    };

    // Save the updated role (both locally and in mock storage)
    const handleSave = () => {
        const updatedRole = { id: role.id, name, permissions: selectedPermissions };

        // Update role in mock data or local storage (depending on your setup)
        updateRole(role.id, updatedRole)
            .then((updatedRole) => {
                // Update local state with the new role
                setRole(updatedRole);
                // Redirect back to the roles list
                navigate('/roles');
            })
            .catch((error) => console.error('Error updating role:', error));
    };

    return (
        <Box component="form" sx={{ maxWidth: 400, margin: 'auto', marginTop: 4 }}>
            <TextField
                label="Role Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {mockPermissions.map((perm) => (
                <FormControlLabel
                    key={perm}
                    control={
                        <Checkbox
                            value={perm}
                            checked={selectedPermissions.includes(perm)}
                            onChange={handlePermissionChange}
                        />
                    }
                    label={perm.charAt(0).toUpperCase() + perm.slice(1)}
                />
            ))}

            <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
            </Button>
        </Box>
    );
};

export default EditRole;
