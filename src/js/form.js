const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Registration script
// const bcrypt = require('bcryptjs');
// const db = require('/DDL/schema.sql'); // database connection
//
// app.post('registration', async (req, res) => {
//     const { name, username, email, password, securityPhrase } = req.body;
//
//     // Check if user exists
//     db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
//         if (results.length > 0) {
//             return res.send('User already exists');
//         }
//         // Hash password and store user
//         const hashedPassword = await bcrypt.hash(password, 10);
//         db.query('INSERT INTO users (name, username, email, password, securityPhrase) VALUES (?, ?, ?, ?, ?)', [name, username, email, hashedPassword], (err, result) => {
//             if (err) throw err;
//             res.send('Registration successful');
//         });
//     });
// });
//
// // Login script
// app.post('login', (req, res) => {
//     const { email, password } = req.body;
//     db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//         if (results.length === 0) {
//             return res.send('User not found');
//         }
//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             // Set session or generate token here
//             res.send('Login successful');
//         } else {
//             res.send('Incorrect password');
//         }
//     });
// });


// Form validation (email and password)
document.getElementById('registrationFormForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = this.email;
    const passwordInput = this.password;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    emailError.textContent = '';
    passwordError.textContent = '';

    const allowedDomains = [
        'seznam.cz', 'gmail.com', 'centrum.cz', 'email.cz', 'volny.cz',
        'atlas.cz', 'post.cz', 'tiscali.cz', 'outlook.com', 'hotmail.com',
        'icloud.com', 'yahoo.com', 'zoznam.sk', 'email.com', 'protonmail.com'
    ];

    // Simple email validation + domain check
    const email = emailInput.value.trim();
    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (!emailDomain || !allowedDomains.includes(emailDomain)) {
        emailError.textContent = 'Email domain not allowed or invalid.';
        emailInput.focus();
        return;
    }

    // Password validation rules combined in one regex for allowed chars
    const pwd = passwordInput.value;
    if (
        pwd.length < 8 || pwd.length > 36 ||
        !/[A-Z]/.test(pwd) ||                    // 1 uppercase
        (pwd.match(/\d/g) || []).length < 2 ||   // 2 numbers
        !/[\/.*#]/.test(pwd) ||                   // 1 special char
        /\s/.test(pwd) ||                         // no spaces
        /(.)\1\1\1/.test(pwd) ||                  // no 4 consecutive identical chars
        /\d{5,}/.test(pwd) ||                     // no 5+ consecutive numbers
        !/^[a-zA-Z0-9\/.*#]+$/.test(pwd)         // allowed chars only
    ) {
        passwordError.textContent = 'Password does not meet requirements.';
        passwordInput.focus();
        return;
    }

    // If requirements meeted - submit form
    this.submit();
});


document.querySelector('.toggle-password').addEventListener('click', function () {
    const pwd = document.getElementById('login-password');
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
// 👁
});

// Allow toggling by keyboard
document.querySelector('.toggle-password').addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.click();
    }
});