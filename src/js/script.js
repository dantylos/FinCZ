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