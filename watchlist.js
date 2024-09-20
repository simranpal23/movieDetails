// Event listener for back button

const apiKey = 'd9ee2866';
const watchlistGrid = document.getElementById('watchlistGrid');
const backToSearchButton = document.getElementById('backToSearchButton');
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Event listener for back button
backToSearchButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Display watchlist
async function displayWatchlist() {
    watchlistGrid.innerHTML = '';
    for (let imdbID of watchlist) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
            const movie = await response.json();
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <button onclick="removeFromWatchlist('${imdbID}')">Remove</button>
            `;
            watchlistGrid.appendChild(movieCard);
        } catch (error) {
            console.error('Error fetching watchlist movie:', error);
            watchlistGrid.innerHTML = '<p>Error fetching watchlist movies. Please try again.</p>';
        }
    }
}

// Remove movie from watchlist
function removeFromWatchlist(imdbID) {
    watchlist = watchlist.filter(id => id !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist();
}

// Initial setup
window.onload = displayWatchlist;