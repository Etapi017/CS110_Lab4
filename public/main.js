document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.querySelector('.article-container');
    const apiKey = 'KtdAxMvdsmo0lF65Qj2i8QRfUUBgJINf';  // Your API key
    const baseUrl = 'https://api.nytimes.com/svc/mostpopular/v2/';

    // Function to fetch and display articles based on sort type and period
    function loadArticles(type, period) {
        const url = buildUrl(type, period);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => displayArticles(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }

    // Build the URL for the API request
    function buildUrl(type, period) {
        let endpoint = '';
        switch (type) {
            case 'mostViewed':
                endpoint = `viewed/${period}.json`;
                break;
            case 'mostEmailed':
                endpoint = `emailed/${period}.json`;
                break;
            case 'mostShared':
                // Assuming 'facebook' as a share type, adjust if different share types are needed
                endpoint = `shared/${period}/facebook.json`;
                break;
            default:
                endpoint = `viewed/${period}.json`; // Default case to handle unexpected types
        }
        return `${baseUrl}${endpoint}?api-key=${apiKey}`;
    }

    // Update the DOM with the fetched articles
    function displayArticles(articles) {
        articlesContainer.innerHTML = ''; // Clear the container before adding new articles
        articles.slice(0, 5).forEach(article => { // Only display the top 5 articles
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';
            articleDiv.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.abstract}</p>
                ${article.media && article.media.length > 0 && article.media[0]['media-metadata'] ? 
                `<img src="${article.media[0]['media-metadata'][0].url}" alt="${article.title}">` : ''}
            `;
            articlesContainer.appendChild(articleDiv);
        });
    }

    // Listen for changes on the 'Sort By' and 'Time Frame' radio buttons
    document.querySelectorAll('input[name="sort"], input[name="time"]').forEach(input => {
        input.addEventListener('change', () => {
            const period = document.querySelector('input[name="time"]:checked').value;
            const sortType = document.querySelector('input[name="sort"]:checked').value;
            loadArticles(sortType, period);
        });
    });

    // Initial load for the default setting
    loadArticles('mostViewed', 1); // Default to most viewed articles for the past day
});
