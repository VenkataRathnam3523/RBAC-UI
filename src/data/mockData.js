// Mock data for roles
export const mockRoles = [
    { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
    { id: 2, name: "User", permissions: ["read"] },
];

// Local copy of roles for simulation
let roles = [...mockRoles];
let nextRoleId = roles.length + 1; // Simple counter for unique IDs

// Fetch all roles
export const fetchRoles = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(roles), 500); // Simulate network delay
    });
};

// Fetch a single role by ID
export const fetchRoleById = async (id) => {
    return new Promise((resolve, reject) => {
        const role = roles.find((r) => r.id === id);
        role ? resolve(role) : reject(new Error("Role not found"));
    });
};

// Add a new role
export const addRole = async (newRole) => {
    return new Promise((resolve, reject) => {
        if (!newRole.name || !Array.isArray(newRole.permissions)) {
            reject(new Error("Invalid role data"));
            return;
        }

        setTimeout(() => {
            const role = { id: nextRoleId++, ...newRole };
            roles.push(role);
            resolve(role);
        }, 500); // Simulate network delay
    });
};

// Update an existing role
export const updateRole = async (id, updatedRole) => {
    return new Promise((resolve, reject) => {
        const index = roles.findIndex((r) => r.id === id);
        if (index !== -1) {
            roles[index] = { ...roles[index], ...updatedRole };
            resolve(roles[index]);
        } else {
            reject(new Error("Role not found"));
        }
    });
};

// Delete a role
export const deleteRole = async (id) => {
    return new Promise((resolve, reject) => {
        const roleExists = roles.find((role) => role.id === id);
        if (roleExists) {
            setTimeout(() => {
                roles = roles.filter((role) => role.id !== id);
                resolve(roles);
            }, 500); // Simulate network delay
        } else {
            reject(new Error("Role not found"));
        }
    });
};

// Exporting other mock data (Permissions)
export const mockPermissions = ["read", "write", "delete", "edit", "execute"];

// Helper function to get mock data based on type (roles or permissions)
export const getMockData = (type) => {
    switch (type) {
        case "roles":
            return roles;
        case "permissions":
            return mockPermissions;
        default:
            return [];
    }
};
