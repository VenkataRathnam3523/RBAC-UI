import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Checkbox, Box, Grid, TextField } from '@mui/material';

const permissionsData = [
  { name: 'Read', description: 'View data or content', roles: ['Admin', 'Manager', 'Editor'], status: 'Enabled' },
  { name: 'Write', description: 'Modify or add new data', roles: ['Admin', 'Manager'], status: 'Disabled' },
  { name: 'Delete', description: 'Remove data', roles: ['Admin', 'Manager'], status: 'Enabled' },
  { name: 'Edit', description: 'Update or change data', roles: ['Admin', 'Manager', 'Editor'], status: 'Enabled' },
  { name: 'Assign Roles', description: 'Ability to assign roles to users', roles: ['Admin'], status: 'Enabled' },
  { name: 'View Logs', description: 'Access system logs', roles: ['Admin', 'Manager'], status: 'Disabled' },
  { name: 'Approve Requests', description: 'Approve or deny user requests', roles: ['Admin', 'Manager'], status: 'Disabled' },
  { name: 'Access Sensitive Data', description: 'View confidential or sensitive data', roles: ['Admin'], status: 'Enabled' },
];

const Permissions = () => {
  const [permissions, setPermissions] = useState(permissionsData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleStatus = (permissionName) => {
    const updatedPermissions = permissions.map(permission => 
      permission.name === permissionName 
        ? { ...permission, status: permission.status === 'Enabled' ? 'Disabled' : 'Enabled' }
        : permission
    );
    setPermissions(updatedPermissions);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter permissions based on search query
  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {/* Search Bar (Navbar-like) */}
      <Box sx={{ padding: 2, backgroundColor: '#f4f4f4', marginBottom: 2 }}>
        <TextField
          label="Search Permissions"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Permissions Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Permission Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Assigned Roles</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPermissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((permission) => (
              <TableRow key={permission.name}>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell>{permission.roles.join(', ')}</TableCell>
                <TableCell>
                  <Checkbox 
                    checked={permission.status === 'Enabled'} 
                    onChange={() => toggleStatus(permission.name)} 
                  />
                </TableCell>
                <TableCell>
                  <Button>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredPermissions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Permissions;
