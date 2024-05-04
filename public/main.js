document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.querySelector('.article-container');
    document.querySelectorAll('input[type=radio]').forEach(input => {
        input.addEventListener('change', loadArticles);
    });

    function loadArticles() {
        // Placeholder function to demonstrate loading articles
        // This function should make an API call or filter data based on the selected criteria
        articlesContainer.innerHTML = ''; // Clear existing articles
        for (let i = 0; i < 5; i++) { // Dummy data loop
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';
            articleDiv.innerHTML = `<h3>Article Title ${i+1}</h3>
                                    <p>Summary for article ${i+1}...</p>
                                    <img src="image-${i+1}.jpg" alt="Image for article ${i+1}">`;
            articlesContainer.appendChild(articleDiv);
        }
    }

    loadArticles(); // Load initial articles
});
