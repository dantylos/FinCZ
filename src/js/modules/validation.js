export function initValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.email;
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');

        emailError.textContent = '';
        passwordError.textContent = '';

        const allowedDomains = [
            'seznam.cz', 'gmail.com', 'centrum.cz', 'email.cz', 'volny.cz',
            'atlas.cz', 'post.cz', 'tiscali.cz', 'outlook.com', 'hotmail.com',
            'icloud.com', 'yahoo.com', 'zoznam.sk', 'email.com', 'protonmail.com'
        ];

        const email = emailInput.value.trim();
        const emailDomain = email.split('@')[1]?.toLowerCase();
        if (!emailDomain || !allowedDomains.includes(emailDomain)) {
            emailError.textContent = 'Email domain not allowed or invalid.';
            emailInput.focus();
            return;
        }

        const pwdMsg = validatePassword(this.password.value);
        if (pwdMsg) {
            passwordError.textContent = pwdMsg;
            this.password.focus();
            return;
        }

        this.submit();
    });

    const togglePwd = document.querySelector('.toggle-password');
    if (togglePwd) {
        togglePwd.addEventListener('click', () => {
            const pwd = document.getElementById('login-password');
            pwd.type = pwd.type === 'password' ? 'text' : 'password';
        });

        togglePwd.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                togglePwd.click();
            }
        });
    }

    function validatePassword(pwd) {
        const rules = [
            { test: pwd.length >= 8 && pwd.length <= 36, msg: "8-36 characters required" },
            { test: /[A-Z]/.test(pwd), msg: "At least 1 uppercase letter" },
            { test: (pwd.match(/\d/g) || []).length >= 2, msg: "At least 2 numbers" },
            { test: /[\/.*#]/.test(pwd), msg: "At least 1 special character (/.*#)" },
            { test: !/\s/.test(pwd), msg: "No spaces allowed" },
            { test: !/(.)\1{3,}/.test(pwd), msg: "No 4+ consecutive identical chars" },
            { test: !/\d{5,}/.test(pwd), msg: "No 5+ consecutive numbers" }
        ];

        const failed = rules.find(rule => !rule.test);
        return failed ? failed.msg : null;
    }
}