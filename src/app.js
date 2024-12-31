const express = require('express');
const cors = require('cors');
const reservationRoutes = require('./routes/reservationRoutes');
const tableRoutes = require('./routes/tableRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes'); 
const generalRoutes = require('./routes/generalRoutes'); // Import general routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base route for reservations
app.use('/api/reservations', reservationRoutes);

// Base route for tables
app.use('/api/tables', tableRoutes);

// Base route for orders
app.use('/api/orders', orderRoutes);

// Base route for menus
app.use('/api/menus', menuRoutes);

// Base route for restaurant info
app.use('/api/general', generalRoutes);

// Base route for user information
app.use('/api/users', userRoutes);

// Base route for admin operations
app.use('/api/admin', adminRoutes);


module.exports = app;