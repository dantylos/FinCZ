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

// reCAPTCHA rendering
var signInRecaptchaWidget;
var registerRecaptchaWidget;
var onloadCallback = function() {
  // Explicitly render the reCAPTCHA widgets
  signInRecaptchaWidget = grecaptcha.render('recaptcha-container', {
    'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    'callback': function(response) {
      console.log("Sign-in reCAPTCHA verified: " + response);
    }
  });
  
  registerRecaptchaWidget = grecaptcha.render('register-recaptcha-container', {
    'sitekey': '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    'callback': function(response) {
      console.log("Registration reCAPTCHA verified: " + response);
    }
  });
};

// Reset reCAPTCHA on form toggle
showSignIn.addEventListener('click', e => {
  e.preventDefault();
  toggleForms(false);
  // Need a short delay to ensure the container is visible before rendering
  setTimeout(() => {
    if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
      try {
        grecaptcha.reset(signInRecaptchaWidget);
      } catch (e) {
        console.log("Could not reset reCAPTCHA", e);
      }
    }
  }, 100);
});

showRegister.addEventListener('click', e => {
  e.preventDefault();
  toggleForms(true);
  // Need a short delay to ensure the container is visible before rendering
  setTimeout(() => {
    if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
      try {
        grecaptcha.reset(registerRecaptchaWidget);
      } catch (e) {
        console.log("Could not reset reCAPTCHA", e);
      }
    }
  }, 100);
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

// Handle sign-in form submission with reCAPTCHA validation
const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get the reCAPTCHA response
  const recaptchaResponse = grecaptcha.getResponse(signInRecaptchaWidget);
  
  // Validate reCAPTCHA
  if (!recaptchaResponse) {
    alert('Please complete the reCAPTCHA verification');
    return;
  }
  
  // NOTE: We're using Google's test keys for local development.
  // Before deploying to production, we should replace with actual site keys registered for your domain.
  // Test keys will show "This is a test key" message but will function correctly for local testing.
  
  // Get form data
  const email = this.querySelector('input[name="email"]').value;
  const password = this.querySelector('input[name="password"]').value;
  
  // Here you would typically send the form data and reCAPTCHA response to your server
  console.log('Sign-in form submitted with valid reCAPTCHA', {
    email,
    password: '********', // Don't log actual password
    recaptchaResponse: recaptchaResponse.substring(0, 20) + '...' // Log just part of the token for debugging
  });
  
  // For this example, we'll just reset the form and close the modal
  this.reset();
  grecaptcha.reset(signInRecaptchaWidget);
  closeModal();
});

// Handle registration form submission with reCAPTCHA validation
const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get the reCAPTCHA response
  const recaptchaResponse = grecaptcha.getResponse(registerRecaptchaWidget);
  
  // Validate reCAPTCHA
  if (!recaptchaResponse) {
    alert('Please complete the reCAPTCHA verification');
    return;
  }
  
  // Get form data
  const name = this.querySelector('input[name="Name"]').value;
  const username = this.querySelector('input[name="Username"]').value;
  const email = this.querySelector('input[name="email"]').value;
  const password = this.querySelector('input[name="password"]').value;
  
  // Here you would typically send the form data and reCAPTCHA response to your server
  console.log('Registration form submitted with valid reCAPTCHA', {
    name,
    username,
    email,
    password: '********', // Don't log actual password
    recaptchaResponse: recaptchaResponse.substring(0, 20) + '...' // Log just part of the token for debugging
  });
  
  // For this example, we'll just reset the form and close the modal
  this.reset();
  grecaptcha.reset(registerRecaptchaWidget);
  closeModal();
});
