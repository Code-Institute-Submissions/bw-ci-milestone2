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
$('#searchBtn').on('click', (event) => {
    event.preventDefault();
    const searchResult = document.querySelector('#searchResult');
    const searchInput = $('#searchInput').val();

    fetch(searchAllUrl + searchInput)
        .then((response) => response.json())
        .then((data) => {
            searchResult.innerHTML = '';
            const movies = data.results;
            const searchContainer = fillSearchContainer(movies);
            searchResult.appendChild(searchContainer);
            console.log(data)
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
})

// generate a container for search result and fill in the data with movieSection function

function fillSearchContainer(movies) {
    let movieDiv = document.createElement('div');
    movieDiv.setAttribute('class', 'result-container');
    let resultTemplate = `${movieSection(movies)}`;
    movieDiv.innerHTML = resultTemplate;
    return movieDiv;
}

// fill in the data to container 
// add poster path for TV Shows and exclude search by actor
// transform genre id's to corresponding strings
function movieSection(movies) {
    return movies.map((movie) => {
        // if statement to check if there is a poster available for a movie
        if (movie.poster_path === null) {
            return `<div class="movie-searched movie-border"><div class="movie-border">Click for more info</div><img class="poster-img movie-border" src="assets/img/poster_placeholder.png" data-movie-id="{movie.id}"/>
            <h3 class="movie-heading">${movie.title}</h3>
            <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;
        }
        else {
            // get the title from its source whether its tv show or a movie
            if (movie.title != undefined) {
                return `<div class="movie-searched movie-border"><div class="movie-border">Click for more info</div>
                <img class="poster-img movie-border" src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}" />
                    <h3 class="movie-heading">${movie.title}</h3>
                    <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;


            }
            // get data for TV shows and ommit search results for actors
            else if (movie.name != undefined && movie.poster_path != null) {
                return `<div class="movie-searched movie-border"><div class ="movie-border">Click for more info</div>
            <img class="poster-img movie-border" src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}" />
            <h3 class="movie-heading">${movie.name}</h3>
            <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;
            }


        }
    })
        // Removes a comma between search results (template literals append fix)
        .join('')
}
$(document).ready(() => {
    const upcomingMovies = document.querySelector('#upcomingMovies');
    const popularMovies = document.querySelector('#popularMovies');
    const popularShows = document.querySelector('#popularShows');
    fetch(upcomingUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            upcomingMovies.innerHTML = '';
            const upcomingResults = data.results;
            const getUpcoming = fillUpcomingContainer(upcomingResults);
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
            const popularShowsResults = data.results;
            const getPopularShows = fillShowsContainer(popularShowsResults);
            popularShows.appendChild(getPopularShows)
        })
})
function fillUpcomingContainer(upcomingResults) {
    let upcomingDiv = document.createElement('div');
    upcomingDiv.setAttribute('class', 'upcoming-container');
    let resultTemplate = `${movieSection(upcomingResults)}`;
    upcomingDiv.innerHTML = resultTemplate;
    return upcomingDiv;
}
function fillMovieContainer(popularMovieResults) {
    let popularMovieDiv = document.createElement('div');
    popularMovieDiv.setAttribute('class', 'movie-popular-container');
    let resultTemplate = `${movieSection(popularMovieResults)}`;
    popularMovieDiv.innerHTML = resultTemplate;
    return popularMovieDiv;
}
function fillShowsContainer(popularShowsResults) {
    let popularShowsDiv = document.createElement('div');
    popularShowsDiv.setAttribute('class', 'shows-popular-container');
    let resultTemplate = `${movieSection(popularShowsResults)}`;
    popularShowsDiv.innerHTML = resultTemplate;
    return popularShowsDiv;
}