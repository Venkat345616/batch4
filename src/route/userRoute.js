const express = require('express');
const router = express.Router();
const resetUsers = () => { users = []; }

// In-memory user data store (Replace this with a real database in production)
let users = [];
const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        data,
    });
};
// Create user (C in CRUD)
router.post('/', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return sendResponse(res, 400, "Name, email, and age are required")
    }

    const user = {
        id: users.length + 1, // Simple ID generation (incremental)
        name,
        email,
        age
    };

    users.push(user);
    return sendResponse(res, 201, 'User created successfully', user);
});

// Get all users (R in CRUD)
router.get('/', (req, res) => {
    return sendResponse(res, 200, 'Users retrieved successfully', users);
});

// Get user by ID (R in CRUD)
router.get('/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
        return sendResponse(res, 404, 'User not found');
    }

    return sendResponse(res, 200, 'User retrieved successfully', user);



});

// Update user (U in CRUD)
router.put('/:id', (req, res) => {
    const { name, email, age } = req.body;
    const user = users.find((u) => u.id === parseInt(req.params.id));


    if (!user) {
        return sendResponse(res, 404, 'User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    return sendResponse(res, 200, 'User updated successfully', user);
});

// Delete user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return sendResponse(res, 404, 'User not found');
    }

    users.splice(userIndex, 1);
    return sendResponse(res, 200, 'User deleted successfully', userIndex); // Status 200 instead of 204
});





module.exports = router;
module.exports.__resetUsers = resetUsers;