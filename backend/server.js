const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Routes
app.use('/api/activities', require('./routes/activities'));
app.use('/api/news', require('./routes/news'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/contacts', require('./routes/contacts'));

// Error handler
app.use(errorHandler);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'UKM LBUT API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});