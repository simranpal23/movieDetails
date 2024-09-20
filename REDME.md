```
# Cinema Scope

## Description

Cinema Scope is a web application that allows users to search for movies and add them to their watchlist. 
It provides details about movies fetched from the OMDb API.

## Features

- Search for movies by title.
- View movie details such as plot, director, cast, and ratings.
- Add and remove movies from your watchlist.
- Watchlist persistence using local storage.

## Technologies Used

- HTML
- CSS
- JavaScript
- OMDb API

## File Structure

```
├── app.js
├── watchlist.js
├── index.html
└── watchlist.html

```

## File Functionality

### `index.html`
- This file represents the main page of the movie app.
- It includes the basic HTML structure, links to external CSS (style.css), and embeds the JavaScript file (app.js) for handling functionality.
- The page features a header with the title "Cinema Scope" and a navigation link to the Watchlist ("watchlist.html").
- The main content area includes a search section where users can input movie titles and initiate a search using the "Search" button.
- The fetched movies are then dynamically displayed in a grid format within the "movieGrid" section.
- It also has a hidden section with the ID "movieDetails" which will be used to display detailed information about a specific movie when the user clicks on the "Details" button.

### `app.js`
- This is the main JavaScript file that powers the movie search and display functionality on the "index.html" page.
- It handles fetching movie data from the OMDb API, processing the data, and dynamically updating the HTML to display the movies in a grid. 
- The file includes event listeners for user interactions, functions to fetch and display movie details, and logic for managing the watchlist functionality, including adding and removing movies and storing the watchlist in local storage.
- It defines variables, functions, and event listeners using JavaScript syntax.
- The code utilizes asynchronous JavaScript concepts like "async/await" for handling API requests and promises.

### `watchlist.html`
- This HTML file represents the "Watchlist" page of the movie app, displaying the movies that the user has added to their watchlist.
- The page structure includes a header with the title "My WatchList" and a "Back to Search" button that takes the user back to the main search page ("index.html").
- The main content area features a grid container ("watchlistGrid") where movies from the watchlist are dynamically displayed. Each movie listing typically includes the movie poster, title, year of release, and a "Remove" button to delete it from the watchlist.

### `watchlist.js`
- This JavaScript file is linked to the "watchlist.html" and manages the functionality of the "Watchlist" page.
- It handles loading and displaying the user's watchlist, which is stored in the browser's local storage.
- The script defines an event listener for the "Back to Search" button, redirecting the user to "index.html" when clicked.
- The core functionality lies in the `displayWatchlist()` function, which retrieves the watchlist from local storage and dynamically generates HTML to display each movie within the "watchlistGrid" container.
- It also handles removing movies from the watchlist when the user clicks the "Remove" button, updating both the display and local storage accordingly.

### `style.css`
- This file contains the CSS rules for styling the appearance of the web pages.
- It defines styles for elements like the header, search bar, movie grid, movie cards, and the movie details section.
- The styles use CSS properties to control aspects like colors, fonts, spacing, borders, and shadows to enhance the visual presentation of the movie app.
- The file might also include media queries to adjust the layout and styling for different screen sizes and devices, ensuring responsiveness.


## Installation

No installation is required to run this project. Simply open the `index.html` file in your web browser.

## Usage

1. Open the `index.html` file in your web browser.
2. Enter a movie title in the search bar and click "Search".
3. Click on a movie card to view its details.
4. Click "Add to Watchlist" to add a movie to your watchlist.
5. Navigate to the "Watchlist" page to view your saved movies.
6. Click "Remove" to delete a movie from your watchlist.

## Credits

This project uses the OMDb API to fetch movie data. [https://www.omdbapi.com/](https://www.omdbapi.com/)

## License

This project is open-source and available under the [MIT License](LICENSE).
```