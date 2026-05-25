const express = require('express');
const cors = require('cors');
const cartRoutes = require('./routes/cart.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cart', cartRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'cart-service', port: process.env.PORT || 8085 });
});

module.exports = app;
