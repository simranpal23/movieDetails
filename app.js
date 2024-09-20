const apiKey = 'd9ee2866';
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const movieGrid = document.getElementById('movieGrid');
const movieDetails = document.getElementById('movieDetails');
const watchlistButton = document.getElementById('watchListButton');
const watchlistGrid = document.getElementById('watchlistGrid');
const backButton = document.getElementById('backButton'); // New back button
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Popular movies (example IDs, replace with real data or endpoint if available)
const popularMovies = [
    'tt0848228', // The Avengers
    'tt4154796', // Avengers: Endgame
    'tt0468569', // The Dark Knight
    'tt0111161', // The Shawshank Redemption
    'tt1375666',  // Inception
    'tt0133093', 'tt0137523', 'tt0266697', 'tt0284978', 'tt0076759',
  'tt0109830', 'tt0120815', 'tt0180093', 'tt0451094', 'tt0110912'

];

// Event listeners
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchMovies(query);
    }
});

// Search button enter functionality
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        if (query) {
            fetchMovies(query);
        }
    }
});

// Fetch and display popular movies on load
window.onload = () => {
    fetchMoviesByIds(popularMovies);
};

watchlistButton.addEventListener('click', () => {
    document.getElementById('movieGrid').classList.add('hidden');
    document.getElementById('movieDetails').classList.add('hidden');
    document.getElementById('watchList').classList.remove('hidden');
    displayWatchlist();
});

// Back button functionality
backButton.addEventListener('click', () => {
    document.getElementById('movieGrid').classList.remove('hidden');
    document.getElementById('movieDetails').classList.add('hidden');
    document.getElementById('watchList').classList.add('hidden');
});

// Fetch movies from the API
async function fetchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Search) {
        displayMovies(data.Search);
    } else {
        movieGrid.innerHTML = '<p>No movies found. Please try another search.</p>';
    }
}

// Fetch movies by a list of IDs
async function fetchMoviesByIds(ids) {
    const movies = await Promise.all(ids.map(id => fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`).then(response => response.json())));
    displayMovies(movies);
}

// Display movies in the grid
function displayMovies(movies) {
    movieGrid.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="showDetails('${movie.imdbID}')">Details</button>
            <button onclick="addToWatchlist('${movie.imdbID}')">Add to Watchlist</button>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// Show movie details
async function showDetails(imdbID) {
    // Hide movie grid
    movieGrid.style.display = 'none';
    
    // Fetch movie details
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
    const movie = await response.json();
    
    // Display movie details
    movieDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Cast:</strong> ${movie.Actors}</p>
        <p><strong>Release Year:</strong> ${movie.Year}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Language:</strong> ${movie.Language}</p>
        <p><strong>Country:</strong> ${movie.Country}</p>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div><button onclick="closeDetails()">Close</button></div>
    `;
    movieDetails.style.display = 'block';
}

// Close movie details
function closeDetails() {
    // Show movie grid
    movieGrid.style.display = 'grid';
    
    // Hide movie details
    movieDetails.style.display = 'none';
}

// Add movie to watchlist
function addToWatchlist(imdbID) {
    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert('Movie added to watchlist!');
    } else {
        alert('Movie is already in your watchlist!');
    }
}

// Display the watchlist movies
async function displayWatchlist() {
    watchlistGrid.innerHTML = '';
    if (watchlist.length === 0) {
        watchlistGrid.innerHTML = '<p>No movies in your watchlist.</p>';
        return;
    }

    for (let imdbID of watchlist) {
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
    }
}


// Remove a movie from the watchlist
function removeFromWatchlist(imdbID) {
    watchlist = watchlist.filter(id => id !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist();
}
