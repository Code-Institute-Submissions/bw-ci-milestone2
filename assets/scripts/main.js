// API sources
const APIKEY = 'fa720f307355d98a4377c670d41f97af';
const imgSrc = 'https://image.tmdb.org/t/p/w500';
const searchAllUrl = 'https://api.themoviedb.org/3/search/multi?api_key=' + APIKEY + '&sort_by=popularity.desc&&query='
const featuredUrl = 'https://api.themoviedb.org/3/trending/movie/week?api_key=' + APIKEY + ''
const upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + APIKEY + '&language=en-US&page=1'
const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + APIKEY + '&language=en-US&page=1'
const popularShowsUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=' + APIKEY + '&language=en-US&page=1'

// Get data from an API using users input value
let userSearch = document.querySelector('#searchBtn');
userSearch.addEventListener('click', function (event) {
    event.preventDefault();
    const searchResult = document.querySelector('#searchResult');
    searchResult.style.display = "block"
    const searchInput = $('#searchInput').val();
    fetch(searchAllUrl + searchInput)
        .then((response) => response.json())
        .then((data) => {
            searchResult.innerHTML = '';
            let movies = data.results;
            let searchContainer = fillSearchContainer(movies);
            searchResult.appendChild(searchContainer);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    // Hide featured container when user searches for a movie
    let featuredDiv = document.querySelector("#featuredWrapper");
    featuredDiv.style.display = 'none';
})

// generate a container for search result and fill in the data with movieSection function
function fillSearchContainer(movies) {
    let movieDiv = document.createElement('div');
    movieDiv.setAttribute('class', 'result-container');
    let resultTemplate = `${searchTemplate(movies)}`;
    movieDiv.innerHTML = resultTemplate;
    return movieDiv;
}

// generate template for search results after users input to the search bar
function searchTemplate(movies) {
    return movies.map((movie) => {
        // if statement to check if there is a poster available for a movie
        if (movie.poster_path === null) {
            return `<div class="movie-searched movie-border">
            <div class="movie-border">Click for more info</div>
            <img class="poster-img redirect-imdb movie-border" src="assets/img/poster_placeholder.png"
            <h3 class="movie-heading">${movie.title}</h3>
            <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;
        }
        else {
            // get the title from its source whether its tv show or a movie
            if (movie.title != undefined) {
                return `<div class="movie-searched movie-border">
                <div class="movie-border">Click for more info</div>
                <img class="poster-img redirect-imdb movie-border" src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}"
                <h3 class="movie-heading">${movie.title.slice(0, 34)}</h3>
                <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;


            }
            // get data for TV shows and ommit search results for actors
            else if (movie.name != undefined && movie.poster_path != null) {
                return `<div class="movie-searched movie-border">
                <div class ="movie-border">Click for more info</div>
                <img class="poster-img redirect-imdb movie-border" src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}"
                <h3 class="movie-heading">${movie.name}</h3>
                <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;
            }


        }
    })
        // Removes a comma between search results (template literals append fix)
        .join('')
}

// fetch data from different API sources and display Landing Page content
document.addEventListener("DOMContentLoaded", function (event) {
    const upcomingMovies = document.querySelector('#upcomingMovies');
    const popularMovies = document.querySelector('#popularMovies');
    const popularShows = document.querySelector('#popularShows');
    event.preventDefault();
    // Fetch Data for Upcoming Column, assign results and append to HTML section
    fetch(upcomingUrl)
        .then((response) => response.json())
        .then((data) => {
            upcomingMovies.innerHTML = '';
            let upcomingResults = data.results;
            let getUpcoming = createUpcomingContainer(upcomingResults);
            upcomingMovies.appendChild(getUpcoming)
        })
    // Fetch Data for Popular Movier Column, assign results and append to HTML section
    fetch(popularMoviesUrl)
        .then((response) => response.json())
        .then((data) => {
            popularMovies.innerHTML = '';
            const popularMovieResults = data.results;
            const getPopularMovies = createMovieContainer(popularMovieResults);
            popularMovies.appendChild(getPopularMovies)
        })
    // Fetch Data for Popular Shows Column, assign results and append to HTML section
    fetch(popularShowsUrl)
        .then((response) => response.json())
        .then((data) => {
            popularShows.innerHTML = '';
            let popularShowsResults = data.results;
            let getPopularShows = createShowsContainer(popularShowsResults);
            popularShows.appendChild(getPopularShows)
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    // Fetch Data for Featured Movie hero area, assign results and append to HTML section
    // Fetches from Trending and generates random object from array
    fetch(featuredUrl)
        .then((response) => response.json())
        .then((data) => {
            let featuredResults = data.results;
            //select random from the featuredResults array
            let randomResult = featuredResults[Math.floor(Math.random() * featuredResults.length)];
            changeUrl(randomResult)
        })
})

//Takes randomly selected item from Trending and fetches it by id to another API call ( allows appending videos and images)
function changeUrl(randomResult) {
    let id = randomResult.id;
    const featured = document.querySelector('#featuredContainer');
    const getDetails = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US&append_to_response=videos,images`
    fetch(getDetails)
        .then((response) => response.json())
        .then((data) => {
            let detailedRandom = data;

            featured.innerHTML = '';
            trailerContainer.innerHTML = '';
            let getFeatured = createFeaturedContainer(detailedRandom);
            featured.appendChild(getFeatured)
        })
}

// creates the content of Featured container using detailed random trending movie data
function createFeaturedContainer(detailedRandom) {
    let imgPath = `${imgSrc + detailedRandom.backdrop_path}`;
    let container = document.createElement('div');
    container.setAttribute('class', 'featured');
    container.setAttribute('id', 'featured');
    container.style.backgroundImage = 'url(' + imgPath + ')';

    let content = `
    <div class="featured-content">
        <div class="poster">
            <img class="featured-poster" src="${imgSrc + detailedRandom.poster_path}"/>
        </div>

        <div class ="movie-overview">
            <h2>${detailedRandom.title}</h2>
            <p class="overview-content">${detailedRandom.tagline}</p>
            <div style="display:flex; flex-direction: row; 
            justify-content: space-between">
                <span><i class="fa fa-film"></i></span><p class="overview-content">${detailedRandom.release_date}</p>
                <span><i class="fa fa-eye"></i></span><p class="overview-content">${detailedRandom.popularity}</p>
                <span><i class="fa fa-star"></i></span><p class="overview-content">${detailedRandom.vote_average}</p>
                <span><i class="fa fa-theater-masks"></i></span><p class="overview-content">${detailedRandom.genres[0].name}, ${detailedRandom.genres[1].name}</p>
            </div>
            <p class="overview-content slide">${detailedRandom.overview}</p>
            <div class ="featured-external">
            <ul class="movie-links">
                <li><a class="button-info" href="https://www.imdb.com/title/${detailedRandom.imdb_id}/" target="_blank">IMDB</a></li>
                <li><a class="button-info" href="${detailedRandom.homepage}" target="_blank">Official Site</a></li>
            </ul>
            <img src="https://img.youtube.com/vi/${detailedRandom.videos.results[0].key}/default.jpg" class="iframe-thumbnail"
            data-toggle="modal" data-target="#fullscreenModal" data-src="https://www.youtube.com/embed/${detailedRandom.videos.results[0].key}">

            </div>
        </div>
    </div>`;
    container.innerHTML = content;
    return container;
}
// Function to create container for Upcoming data results and get the template for html/css
function createUpcomingContainer(upcomingResults) {
    let container = document.createElement('div');
    container.setAttribute('class', 'list-container');
    let resultTemplate = `${upcomingTemplate(upcomingResults)} `;
    container.innerHTML = `<h2 id="upcomingHeading" class="section-heading">Upcoming Releases</h2>` + `<div id="columnUpcoming">` + resultTemplate + `</div>`;
    return container;
}

// Function to create container for Popular Movies data results and get the template for html/css
function createMovieContainer(popularMovieResults) {
    let container = document.createElement('div');
    container.setAttribute('class', 'list-container');
    let resultTemplate = `${popularTemplate(popularMovieResults)} `;
    container.innerHTML = `<h2 id="headingMovies" class="section-heading">Most Popular Movies</h2>` + `<div id="columnMovies">` + resultTemplate + `</div>`;
    return container;
}

// Function to create container for Popular Shows data results and get the template for html/css
function createShowsContainer(popularShowsResults) {
    let container = document.createElement('div');
    container.setAttribute('class', 'list-container');
    let resultTemplate = `${popularTemplate(popularShowsResults)} `;
    container.innerHTML = `<h2 id="headingShows" class="section-heading">Most Popular Shows</h2> ` + `<div id="columnShows">` + resultTemplate + `</div>`;
    return container;
}

// function used to build a template for popular movie and popular shows columns
function popularTemplate(popularShowsResults) {
    return popularShowsResults.slice(0, 5).map((movie) => {
        // put placeholder img if no poster available in API
        if (movie.poster_path === null) {
            return `
            <div class="data-list">
                <img class="thumbnail" src="assets/img/poster_placeholder.png"/>
                <div class="container">
                    <h3 class="list-heading">${movie.title}</h3>
                    <p class="list-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</p>
                </div>
            </div>`;
        }
        else {
            // if statement to correctly display Movie Data
            if (movie.title != undefined) {
                return `
                <div class="data-list">
                    <img class="thumbnail" src="${imgSrc + movie.poster_path}"/>
                    <div class="container">
                        <h3 class="list-heading">${movie.title}</h3>
                        <span style="display:flex">
                            <p>${'<span><i class="fa fa-eye"></i></span> ' + movie.popularity + 'k'}</ p>
                            <p class="pl-2">${'<i class="fa fa-star ml-1"></i>' + ' ' + movie.vote_average}</p>
                        </span>
                        <p class="list-info" style="line-height: 1.2; margin-bottom: 1rem;">${movie.overview.slice(0, 70) + '...'}</p>
                        <button id="moreInfo" data-movie-id="${movie.id}"  class="button-movie button-info float-right" data-toggle="modal" data-target="#moreInfoModal">More Info</button>
                    </div>
                </div>`;
            }
            // else if statement to get data for TV Show
            else if (movie.name != undefined && movie.poster_path != null) {
                return `
                <div class="data-list">
                    <img class="thumbnail" src="${imgSrc + movie.poster_path}"/>
                    <div class="container">
                    <h3 class="list-heading">${movie.name.slice(0, 20)}</h3>
                    <span style="display:flex">
                        <p>${'<span><i class="fa fa-eye"></i></span> ' + movie.popularity + 'k'}</p>
                        <p class="pl-4">${'<i class="fa fa-star ml-1"></i>' + ' ' + movie.vote_average}</p>
                    </span>
                    <p class="list-info" style="line-height: 1.2; margin-bottom: 1rem;">${movie.overview.slice(0, 70) + '...'}</p>
                    <button id="moreInfo" data-movie-id="${movie.id}" class="button-tv button-info float-right" data-toggle="modal" data-target="#moreInfoModal">More Info</button>
                    </div>
                </div>`;
            }
        }
    })
        // Removes a comma between search results (template literals append fix)
        .join('')
}

// creates template for 3rd(upcoming releases) column 
function upcomingTemplate(upcomingResults) {
    return upcomingResults.slice(0, 5).map((movie) => {
        // put placeholder img if no poster available in API
        if (movie.poster_path === null) {
            return `
            <div class="data-list">
                <img class="thumbnail" src="assets/img/poster_placeholder.png" />
                <div class="container">
                    <h3 class="list-heading">${movie.title}</h3>
                    <p class="list-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</p>
                    <p class="list-info" style="line-height: 1.2;margin-bottom: 1rem;">${movie.overview.slice(0, 70) + '...'}</p>
                    <button id="moreInfo" data-movie-id="${movie.id}" class="button-movie button-info float-right" data-toggle="modal" data-target="#moreInfoModal">More Info</button>
                </div>
            </div> `;
        }
        else {
            return `
            <div class="data-list" >
                <img class="thumbnail" src="${imgSrc + movie.poster_path}" />
                <div class="container">
                    <h3 class="list-heading">${movie.title}</h3>
                    <span style="display:flex">
                    <p>${'<span><i class="fa fa-eye"></i></span> ' + movie.popularity + 'k'}</p>
                    <p class="pl-2">${'<span><i class="fa fa-film"></i></span> ' + movie.release_date}</p>
                    </span>
                    <p class="list-info" style="line-height: 1.2;margin-bottom: 1rem;">${movie.overview.slice(0, 70) + '...'}</p>
                    <button id="moreInfo" data-movie-id="${movie.id}" class="button-movie button-info float-right" data-toggle="modal" data-target="#moreInfoModal">More Info</button>
                </div>
            </div>`;
        }
    }

    )
        // Removes a comma between search results (template literals append fix)
        .join('')
}

//hides the column when clicked on Column Heading ( mobile device UX )
window.onload = setTimeout(function () {
    if (window.innerWidth < 767) {
        document.querySelector('#headingMovies').addEventListener('click', function () {
            let column1 = document.getElementById('columnMovies');
            if (column1.style.display === "none") {
                column1.style.display = "block";
            }
            else {
                column1.style.display = "none";
            }

        })

        document.querySelector('#headingShows').addEventListener('click', function () {
            let column2 = document.getElementById('columnShows');
            if (column2.style.display === "none") {
                column2.style.display = "block";
            }
            else {
                column2.style.display = "none";
            }

        })

        document.querySelector('#upcomingMovies').addEventListener('click', function () {
            let column3 = document.getElementById('columnUpcoming');
            if (column3.style.display === "none") {
                column3.style.display = "block";
            }
            else {
                column3.style.display = "none";
            }

        })
    }
}, 2500);

// On clicking 'More Info'  in the 1st and 3rd columns(movie data fetch) displays modal with details
function movieMoreInfoContent(movie) {
    let container = document.createElement("div")

    container.setAttribute('class', 'modal-content');
    container.innerHTML = `
    <div class="modal-header">
        <div class="modal-title">
            <h2>${movie.title}</h2>
        </div>
        <button type="button" class="close" data-dismiss="modal"        aria-label="Close">
        <span aria-hidden="true">X</span>
        </button>
    </div>
        <div class="modal-top">
    <img class="thumbnail" src="${imgSrc + movie.poster_path}"/>
    <div class="modal-items">
    <p>${movie.genres[0].name}</p>
    <p>${movie.popularity}</p>
    <p>${movie.vote_average}</p>
    <p>${movie.release_date}</p>
    <p>${movie.runtime}</p>
    </div>
    </div>

    <p>${movie.overview}</p>
    
    <iframe src="https://www.youtube.com/embed/${movie.videos.results[0].key}" frameborder="0" allow="picture-in-picture"  allowfullscreen></iframe>
`;
    return container;
}

// Fetches data for function movieMoreInfoContent
window.onload = setTimeout(function getInfoForEachMovieButton() {

    let buttonsMovie = document.getElementsByClassName("button-movie");
    let detailedContainer = document.getElementById("detailedContainer");
    let getMovieId = function () {
        let movieId = this.getAttribute("data-movie-id");
        fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + APIKEY + '&append_to_response=videos,images')

            .then((response) => response.json())
            .then((data) => {
                let movie = data;

                detailedContainer.innerHTML = '';
                let moreInfoContent = movieMoreInfoContent(movie);
                detailedContainer.appendChild(moreInfoContent)
            }
            )

    };


    Array.from(buttonsMovie).forEach(function (button) {
        button.addEventListener('click', getMovieId, function () {
        });
    });

}, 2500);

// on clicking 'More Info' in the middle column (TV data fetch) displays modal with details
function tvMoreInfoContent(tv) {
    let container = document.createElement("div")

    container.setAttribute('class', 'modal-content');
    container.innerHTML = `
    <div class="modal-header">
        <div class="modal-title">
            <h2>${tv.name}</h2>
        </div>
        <button type="button" class="close" data-dismiss="modal"        aria-label="Close">
        <span aria-hidden="true">X</span>
        </button>
    </div>
        <div class="modal-top">
    <img class="thumbnail" src="${imgSrc + tv.poster_path}"/>
    <div class="modal-items">
    <p>${tv.genres[0].name}</p>
    <p>${tv.popularity}</p>
    <p>${tv.vote_average}</p>
    <p>${tv.number_of_seasons} Seasons</p>
    <p>${tv.number_of_episodes} Episodes</p>
    </div>
    </div>

    <p>${tv.overview}</p>
    
    <iframe data-toggle="modal" data-target="#ytModal" src="https://www.youtube.com/embed/${tv.videos.results[0].key}" frameborder="0" allow="picture-in-picture"  allowfullscreen></iframe>
`;
    return container;
}

// Fetches data for function tvMoreInfoContent
window.onload = setTimeout(function getInfoForEachTvButton() {

    let buttonsTv = document.getElementsByClassName("button-tv");
    let detailedContainer = document.getElementById("detailedContainer");
    let getTvId = function () {
        let movieId = this.getAttribute("data-movie-id");
        fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${APIKEY}&append_to_response=videos,images`)

            .then((response) => response.json())
            .then((data) => {
                let tv = data;

                detailedContainer.innerHTML = '';
                let moreInfoContent = tvMoreInfoContent(tv);
                detailedContainer.appendChild(moreInfoContent)
            }
            )

    };


    Array.from(buttonsTv).forEach(function (button) {
        button.addEventListener('click', getTvId, function () {
        });
    });

}, 2500);

//User experience addition. display trailer in fullscreen modal