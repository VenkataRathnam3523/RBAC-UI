import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerItems = (
    <List>
      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)} aria-label="Dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/users" onClick={toggleDrawer(false)} aria-label="Users">
        <ListItemText primary="User" />
      </ListItem>
      <ListItem button component={Link} to="/roles" onClick={toggleDrawer(false)} aria-label="Roles">
        <ListItemText primary="Roles" />
      </ListItem>
      <ListItem button component={Link} to="/permissions" onClick={toggleDrawer(false)} aria-label="Permissions">
        <ListItemText primary="Permission" />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Dashboard
          </Typography>

          {/* Hamburger Menu for Small Screens */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Buttons */}
          <Button color="inherit" component={Link} to="/" sx={{ display: { xs: 'none', sm: 'block' } }} aria-label="Dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/users" sx={{ display: { xs: 'none', sm: 'block' } }} aria-label="Users">
            User
          </Button>
          <Button color="inherit" component={Link} to="/roles" sx={{ display: { xs: 'none', sm: 'block' } }} aria-label="Roles">
            Roles
          </Button>
          <Button color="inherit" component={Link} to="/permissions" sx={{ display: { xs: 'none', sm: 'block' } }} aria-label="Permissions">
            Permission
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerItems}
      </Drawer>
    </>
  );
};

export default Navbar;
