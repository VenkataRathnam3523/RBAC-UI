import { useEffect, useState } from 'react';
import { fetchRoles, deleteRole } from '../data/mockData'; // Assuming this provides data
import {
    TextField,
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Checkbox,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery } from '@mui/material';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        fetchRoles()
            .then(setRoles)
            .catch((error) => console.error('Error fetching roles:', error));
    }, []);

    const handleDeleteRole = (id) => {
        deleteRole(id)
            .then((updatedRoles) => setRoles(updatedRoles))
            .catch((error) => console.error('Error deleting role:', error));
    };

    const filteredRoles = roles.filter((role) =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const checkPermission = (permissions, permissionType) => {
        return permissions.includes(permissionType);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom align="center">
                Role Management
            </Typography>

            <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                <Box flex={1} mr={2}>
                    <TextField
                        label="Search Roles"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Box>

                <Box flex={1}>
                    <Link to="/create-role" style={{ textDecoration: 'none', width: '100%' }}>
                        <Button variant="contained" color="primary" fullWidth={isMobile}>
                            Create Role
                        </Button>
                    </Link>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Role</strong></TableCell>
                            <TableCell><strong>Permissions</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRoles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>
                                    <Box display="flex" justifyContent="space-between" width="100%">
                                        {['read', 'write', 'delete', 'edit', 'execute'].map((perm) => (
                                            <Box key={perm}>
                                                <Checkbox
                                                    checked={checkPermission(role.permissions, perm)}
                                                    disabled
                                                />
                                                {perm.charAt(0).toUpperCase() + perm.slice(1)}
                                            </Box>
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Link to={`/edit-role/${role.id}`} style={{ textDecoration: 'none' }}>
                                        <IconButton color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteRole(role.id)}
                                        sx={{ ml: 2 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Roles;
