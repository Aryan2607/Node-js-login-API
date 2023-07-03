const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'template')));

// Mock user data for simplicity
const users = [
  { username: 'users1', password: 'pass123' },
  { username: 'users2', password: 'pass456' }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate username
  if (!username.match(/^[a-zA-Z0-9]{6,12}$/)) {
    return res.status(400).json({ error: 'Invalid username. It should be alphanumeric and between 6-12 characters.' });
  }

  // Validate password
  if (password.length < 6) {
    return res.status(400).json({ error: 'Invalid password. It should be at least 6 characters long.' });
  }

  // Check if user exists
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials. User not found.' });
  }

  // Check if password matches
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials. Incorrect password.' });
  }

  // Successful login
  return res.json({ message: 'Login successful!' });
});

// Route handler for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'template', 'login.html'));
});


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Created by Aryan Agrawal
// Command to check by using cURL
// curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"users1\",\"password\":\"pass123\"}" http://localhost:3000/login
