const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Add CORS here
const userRoutes = require('./routes/userRoutes'); 
const healthCheckRoutes = require('./routes/healthCheckRoutes'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());  // Enable CORS for all routes

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/healthchecks', healthCheckRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});