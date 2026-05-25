const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/order.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/order', orderRoutes);
app.use('/orders', orderRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'order-service', port: process.env.PORT || 8083 });
});

module.exports = app;
