import { AuthUtils } from './authUtils.js';

export function initFormHandler() {

    // Registration form handler
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (!AuthUtils.canLogin()) {
                alert('Please accept our privacy policy and cookie agreement first.');
                return;
            }

            const emailInput = this.email;
            const passwordInput = this.password;
            const nameInput = this.name; // Исправлено: было legal_names, стало name
            const usernameInput = this.username;
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');

            // Clear previous errors
            emailError.textContent = '';
            passwordError.textContent = '';

            const allowedDomains = [
                'seznam.cz', 'gmail.com', 'centrum.cz', 'email.cz', 'volny.cz',
                'atlas.cz', 'post.cz', 'tiscali.cz', 'outlook.com', 'hotmail.com',
                'icloud.com', 'yahoo.com', 'zoznam.sk', 'email.com', 'protonmail.com'
            ];

            // Email validation
            const email = emailInput.value.trim();
            const emailDomain = email.split('@')[1]?.toLowerCase();
            if (!emailDomain || !allowedDomains.includes(emailDomain)) {
                emailError.textContent = 'Email domain not allowed or invalid.';
                emailInput.focus();
                return;
            }

            // Password validation
            const pwd = passwordInput.value;
            if (
                pwd.length < 8 || pwd.length > 36 ||
                !/[A-Z]/.test(pwd) ||
                (pwd.match(/\d/g) || []).length < 2 ||
                !/[\/.*#]/.test(pwd) ||
                /\s/.test(pwd) ||
                /(.)\1\1\1/.test(pwd) ||
                /\d{5,}/.test(pwd) ||
                !/^[a-zA-Z0-9\/.*#]+$/.test(pwd)
            ) {
                passwordError.textContent = 'Password does not meet requirements.';
                passwordInput.focus();
                return;
            }

            // Get security question data
            const securityQuestionSelect = document.getElementById('security-question-select');
            const customQuestionInput = document.getElementById('custom-security-question');
            const securityAnswerInput = document.getElementById('security-answer');

            let securityQuestion;
            if (securityQuestionSelect.value === 'custom') {
                securityQuestion = customQuestionInput.value.trim();
            } else {
                const selectedOption = securityQuestionSelect.options[securityQuestionSelect.selectedIndex];
                securityQuestion = selectedOption.text;
            }

            // Form payload for API
            const payload = {
                username: usernameInput.value.trim(),
                legal_names: nameInput.value.trim(), // API ожидает legal_names
                email: email,
                password: pwd,
                security_question: securityQuestion,
                security_answer: securityAnswerInput.value.trim(),
                role: 'user',
                profile_picture: null,
                agreement_signed_at: new Date().toISOString()
            };

            try {
                const response = await fetch('https://financecz.onrender.com/api/users/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (!response.ok) {
                    alert(result.error || 'Registration failed.');
                } else {
                    alert('Registration successful!');
                    // Close modal after successful registration
                    const modalOverlay = document.getElementById('modalOverlay');
                    modalOverlay.classList.remove('active');
                    document.querySelector('header').style.filter = '';
                    document.querySelector('main').style.filter = '';
                    // Обновляем отображение после успешной регистрации
                    window.updateAuthDisplay();
                }
            } catch (error) {
                alert('Request failed. Please try again.');
                console.error('Registration error:', error);
            }
        });
    }

    // Login form handler
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', async function (e) {
            e.preventDefault();


            if (!AuthUtils.canLogin()) {
                alert('Please accept our privacy policy and cookie agreement to log in.');
                return;
            }

            const usernameInput = this['login-user'];
            const passwordInput = this['login-password'];

            // Basic validation
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            if (!username || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Login validation (same as registration for password)
            if (
                password.length < 8 || password.length > 36 ||
                !/[A-Z]/.test(password) ||
                (password.match(/\d/g) || []).length < 2 ||
                !/[\/.*#]/.test(password) ||
                /\s/.test(password) ||
                /(.)\1\1\1/.test(password) ||
                /\d{5,}/.test(password) ||
                !/^[a-zA-Z0-9\/.*#]+$/.test(password)
            ) {
                alert('Invalid password format.');
                passwordInput.focus();
                return;
            }

            const payload = {
                username: username,
                password: password
            };

            try {
                const response = await fetch('https://financecz.onrender.com/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (!response.ok) {
                    alert(result.error || 'Login failed.');
                } else {
                    alert('Login successful!');
                    // Store auth token
                    AuthUtils.setToken(result.token, payload.username);

                    // Close a modal and redirect
                    const modalOverlay = document.getElementById('modalOverlay');
                    modalOverlay.classList.remove('active');
                    document.querySelector('header').style.filter = '';
                    document.querySelector('main').style.filter = '';

                    window.updateAuthDisplay();
                    location.reload();
                }
            } catch (error) {
                alert('Request failed. Please try again.');
                console.error('Login error:', error);
            }
        });
    }

    // Password censorship functionality
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const passwordField = document.getElementById('login-password');
            passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
        });

        togglePassword.addEventListener('keydown', function (e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                this.click();
            }
        });
    }
}