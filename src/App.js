import React from 'react';
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Roles from "./components/Roles";
import Dashboard from "./components/Dashboard";
import CreateUserForm from "./components/CreateUserForm";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import EditUser from "./components/EditUser";
import CreateRole from './components/CreateRole';
import EditRole from './components/EditRole';
import Permissions from './components/Permissions';



const App = () => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/create-user" element={<CreateUserForm />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/edit-role/:roleId" element={<EditRole />} />
          <Route path="/create-role" element={<CreateRole />}/>
          <Route path="/permissions" element={<Permissions/>}/>
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
