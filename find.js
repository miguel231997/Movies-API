const API_KEY = '281b22fb';

function getQueryParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('query');
}

function updateYearDisplay(val) {
    document.getElementById('yearDisplay').textContent = val;
  
    const query = document.getElementById('searchBox').value.trim();
    if (query) {
      searchMovies();
    }
  }

function handleSearch() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('hidden');
    setTimeout(() => {
      window.location.href = 'find.html?query=' + document.getElementById('searchInput').value;
    }, 1000);
  }

async function searchMovies() {
  const query = document.getElementById('searchBox').value || getQueryParam();
  const year = document.getElementById('yearRange').value;
  const loader = document.querySelector('.loader');
  const resultsContainer = document.getElementById('movieResults');

  loader.classList.remove('hidden');
  resultsContainer.innerHTML = '';

  setTimeout(async () => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&y=${year}`);
    const data = await res.json();
    loader.classList.add('hidden');

    if (data.Response === 'True') {
        resultsContainer.innerHTML = data.Search
        .slice(0, 6)
        .map(movie => `
            <div class="movie" onclick="goToMovie('${movie.imdbID}')">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" />
            <div class="movie__info">
                <h4>${movie.Title}</h4>
                <p>Year: ${movie.Year}</p>
            </div>
            </div>
        `).join('');
      } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      }
  }, 1000);
}

window.onload = () => {
  const query = getQueryParam();
  if (query) {
    document.getElementById('searchBox').value = query;
    searchMovies();
  }
};

function goToMovie(imdbID) {
    localStorage.setItem("movieId", imdbID);
    window.location.href = "movie.html";
  }