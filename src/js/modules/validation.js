export function initValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    // Real-time validation
    const nameInput = document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Name validation
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const nameError = document.getElementById('name-error');
            const name = this.value.trim();

            if (!name) {
                nameError.textContent = 'Name is required.';
                return;
            }

            if (!/^[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ ]+$/.test(name)) {
                nameError.textContent = 'Only letters and spaces allowed.';
                return;
            }

            if (name.length > 40) {
                nameError.textContent = 'Name too long (max 40 characters).';
                return;
            }

            nameError.textContent = '';
        });
    }

    // Username validation
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            const usernameError = document.getElementById('username-error');
            const username = this.value.trim();

            if (!username) {
                usernameError.textContent = 'Username is required.';
                return;
            }

            if (!/^[a-z0-9]+$/.test(username)) {
                usernameError.textContent = 'Only lowercase letters and numbers allowed.';
                return;
            }

            if (username.length > 30) {
                usernameError.textContent = 'Username too long (max 30 characters).';
                return;
            }

            usernameError.textContent = '';
        });
    }

    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailError = document.getElementById('email-error');
            const email = this.value.trim();

            if (!email) {
                emailError.textContent = 'Email is required.';
                return;
            }

            const allowedDomains = [
                'seznam.cz', 'gmail.com', 'centrum.cz', 'email.cz', 'volny.cz',
                'atlas.cz', 'post.cz', 'tiscali.cz', 'outlook.com', 'hotmail.com',
                'icloud.com', 'yahoo.com', 'zoznam.sk', 'email.com', 'protonmail.com'
            ];

            const emailDomain = email.split('@')[1]?.toLowerCase();
            if (!emailDomain || !allowedDomains.includes(emailDomain)) {
                emailError.textContent = 'Email domain not allowed or invalid.';
                return;
            }

            emailError.textContent = '';
        });
    }

    // Password validation
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const passwordError = document.getElementById('password-error');
            const pwd = this.value;

            const validationResult = validatePassword(pwd);
            passwordError.textContent = validationResult || '';
        });
    }

    // Password toggle functionality for login form
    const togglePwd = document.querySelector('.toggle-password');
    if (togglePwd) {
        togglePwd.addEventListener('click', () => {
            const pwd = document.getElementById('login-password');
            if (pwd) {
                pwd.type = pwd.type === 'password' ? 'text' : 'password';
            }
        });

        togglePwd.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                togglePwd.click();
            }
        });
    }

    function validatePassword(pwd) {
        if (!pwd) return 'Password is required.';

        const rules = [
            { test: pwd.length >= 8 && pwd.length <= 36, msg: "Password must be 8-36 characters" },
            { test: /[A-Z]/.test(pwd), msg: "At least 1 uppercase letter required" },
            { test: (pwd.match(/\d/g) || []).length >= 2, msg: "At least 2 numbers required" },
            { test: /[\/.*#]/.test(pwd), msg: "At least 1 special character (/.*#) required" },
            { test: !/\s/.test(pwd), msg: "No spaces allowed" },
            { test: !/(.)\1{3,}/.test(pwd), msg: "No more than 3 consecutive identical characters" },
            { test: !/\d{5,}/.test(pwd), msg: "No more than 4 consecutive numbers" },
            { test: /^[a-zA-Z0-9\/.*#]+$/.test(pwd), msg: "Only allowed characters: letters, numbers, /, ., *, #" }
        ];

        const failed = rules.find(rule => !rule.test);
        return failed ? failed.msg : null;
    }
}