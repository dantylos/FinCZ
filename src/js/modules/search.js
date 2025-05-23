export function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.querySelector('.search-form');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Search is executing: ${query}`);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
        }
    });
}