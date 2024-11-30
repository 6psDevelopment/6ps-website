const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log function to save attempts
function logAttempt(type, username, success) {
    const log = {
        type, // 'login' or 'signup'
        username,
        success,
        timestamp: new Date().toISOString()
    };
    
    // Append to a log file
    fs.appendFile('attempts.log', JSON.stringify(log) + '\n', (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
}

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Example hard-coded credentials check
    if (username === 'testuser' && password === 'testpass') {
        logAttempt('login', username, true);
        res.redirect('/index.html');
    } else {
        logAttempt('login', username, false);
        res.status(401).send('Incorrect username or password.');
    }
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // In a real system, save the user credentials securely
    logAttempt('signup', username, true);
    res.redirect('/index.html');
});

// Serve static files (HTML pages)
app.use(express.static('public')); // Assumes HTML files are in a 'public' folder

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
