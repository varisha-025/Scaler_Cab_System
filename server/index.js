const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let port = 3001

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

const cabRoutes = require('./routes/cabRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const pathRoutes = require('./routes/pathRoutes');

app.use('/cabs', cabRoutes);
app.use('/bookings', bookingRoutes);
app.use('/path', pathRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;