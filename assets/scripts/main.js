// API sources
const APIKEY = 'fa720f307355d98a4377c670d41f97af';
const moviesUrl = 'https://api.themoviedb.org/3/search/movies?api_key=fa720f307355d98a4377c670d41f97af&query=';
const showsUrl = 'https://api.themoviedb.org/3/search/tv?api_key=fa720f307355d98a4377c670d41f97af&query='
const imgSrc = 'https://image.tmdb.org/t/p/w500';
const searchAllUrl = 'https://api.themoviedb.org/3/search/multi?api_key=fa720f307355d98a4377c670d41f97af&sort_by=popularity.desc&&query='


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
    const movieDiv = document.createElement('div');
    movieDiv.setAttribute('class', 'result-container');
    const resultTemplate = `${movieSection(movies)}`;
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
            return `<div class="movie-searched"><img class="poster-img" src="assets/img/poster_placeholder.png" data-movie-id="{movie.id}"/>
            <h3 class="movie-heading">${movie.title}</h3>
            <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;
        }
        else {
            // get the title from its source whether its tv show or a movie
            if (movie.title != undefined) {
                return `<div class="movie-searched">
                <img class="poster-img" src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}" /><div>Click for more info</div>
                    <h3 class="movie-heading">${movie.title}</h3>
                    <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;


            }
            // get data for TV shows and ommit search results for actors
            else if (movie.name != undefined && movie.poster_path != null) {
                return `<div class="movie-searched">
            <img class="poster-img" src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}" />
            <h3 class="movie-heading">${movie.name}</h3>
            <h5 class="movie-info">${movie.popularity + 'k <span><i class="fa fa-eye"></i></span>'}</h5></div> `;
            }


        }
    })
        // Removes a comma between search results (template literals append fix)
        .join('')
}