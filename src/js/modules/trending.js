export function initTrending() {
    async function loadTrendingTopics() {
        try {
            const res = await fetch('https://www.reddit.com/r/stocks/hot.json?limit=5');
            const json = await res.json();
            const list = document.getElementById('trending-list');
            list.innerHTML = '';
            json.data.children.forEach(post => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `https://www.reddit.com${post.data.permalink}`;
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
    setInterval(loadTrendingTopics, 10800000); // 3 hours
}