document.addEventListener("DOMContentLoaded", function () {
    // Get the watchlist data from localStorage
    var watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    var watchlistContainer = document.getElementById('watchlistContent');
    var watchlistSearchInput = document.getElementById('watchlistSearchInput'); // Get the search input

    // Initialize Notyf instance with top-right position
    var notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top',
        },
    });

    // Function to display the watchlist
    function displayWatchlist(filteredList) {
        if (filteredList.length > 0) {
            var watchlistHTML = '';

            for (var i = 0; i < filteredList.length; i++) {
                var movie = filteredList[i];
                watchlistHTML += `
                    <div class="card col-lg-3" id="movie-${movie.id}" data-movie-id="${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" class="d-block w-100" alt="...">
                        <button class="add-fav btn fav-card" onclick="toggleWatchlist(event, '${movie.id}', '${movie.title}', '${movie.poster_path}', '${movie.backdrop_path}')">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <div class="carousel-caption text-black text-center d-none d-md-block">
                            <h5 class="">${movie.title}</h5>
                        </div>
                    </div>
                `;
            }

            // Set the HTML of the watchlist container all at once
            watchlistContainer.innerHTML = watchlistHTML;
            bindMovieCardClick(); // Reattach modal event listeners to the newly generated cards
        } else {
            watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
        }
    }

    // Call the function to display the watchlist when the page loads
    displayWatchlist(watchlist);

    // Function to toggle movie in the watchlist
    window.toggleWatchlist = function (event, id, title, poster_path, backdrop_path) {
        event.stopPropagation(); // Prevent click event from bubbling to the parent (modal trigger)
        
        var watchlist = JSON.parse(localStorage.getItem('watchlist')) || []; // Retrieve movies from watchlist in localStorage or initialize empty array
        var movie = { id, title, poster_path, backdrop_path }; // Create movie object

        var movieFound = false; // Flag to check if the movie is already in the watchlist

        // Use for loop to check if the movie is in the watchlist
        for (var i = 0; i < watchlist.length; i++) {
            if (watchlist[i].id === id) { // If the movie is found, remove it from the watchlist
                watchlist.splice(i, 1);
                movieFound = true;
                break; // Exit the loop once the item is found and removed
            }
        }

        if (movieFound) { // If the movie was removed
            localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Update localStorage

            // Remove the movie card from the UI
            var movieCard = document.getElementById(`movie-${id}`); // Find the movie card by its ID
            if (movieCard) {
                movieCard.style.display = 'none'; // Hide the movie card from the UI
            }

            // Check if the watchlist is empty after removing the movie
            if (watchlist.length === 0) {
                watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>'; // Display empty message
            }

            notyf.error('Movie removed from Watchlist!');
        } else {
            // If the movie was not found, add it to the watchlist
            watchlist.push(movie); // Add movie details to the array
            localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Update localStorage

            // Add the movie card to the UI (instantly added)
            var newCardHTML = ` 
                <div class="card col-lg-3" id="movie-${movie.id}" data-movie-id="${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w185/${movie.backdrop_path}" class="d-block w-100" alt="...">
                    <button class="add-fav btn fav-card" onclick="toggleWatchlist(event, '${movie.id}', '${movie.title}', '${movie.poster_path}', '${movie.backdrop_path}')">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <div class="carousel-caption text-black text-center d-none d-md-block">
                        <h5 class="">${movie.title}</h5>
                    </div>
                </div>
            `;
            watchlistContainer.innerHTML += newCardHTML; // Add the new movie card to the watchlist container

            notyf.success('Movie added to Watchlist!');
        }
    };

    // Search functionality
    watchlistSearchInput.addEventListener('input', function () {
        var query = watchlistSearchInput.value.toLowerCase(); 
        var filteredList = [];
    
        // Use a for loop to iterate and filter
        for (var i = 0; i < watchlist.length; i++) {
            if (watchlist[i].title.toLowerCase().includes(query)) {
                filteredList.push(watchlist[i]); 
            }
        }
    
        displayWatchlist(filteredList); 
    });

    // Function to show movie details (modal logic)
    function showMovieDetails(movieId) {
        // Fetch movie details from TMDB API
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
            .then(res => res.json())
            .then(movie => {
                // Populate modal with movie details
                document.getElementById("movieModalTitle").textContent = movie.title;
                document.getElementById("movieModalImage").src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                document.getElementById("movieModalOverview").textContent = movie.overview;
                document.getElementById("movieModalReleaseDate").textContent = movie.release_date;
                document.getElementById("movieModalRating").textContent = movie.vote_average;

                // Show the modal
                const movieModal = new bootstrap.Modal(document.getElementById("movieModal"));
                movieModal.show();
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }

    // Bind modal event dynamically
    function bindMovieCardClick() {
        var movieCards = document.querySelectorAll('.card');
        movieCards.forEach(card => {
            card.addEventListener('click', function () {
                var movieId = this.getAttribute('data-movie-id'); // Use data attribute for movie ID
                showMovieDetails(movieId);
            });
        });
    }

});
