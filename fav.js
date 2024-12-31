document.addEventListener("DOMContentLoaded", function () {
    // Get the movielist data from localStorage
    var movielist = JSON.parse(localStorage.getItem('movielist')) || [];
    var favContainer = document.getElementById('favContent');
    var searchInput = document.getElementById('searchInput'); // Get the search input

    // Initialize Notyf instance with top-right position
    var notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top',
        },
    });

    // Function to display the movielist
    function displayMovielist(movielist) {
        if (movielist.length > 0) {
            var movielistHTML = '';

            for (var i = 0; i < movielist.length; i++) {
                var movie = movielist[i];
                movielistHTML += `
                <div class="card col-lg-3 col-md-6" id="movie-${movie.id}" data-movie-id="${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" class="d-block w-100" alt="${movie.title}">
                    <button class="add-fav btn fav-card" onclick="toggleMovielist(event, '${movie.id}', '${movie.title}', '${movie.poster_path}')">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <div class="carousel-caption text-black text-center d-none d-md-block">
                        <h5>${movie.title}</h5>
                    </div>
                </div>
            `;
            }

            favContainer.innerHTML = movielistHTML;
            bindMovieCardClick(); // Reattach modal event listeners to the newly generated cards
        } else {
            favContainer.innerHTML = '<p>Your Favlist is empty.</p>';
        }
    }

    // Call the function to display the movielist when the page loads
    displayMovielist(movielist);

    // Function to toggle movie in movielist
    toggleMovielist = function (event, id, title, poster_path) {
        event.stopPropagation(); // Prevent click event from bubbling to the card (modal trigger)
        
        var movielist = JSON.parse(localStorage.getItem('movielist')) || [];
        var movie = { id, title, poster_path };

        var movieFound = false;

        // Check if the movie is already in the list
        for (var i = 0; i < movielist.length; i++) {
            if (movielist[i].id === id) {
                movielist.splice(i, 1);
                movieFound = true;
                break;
            }
        }

        if (movieFound) {
            // Update localStorage
            localStorage.setItem('movielist', JSON.stringify(movielist));

            // Remove the movie card from the UI
            var movieCard = document.getElementById(`movie-${id}`);
            if (movieCard) {
                movieCard.remove(); // Remove card entirely from the DOM
            }

            if (movielist.length === 0) {
                favContainer.innerHTML = '<p>Your Favlist is empty.</p>';
            }

            notyf.error('Movie removed from Favlist!');
        } else {
            // If the movie was not found, add it to the movielist
            movielist.push(movie);
            localStorage.setItem('movielist', JSON.stringify(movielist));
            notyf.success('Movie added to Favlist!');
        }

        displayMovielist(movielist); // Re-render movielist after removing
    };

    searchInput.addEventListener('input', function () {
        var query = searchInput.value.toLowerCase(); 
        var filteredList = [];

        for (var i = 0; i < movielist.length; i++) {
            if (movielist[i].title.toLowerCase().includes(query)) {
                filteredList.push(movielist[i]);
            }
        }

        displayMovielist(filteredList);
    });

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
