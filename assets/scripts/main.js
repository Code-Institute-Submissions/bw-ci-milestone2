// API sources
const APIKEY = 'fa720f307355d98a4377c670d41f97af';
const moviesUrl = 'https://api.themoviedb.org/3/search/movies?api_key=fa720f307355d98a4377c670d41f97af&query=';
const showsUrl = 'https://api.themoviedb.org/3/search/tv?api_key=fa720f307355d98a4377c670d41f97af&query='
const imgSrc = 'https://image.tmdb.org/t/p/w500';
const searchAllUrl = 'https://api.themoviedb.org/3/search/multi?api_key=fa720f307355d98a4377c670d41f97af&query='


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
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
})

// generate a container for search result and fill in the data with movieSection function

function fillSearchContainer(movies) {
    const movieDiv = document.createElement('div');
    movieDiv.setAttribute('class', 'movie-searched');
    const resultTemplate = `${movieSection(movies)}
            `;
    movieDiv.innerHTML = resultTemplate;
    return movieDiv;
}

// fill in the data to container 
// add poster path for TV Shows and exclude search by actor
// transform genre id's to corresponding strings
function movieSection(movies) {
    return movies.map((movie) => {
        return `<div>
         <img src="${imgSrc + movie.poster_path}" data-movie-id="${movie.id}" />

         <h4>${movie.title}</h4>

         <h5>${movie.genre_ids}</h5></div> `;


    })
}