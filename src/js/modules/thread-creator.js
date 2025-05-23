const input = document.getElementById('threadInput');
const button = document.getElementById('postThreadBtn');
const list = document.getElementById('threadList');

button.addEventListener('click', () => {
    const value = input.value.trim();
    if (value) {
        const li = document.createElement('li');
        li.className = 'thread-item';
        li.textContent = value;
        list.prepend(li); // Adds threads to the top
        input.value = '';
    }
});