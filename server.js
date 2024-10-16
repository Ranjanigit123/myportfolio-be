const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(cors()); // Enable CORS for all routes

// MongoDB connection string
const mongoURI = 'mongodb+srv://ranjanirithu206:KS0pwc1jwcIxmZu0@cluster0.8mgcr.mongodb.net/MEAN?retryWrites=true&w=majority'; // Replace with your MongoDB URI

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
  //useNewUrlParser: true,
  //useUnifiedTopology: true
//})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema for the Contact Form data
const contactSchema = new mongoose.Schema({
  fullName: String,
  emailAddress: String,
  mobileNumber: String,
  emailSubject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Create a model from the schema
const Contact = mongoose.model('Contact', contactSchema);

// API Routes

// Test Route (GET)
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Submit contact form (POST)
app.post('/api/contact', (req, res) => {
  const { fullName, emailAddress, mobileNumber, emailSubject, message } = req.body;

  // Create a new Contact document
  const newContact = new Contact({
    fullName,
    emailAddress,
    mobileNumber,
    emailSubject,
    message
  });

  // Save the document to the database
  newContact.save()
    .then(contact => res.status(201).json({ success: true, contact }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
