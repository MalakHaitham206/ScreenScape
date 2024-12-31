

let currentIndex = 0; // Track the current set of 3 movies

function loadTrendingMovies() {
    fetch("https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
        .then(res => res.json())
        .then(data => {
            const carouselItems = document.getElementById("carousel-items-trending");
            const movies = data.results;
            const sliceMovies = movies.slice(currentIndex, currentIndex + 3);
            carouselItems.innerHTML = '';

            const itemHTML = `
                    
                        <div class="row gap-4 flex-nowrap ">
                            ${sliceMovies.map(movie => `
                                 <div class="card  mx- col-lg-4 col-md-6 col-sm-12">
                                        <img onclick="showMovieDetails(${movie.id})" class="card-img "src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" class="d-block w-100"
                                            alt="...">
                                             <button onclick="toggleMovielist('${movie.id}', '${movie.title}', '${movie.poster_path}')" class="add-fav btn fav-card"><i class="fa-regular fa-heart"></i></button>
                                        <div class="carousel-caption text-black text-center d-none d-md-block">
                                            <h5 class="">${movie.title}</h5>
                                        </div>
                                    </div>
                            `).join('')}
                        </div>
                    
                `;
            carouselItems.innerHTML = itemHTML;
        });
}
// =============================================================
loadTrendingMovies();

document.querySelector('.trending-btn-next').addEventListener('click', () => {
    currentIndex += 3;
    loadTrendingMovies();
});

document.querySelector('.trending-btn-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 3;
        loadTrendingMovies();
    }
});

function loadPopularMovies() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
        .then(res => res.json())
        .then(data => {
            const carouselItems = document.getElementById("carousel-items-popular");
            const movies = data.results;
            const sliceMovies = movies.slice(currentIndex, currentIndex + 3); 

           
            carouselItems.innerHTML = '';

            const itemHTML = `
                    
                        <div class="row gap-4 flex-nowrap ">
                            ${sliceMovies.map(movie => `
                                 <div onclick="showMovieDetails(${movie.id})" class="card   mx- col-lg-4 col-md-6 col-sm-12">
                                        <img class="card-img "src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" class="d-block w-100"
                                            alt="...">
                                             <button onclick="toggleMovielist('${movie.id}', '${movie.title}', '${movie.poster_path}')" class="add-fav btn fav-card"><i class="fa-regular fa-heart"></i></button>
                                        <div class="carousel-caption text-black text-center d-none d-md-block">
                                            <h5 class="">${movie.title}</h5>
                                        </div>
                                    </div>
                            `).join('')}
                        </div>
                    
                `;
            carouselItems.innerHTML = itemHTML;
        });
}

loadPopularMovies();

document.querySelector('.popular-btn-next').addEventListener('click', () => {
    currentIndex += 3;
    loadPopularMovies();
});

document.querySelector('.popular-btn-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 3;
        loadPopularMovies();
    }
});

// =============================================================
function loadMostMovies() {
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
        .then(res => res.json())
        .then(data => {
            const carouselItems = document.getElementById("carousel-items-most");
            const movies = data.results;
            const sliceMovies = movies.slice(currentIndex, currentIndex + 3); // Get 3 movies starting from currentIndex

            // Clear the previous carousel items
            carouselItems.innerHTML = '';

            const itemHTML = `
                    
                        <div class="row  gap-4 flex-nowrap">
                            ${sliceMovies.map(movie => `
                                 <div onclick="showMovieDetails(${movie.id})" class="card  mx- col-lg-4 col-md-6 col-sm-12">
                                        <img class="card-img "src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" class="d-block w-100"
                                            alt="...">
                                             <button onclick="toggleMovielist('${movie.id}', '${movie.title}', '${movie.poster_path}')" class="add-fav btn fav-card"><i class="fa-regular fa-heart"></i></button>
                                        <div class="carousel-caption text-black text-center d-none d-md-block">
                                            <h5 class="">${movie.title}</h5>
                                        </div>
                                    </div>
                            `).join('')}
                        </div>
                    
                `;
            carouselItems.innerHTML = itemHTML;
        });
}

// Load the first set of movies when the page loads
loadMostMovies();
// =============================================================
// Update the currentIndex when navigating through the carousel
document.querySelector('.most-btn-next').addEventListener('click', () => {
    currentIndex += 3;
    loadMostMovies();
});

document.querySelector('.most-btn-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 3;
        loadMostMovies();
    }
});


// =============================================================

function loadUpMovies() {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44")
        .then(res => res.json())
        .then(data => {
            const carouselItems = document.getElementById("carousel-items-up");
            const movies = data.results;
            const sliceMovies = movies.slice(currentIndex, currentIndex + 3); // Get 3 movies starting from currentIndex

            // Clear the previous carousel items
            carouselItems.innerHTML = '';

            const itemHTML = `
                    
                        <div class="row gap-4 flex-nowrap mb-5 ">
                            ${sliceMovies.map(movie => `
                                 <div onclick="showMovieDetails(${movie.id})" class="card  mx- col-lg-4 col-md-6 col-sm-12">
                                        <img class="card-img "src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" class="d-block w-100"
                                            alt="...">
                                             <button onclick="toggleMovielist('${movie.id}', '${movie.title}', '${movie.poster_path}')" class="add-fav btn fav-card"><i class="fa-regular fa-heart"></i></button>
                                        <div class="carousel-caption text-black text-center d-none d-md-block">
                                            <h5 class="">${movie.title}</h5>
                                        </div>
                                    </div>
                            `).join('')}
                        </div>
                    
                `;
            carouselItems.innerHTML = itemHTML;
        });
}

// Load the first set of movies when the page loads
loadUpMovies();

// Update the currentIndex when navigating through the carousel
document.querySelector('.up-btn-next').addEventListener('click', () => {
    currentIndex += 3;
    loadUpMovies();
});

document.querySelector('.up-btn-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 3;
        loadUpMovies();
    }
});



// ====================================================================

function displaySearch(arr){
    console.log(arr);

    let cartona =''

    for(var i=0 ;i < arr.length ; i++){
        
        
        cartona +=  `

        


        <div class="search-holder  ">
        <div class="row d-flex  py-3 align-items-center justify-content-center ">
        <div class="card   col-lg-3 col-md-6 cil-sm-12">
            <img class="card-img "src="https://image.tmdb.org/t/p/w185/${arr[i].backdrop_path}" class="d-block w-100"
                alt="...">
                <button class="add-fav btn fav-card"><i class="fa-regular fa-heart"></i></button>
            <div class="carousel-caption text-black text-center d-none d-md-block">
                <h5 class="">${arr[i].title}</h5>
            </div>
        </div>
        </div>
    </div>
        ` 
        
        
    }

    document.querySelector(".search-place").innerHTML=cartona
}

// ====================================================================



async function getshowMovie() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data = await response.json();
    let movies = data.results;
    console.log(movies);

    let currentIndex = 0;  // Keeps track of the current movie to display

    // Initially display the first movie
    displayMovie(movies[currentIndex]);

    const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex < movies.length) {
            // Clear previous movie and display the new one
            displayMovie(movies[currentIndex]);
        } else {
            currentIndex = 0; // Loop back to the first movie
            displayMovie(movies[currentIndex]);
        }
    }, 4000);  // Change movie every 4 seconds
}

function displayMovie(movie) {
    const imgContainer = document.querySelector(".img-container");

    // Create the HTML content for the movie
    let cartona = `
        <img class="nav-img" src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="..">
        <div class="main-container text-white">
                    <p class=" movie-name fs-3 mb-2 m-0"><b>${movie.title}</b></p>
                    
                    <div class="btns">
                        <button onclick="toggleWatchlist(event, '${movie.id}', '${movie.title}', '${movie.backdrop_path}')"
 class="add-watch btn"><i class="fa-solid fa-plus"></i> Watch list</button>
                       <button onclick="toggleMovielist('${movie.id}', '${movie.title}', '${movie.backdrop_path}')" class="add-fav btn"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
    `;

    // Set the content of the img-container
    imgContainer.innerHTML = cartona;
}

getshowMovie();


// #############################################################################################################
// #############################################################################################################





var trending = document.getElementById("trending");
var popular = document.getElementById("popular");
var most = document.getElementById("most");
var up = document.getElementById("up");
var homebtn = document.getElementById("home2");
var home = document.getElementById("home");

var datatrending = document.getElementById("d-trending");
var datapopular = document.getElementById("d-popular");
var datamost = document.getElementById("d-most");
var dataup = document.getElementById("d-up");


async function getApi() {
    var res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    var data2 = await res.json();
    var movies2 = data2.results



    displayMovie2(movies2)
}
getApi()


function displayMovie2(arr) {

    console.log(arr);

    arr.sort((a, b) => b.vote_average - a.vote_average);

    let cartona = '';

    for (var i = 0; i < arr.length; i++) {

        cartona += `
        <br>
      <div class="animate__animated animate__fadeIn movie-card mb-4 m-5 p-5">
                        <div id="card" class="row item overflow-hidden animate__animated animate__fadeIn">
                            
                            <div class="col-lg-6 col-md-6 col-sm-12 cardImage animate__fadeIn">
                                <img style="width: 350px; height: 350px; border-radius: 10px;" 
                                     src="https://image.tmdb.org/t/p/w185/${arr[i].poster_path}" 
                                     class="img-fluid imm ">
                            </div>
                            
                            <div class="col-lg-6 col-md-6 col-sm-12 px-5 text-white">
                                
                                <div class="d-flex align-items-center justify-content-between">
                                    <h1 class="me-3">${arr[i].title}</h1> 
                                    <h3 class="rate d-flex align-items-center">
                                      <i class="fas fa-star text-warning"></i> ${arr[i].vote_average}/10 
                                    </h3>
                                </div>
                               
                                <p>${arr[i].overview}</p>
                                <p class="date"><span class="fst-normal">Release Date:</span> ${arr[i].release_date}</p>
                               
                                <button onclick="showMovieDetails(${arr[i].id})" class="btn btn-primary mt-3">Go to Movie</button>
                            </div>
                        </div>
                    </div>
        `;
    }

    document.querySelector("#d-trending").innerHTML = cartona;
    // ========================================================================



    arr.sort((a, b) => b.popularity - a.popularity);
    let cartona2 = '';

    for (var i = 0; i < arr.length; i++) {

        cartona2 += `
        <br>
      <div class="animate__animated animate__fadeIn movie-card container m-5 p-5 mb-4">
                        <div id="card" class="row item  overflow-hidden animate__animated animate__fadeIn">
                        
                            <div class="col-lg-6 col-md-6 col-sm-12 cardImage animate__fadeIn">
                                <img style="width: 350px; height: 350px; border-radius: 10px;" 
                                     src="https://image.tmdb.org/t/p/w185/${arr[i].poster_path}" 
                                     class="img-fluid imm ">
                            </div>
                            
                            <div class="col-lg-6 col-md-6 col-sm-12 px-5 text-white">
                          
                                <div class="d-flex align-items-center justify-content-between">
                                    <h1 class="me-3">${arr[i].title}</h1> 
                                    <h3 class="rate d-flex align-items-center">
                                      <i class="fas fa-star text-warning"></i> ${arr[i].vote_average}/10 
                                    </h3>
                                </div>
                               
                                <p>${arr[i].overview}</p>
                                <p class="date"><span class="fst-normal">Release Date:</span> ${arr[i].release_date}</p>
                                
                                <button onclick="showMovieDetails(${arr[i].id})" class="btn btn-primary mt-3">Go to Movie</button>
                            </div>
                        </div>
                    </div>
        `;
    }
    document.querySelector("#d-popular").innerHTML = cartona2;
    // ========================================================================
    arr.sort((a, b) => b.vote_count - a.vote_count);
    let cartona3 = '';
    for (var i = 0; i < arr.length; i++) {

        cartona3 += `
        <br>
      <div class="animate__animated animate__fadeIn movie-card mb-4 m-5 p-5">
                        <div id="card" class="row item overflow-hidden animate__animated animate__fadeIn">
                        
                            <div class="col-lg-6 col-md-6 col-sm-12 cardImage animate__fadeIn">
                                <img style="width: 350px; height: 350px; border-radius: 10px;" 
                                     src="https://image.tmdb.org/t/p/w185/${arr[i].poster_path}" 
                                     class="img-fluid imm ">
                            </div>
                            
                            <div class="col-lg-6 col-md-6 col-sm-12 px-5 text-white">
                                
                                <div class="d-flex align-items-center justify-content-between">
                                    <h1 class="me-3">${arr[i].title}</h1> 
                                    <h3 class="rate d-flex align-items-center">
                                      <i class="fas fa-star text-warning"></i> ${arr[i].vote_average}/10 
                                    </h3>
                                </div>
                                
                                <p>${arr[i].overview}</p>
                                <p class="date"><span class="fst-normal">Release Date:</span> ${arr[i].release_date}</p>
                                
                                <button onclick="showMovieDetails(${arr[i].id})" class="btn btn-primary mt-3">Go to Movie</button>
                            </div> 
                        </div>
                    </div>
        `;
    }
    document.querySelector("#d-most").innerHTML = cartona3;
    // ========================================================================
    arr.sort((a, b) => b.release_date - a.release_date);
    let cartona4 = '';
    for (var i = 0; i < arr.length; i++) {

        cartona4 += `
    <br>
  <div class="animate__animated animate__fadeIn movie-card mb-4 m-5 p-5">
                    <div id="card" class="row item overflow-hidden animate__animated animate__fadeIn">
                        
                        <div class="col-lg-6 col-md-6 col-sm-12 cardImage animate__fadeIn">
                            <img style="width: 350px; height: 350px; border-radius: 10px;" 
                                 src="https://image.tmdb.org/t/p/w185/${arr[i].poster_path}" 
                                 class="img-fluid imm ">
                        </div>
                        
                        <div class="col-lg-6 col-md-6 col-sm-12 px-5 text-white">

                            <div class="d-flex align-items-center justify-content-between">
                                <h1 class="me-3">${arr[i].title}</h1> 
                                <h3 class="rate d-flex align-items-center">
                                  <i class="fas fa-star text-warning"></i>  ${arr[i].vote_average}
                                </h3>
                            </div>

                            <p>${arr[i].overview}</p>
                            <p class="date"><span class="fst-normal">Release Date:</span> ${arr[i].release_date}</p>
                            
                            <button onclick="showMovieDetails(${arr[i].id})" class="btn btn-primary mt-3">Go to Movie</button>
                        </div>
                    </div>
                </div>
  `;
        document.querySelector("#d-up").innerHTML = cartona4;
    }


}

// =============================================================

async function searchMovie(term) {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`);
    let data = await response.json();
    let movies = data.results
    console.log(movies);

    displaySearch(movies);

    home.style.display = "none";
    popular.style.display = "none";
    trending.style.display = "none";
    most.style.display = "none";
    up.style.display = "none";

    datapopular.style.display = "none";
    datatrending.style.display = "none";
    datamost.style.display = "none";
    dataup.style.display = "none";


    if (searchInput.value == "") {

        home.style.display = "block";
        popular.style.display = "block";
        trending.style.display = "block";
        most.style.display = "block";
        up.style.display = "block";

    }

}
let searchInput = document.querySelector("#search")

searchInput.addEventListener("keyup", function () {
    searchMovie(searchInput.value)


})


// ========================================================================


function showpopular() {

    home.style.display = "none";
    trending.style.display = "none";
    most.style.display = "none";
    up.style.display = "none";
    popular.style.display = "block";

    datatrending.style.display = "none";
    datamost.style.display = "none";
    dataup.style.display = "none";
    datapopular.style.display = "block";

}
function showtrending() {
    home.style.display = "none";
    popular.style.display = "none";
    most.style.display = "none";
    up.style.display = "none";
    trending.style.display = "block";

    datamost.style.display = "none";
    dataup.style.display = "none";
    datapopular.style.display = "none";
    datatrending.style.display = "block";


}
function showmost() {
    home.style.display = "none";
    popular.style.display = "none";
    trending.style.display = "none";
    up.style.display = "none";
    most.style.display = "block";

    dataup.style.display = "none";
    datapopular.style.display = "none";
    datatrending.style.display = "none";
    datamost.style.display = "block";


}
function showup() {
    home.style.display = "none";
    popular.style.display = "none";
    trending.style.display = "none";
    most.style.display = "none";
    up.style.display = "block";

    datapopular.style.display = "none";
    datatrending.style.display = "none";
    datamost.style.display = "none";
    dataup.style.display = "block";

}
function showhome() {
    home.style.display = "block";
    popular.style.display = "block";
    trending.style.display = "block";
    most.style.display = "block";
    up.style.display = "block";

    datapopular.style.display = "none";
    datatrending.style.display = "none";
    datamost.style.display = "none";
    dataup.style.display = "none";

}




const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
});




toggleMovielist = function (id, title, poster_path, backdrop_path) {
    event.stopPropagation(); // This will now work as expected
    var movielist = JSON.parse(localStorage.getItem('movielist')) || [];  // bygeb al films al mt5zna fl local storage lw mfe4 byb2a array fady
    var movie = { id, title, poster_path, backdrop_path }; // byghz al object bta3 al film

    var movieFound = false; // flag to check if the movie is already in the wishlist

    // Use for loop to check if the movie is in the wishlist
    for (var i = 0; i < movielist.length; i++) {
        if (movielist[i].id === id) { // lw al id hwa hwa al mwgod fl local storage by3ml remove le al film
            // If the movie is found, remove it from the wishlist
            movielist.splice(i, 1);
            movieFound = true;
            break; // exit the loop once the item is found and removed
        }
    }

    if (movieFound) {  // condition lw fe value y3ny msh undefined 
        // If the movie was removed, update localStorage and show notification
        localStorage.setItem('movielist', JSON.stringify(movielist)); // by3ml update le local storage
        notyf.error('Movie removed from Favlist!');
    } else {
        // If the movie was not found, add it to the wishlist
        movielist.push(movie); // by3ml push le al details bta3t al film (id,title,image) fl object al e7na 3mlnah fo2 
        localStorage.setItem('movielist', JSON.stringify(movielist)); // by3ml update le local storage
        notyf.success('Movie added to Favlist!');
    }
};




// const notyf = new Notyf({
//     position: {
//         x: 'right',
//         y: 'top',
//     },
// });

toggleWatchlist = function (event, id, title, poster_path, backdrop_path) {
    event.stopPropagation(); // This will now work as expected

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
        notyf.error('Movie removed from Watchlist!');
    } else {
        // If the movie was not found, add it to the watchlist
        watchlist.push(movie); // Add movie details to the array
        localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Update localStorage
        notyf.success('Movie added to Watchlist!');
    }
};



// function getDetails(id, type) {

//     var xhr = new XMLHttpRequest();
//     xhr.open(
//       "GET",
//       `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
//       true
//     );
//     xhr.setRequestHeader("Accept", "application/json");
//     xhr.setRequestHeader(
//       "Authorization",
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2IyNzIwYTg2NDFkYjI0MjlhY2M3MDM3NDAwYjVlMSIsIm5iZiI6MTczNDY3MzA4OC40MjUsInN1YiI6IjY3NjUwMmMwYjY3ZTQ1NDcyNTVkZThkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P8DRWcm4TUCu61w1tJYUiNm5wADg7qulMAgkyq6Hc04"
//     );
//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         let result = JSON.parse(xhr.responseText);
//         console.log(result);

//         document.querySelector(
//           ".modal-overlay"
//         ).innerHTML = ` <div class="modal ${type}" w-tid="23" >
//           <button class="modal-close" onclick="closeModal()" w-tid="24">✕</button>
//           <h2 class="modal-title" w-tid="25">${result.title || result.name}</h2>
//           <p class="modal-year" w-tid="26">${
//             type != "person"
//               ? (result.release_date || result.first_air_date).substring(0, 4)
//               : result.known_for_department
//           }</p>
//                     <img src="https://image.tmdb.org/t/p/w780/${
//                       result.profile_path || result.backdrop_path
//                     }" alt="">
//           <p class="modal-description" w-tid="27">
//           ${
//             type != "person"
//               ? result.overview
//               : result.biography.split(" ").splice(0, 50).join(" ")
//           }
//           </p>
//           <div class="modal-meta" w-tid="28">
//             <div class="meta-item" w-tid="29">
//               <span class="meta-label" w-tid="30">Rating</span>
//               <span class="meta-value" w-tid="31">${result.vote_average}</span>
//             </div>
//             <div class="meta-item" w-tid="35">
//               <span class="meta-label" w-tid="36">Genre</span>
//               <span class="meta-value" w-tid="37">${
//                 type != "person"
//                   ? result.genres.map((genre) => genre.name).join(", ")
//                   : null
//               }</span>
//             </div>
//           </div>
//         </div>`;
//         document.querySelector(".modal-overlay").style.display = "grid";
//       } else {
//         console.error("Error: " + xhr.status);
//       }
//     //   loader.style.display = "none";
//     };
//     xhr.send();
//   }



function showMovieDetails(movieId) {
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
        });
}
