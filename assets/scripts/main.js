// API sources
const APIKEY = 'fa720f307355d98a4377c670d41f97af';
const moviesUrl = 'https://api.themoviedb.org/3/search/movies?api_key=fa720f307355d98a4377c670d41f97af&query=';
const showsUrl = 'https://api.themoviedb.org/3/search/tv?api_key=fa720f307355d98a4377c670d41f97af&query='
const imgSrc = 'https://image.tmdb.org/t/p/w500';
const searchAllUrl = 'https://api.themoviedb.org/3/search/multi?api_key=fa720f307355d98a4377c670d41f97af&sort_by=popularity.desc&&query='
const upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=fa720f307355d98a4377c670d41f97af&language=en-US&page=1'
const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=fa720f307355d98a4377c670d41f97af&language=en-US&page=1'
const popularShowsUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=fa720f307355d98a4377c670d41f97af&language=en-US&page=1'
// Get data from an API using users input value

let userSearch = document.querySelector('#searchBtn');
userSearch.addEventListener('click', function (event) {
    event.preventDefault();
    const searchResult = document.querySelector('#searchResult');
    const searchInput = $('#searchInput').val();
    fetch(searchAllUrl + searchInput)
        .then((response) => response.json())
        .then((data) => {
            searchResult.innerHTML = '';
            let movies = data.results;
            let searchContainer = fillSearchContainer(movies);
            searchResult.appendChild(searchContainer);
            console.log(data)
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
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

// fill in the data to container 
// transform genre id's to corresponding strings
function searchTemplate(movies) {
    return movies.map((movie) => {
        // if statement to check if there is a poster available for a movie
        if (movie.poster_path === null) {
            return `<div class="movie-searched movie-border">
            <div class="movie-border">Click for more info</div>
            <img class="poster-img movie-border" src="assets/img/poster_placeholder.png" data-movie-id="{movie.id}"/>
            <h3 class="movie-heading">${movie.title}</h3>
            <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;
        }
        else {
            // get the title from its source whether its tv show or a movie
            if (movie.title != undefined) {
                return `<div class="movie-searched movie-border">
                <div class="movie-border">Click for more info</div>
                <img class="poster-img movie-border" src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}" />
                <h3 class="movie-heading">${movie.title.slice(0, 34)}</h3>
                <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;


            }
            // get data for TV shows and ommit search results for actors
            else if (movie.name != undefined && movie.poster_path != null) {
                return `<div class="movie-searched movie-border">
                <div class ="movie-border">Click for more info</div>
                <img class="poster-img movie-border" src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}" />
                <h3 class="movie-heading">${movie.name}</h3>
                <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;
            }


        }
    })
        // Removes a comma between search results (template literals append fix)
        .join('')
}
// fetch data for Upcoming Movies, Most Popular Shows, Most popular Movies Sections
document.addEventListener("DOMContentLoaded", function () {
    const upcomingMovies = document.querySelector('#upcomingMovies');
    const popularMovies = document.querySelector('#popularMovies');
    const popularShows = document.querySelector('#popularShows');
    fetch(upcomingUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            upcomingMovies.innerHTML = '';
            let upcomingResults = data.results;
            let getUpcoming = fillUpcomingContainer(upcomingResults);
            upcomingMovies.appendChild(getUpcoming)
        })
    fetch(popularMoviesUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            popularMovies.innerHTML = '';
            const popularMovieResults = data.results;
            const getPopularMovies = fillMovieContainer(popularMovieResults);
            popularMovies.appendChild(getPopularMovies)
        })
    fetch(popularShowsUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            popularShows.innerHTML = '';
            let popularShowsResults = data.results;
            let getPopularShows = fillShowsContainer(popularShowsResults);
            popularShows.appendChild(getPopularShows)
        })
})
function fillUpcomingContainer(upcomingResults) {
    let container = document.createElement('div');
    container.setAttribute('class', 'list-container');
    let resultTemplate = `${upcomingTemplate(upcomingResults)}`;
    container.innerHTML = `<h2 class="section-heading">Upcoming Releases</h2>` + resultTemplate;
    return container;
}
function fillMovieContainer(popularMovieResults) {
    let container = document.createElement('div');
    container.setAttribute('class', 'list-container');
    let resultTemplate = `${popularTemplate(popularMovieResults)}`;
    container.innerHTML = `<h2 class="section-heading">Most Popular Movies</h2>` + resultTemplate;
    return container;
}
function fillShowsContainer(popularShowsResults) {
    let container = document.createElement('div');
    container.setAttribute('class', 'list-container');
    let resultTemplate = `${popularTemplate(popularShowsResults)}`;
    container.innerHTML = `<h2 class="section-heading">Most Popular Shows</h2>` + resultTemplate;
    return container;
}
// function used to build a template for popular movie and popular shows columns
function popularTemplate(movies) {
    return movies.map((movie) => {
        // put placeholder img if no poster available in API
        if (movie.poster_path === null) {
            return `<div class="data-list">
            <img class="thumbnail" src="assets/img/poster_placeholder.png"/><div class ="container">
            <h3 class="list-heading">${movie.title}</h3>
            <h5 class="list-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div></div> `;
        }
        else {
            // if statement to correctly display Movie Data
            if (movie.title != undefined) {
                return `<div class="data-list">
                <img class="thumbnail" src="${imgSrc + movie.poster_path}"/><div class ="container">
                <h3 class="list-heading">${movie.title}</h3>
                <span style="display:flex">
                <h5 class="list-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5>
                <h5 class="list-info pl-4">${movie.vote_average}</h5><i class="fa fa-star ml-1"></i>
                </span>
                <h5 class="list-info">${movie.overview.slice(0, 30) + '...'}</h5><button id="moreInfo" data-movie-id="${movie.id}" class="button-info float-right">More Info</button>
                </div>
                </div> `;
            }
            // else if statement to get data for TV Show
            else if (movie.name != undefined && movie.poster_path != null) {
                return `<div class="data-list">
                <img class="thumbnail" src="${imgSrc + movie.poster_path}"/><div class ="container">
                <h3 class="list-heading">${movie.name}</h3>
                <span style="display:flex">
                <h5 class="list-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5>
                <h5 class="list-info pl-4">${movie.vote_average}</h5><i class="fa fa-star ml-1"></i>
                </span>
                <h5 class="list-info">${movie.overview.slice(0, 30) + '...'}</h5><button id="moreInfo" data-movie-id="${movie.id}" class="button-info float-right">More Info</button>
                </div>
                </div> `;
            }
        }
    })
        // Removes a comma between search results (template literals append fix)
        .join('')
}
// function used to build a template for upcoming column
function upcomingTemplate(movies) {
    return movies.map((movie) => {
        // put placeholder img if no poster available in API
        if (movie.poster_path === null) {
            return `<div class="data-list">
            <img class="thumbnail" src="assets/img/poster_placeholder.png"/><div class ="container">
            <h3 class="list-heading">${movie.title}</h3>
            <h5 class="list-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5>
            <h5 class="list-info">${movie.overview}</h5><h5 class="list-info">${movie.popularity}</h5><button id="moreInfo" data-movie-id="${movie.id}" class="button-info float-right">More Info</button></div></div> `;
        }
        else {
            return `<div class="data-list">
                <img class="thumbnail" src="${imgSrc + movie.poster_path}"/><div class ="container">
                <h3 class="list-heading">${movie.title}</h3>
                <span style="display:flex">
                <h5 class="list-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5>
                <h5 class="list-info pl-4">${movie.release_date}</h5>
                </span>
                <h5 class="list-info">${movie.overview.slice(0, 30) + '...'}</h5><button id="moreInfo" data-movie-id="${movie.id}" class="button-info float-right">More Info</button>
                </div>
                </div> `;
        }
    }
    )
        // Removes a comma between search results (template literals append fix)
        .join('')
}

const infoModal = document.querySelector("#infoModal");
// selecting a movie opens up a new tab with all the movie ////details 
document.onclick = function () {
    console.log(event)
    const target = event.target;
    const movieId = target.dataset.movieId;
    const getDetailUrl = `https://api.themoviedb.org/3/movie/` + movieId + `?api_key=fa720f307355d98a4377c670d41f97af&append_to_response=videos,images`
    console.log(movieId)
    fetch(getDetailUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            infoModal.innerHTML = '';
            const movieDetailed = data;
            infoModal.appendChild(getDetail(movieDetailed));
        });
    let moreInfoBtn = document.getElementById("moreInfo");

    moreInfoBtn.onclick = function () {
        infoModal.style.display = "block";
    }
    function getDetail(movieDetailed) {
        let modalBox = document.createElement('div');
        modalBox.setAttribute('class', 'modal-content');
        modalBox.innerHTML = `<h2>movie.detailed.title ${movieDetailed.title}</h2>`
        return modalBox
    }
};

