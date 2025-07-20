const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")
const maproutes = require("./routes/maps.routes")
const rideRoutes = require("./routes/ride.routes")

const cookiePaerser = require("cookie-parser")
app.use(cookiePaerser())

// Middleware
app.use(cors());

/*Without these middleware functions, req.body would be undefined, and you wouldn't be able to access the data sent in the request body.*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Uber API' });
});

app.use('/users',userRoutes);
app.use('/captain',captainRoutes);
app.use('/map',maproutes)
app.use('/ride',rideRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
