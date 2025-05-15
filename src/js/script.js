const signInBtn = document.getElementById('signInBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const siteHeader = document.querySelector('header');
const content = document.querySelector('main');
const registerBlock = document.getElementById('registerBlock');
const signInBlock = document.getElementById('signInBlock');
const showSignIn = document.getElementById('showSignIn');
const showRegister = document.getElementById('showRegister');

function toggleForms(showRegisterForm) {
  registerBlock.style.display = showRegisterForm ? '' : 'none';
  signInBlock.style.display = showRegisterForm ? 'none' : '';
  (showRegisterForm ? registerBlock : signInBlock).querySelector('input').focus();
}

showSignIn.addEventListener('click', e => {
  e.preventDefault();
  toggleForms(false);
});

showRegister.addEventListener('click', e => {
  e.preventDefault();
  toggleForms(true);
});

function openModal() {
  toggleForms(true);
  modalOverlay.classList.add('active');
  siteHeader.style.filter = content.style.filter = 'blur(6px)';
  modalOverlay.querySelector('input').focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  siteHeader.style.filter = content.style.filter = '';
}

signInBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
});

async function loadTrendingTopics() {
  try {
    const res = await fetch('https://www.reddit.com/r/stocks/hot.json?limit=5');
    const json = await res.json();
    const list = document.getElementById('trending-list');
    list.innerHTML = '';
    json.data.children.forEach(post => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'https://www.reddit.com' + post.data.permalink;
      a.target = '_blank';
      a.textContent = post.data.title;
      li.appendChild(a);
      list.appendChild(li);
    });
  } catch {
    document.getElementById('trending-list').innerHTML = '<li>Error loading topics.</li>';
  }
}

loadTrendingTopics();
setInterval(loadTrendingTopics, 10800000); // every 3 hours


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