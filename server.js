const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (ensure your MongoDB URI is correct)
mongoose.connect('mongodb+srv://ranjanirithu206:KS0pwc1jwcIxmZu0@cluster0.8mgcr.mongodb.net/MEAN?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a simple Contact schema (this can be in another file for a larger project)
const ContactSchema = new mongoose.Schema({
  fullName: String,
  emailAddress: String,
  mobileNumber: String,
  emailSubject: String,
  message: String,
});

// Create a Contact model
const Contact = mongoose.model('Contact', ContactSchema);

// POST route to handle form submission
app.post('/api/contact', (req, res) => {
  const { fullName, emailAddress, mobileNumber, emailSubject, message } = req.body;

  // Create a new contact instance
  const newContact = new Contact({
    fullName,
    emailAddress,
    mobileNumber,
    emailSubject,
    message,
  });

  // Save the contact to the database
  newContact.save()
    .then(() => res.status(200).json({ msg: 'Contact form submitted successfully' }))
    .catch(err => res.status(500).json({ error: 'Failed to submit the form', err }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
