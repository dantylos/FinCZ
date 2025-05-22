// Main function
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.querySelector('.search-form');

    // Form sending
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();

        if (query) {
            // Here you can add search or redirect logic
            console.log(`Search is executing: ${query}`);
            // Search function to be implemented
            searchPosts(query);
        }
    });

    // Auto input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length >= 2) {
            // This is where we need to add logic for input prompts
            fetchSearchSuggestions(query);
        }
    });
});