const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Registration script

const bcrypt = require('bcryptjs');
const db = require('/DDL/schema.sql'); // database connection

app.post('registration', async (req, res) => {
    const { name, username, email, password, securityPhrase } = req.body;

    // Check if user exists
    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (results.length > 0) {
            return res.send('User already exists');
        }
        // Hash password and store user
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (name, username, email, password, securityPhrase) VALUES (?, ?, ?, ?, ?)', [name, username, email, hashedPassword], (err, result) => {
            if (err) throw err;
            res.send('Registration successful');
        });
    });
});


// Login script

app.post('login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (results.length === 0) {
            return res.send('User not found');
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Set session or generate token here
            res.send('Login successful');
        } else {
            res.send('Incorrect password');
        }
    });
});