const API_KEY = '281b22fb';
const movieId = localStorage.getItem("movieId");
const movieDetailsEl = document.getElementById("movieDetails");

async function loadMovie() {
  if (!movieId) {
    movieDetailsEl.innerHTML = "<p>No movie selected.</p>";
    return;
  }

  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
  const data = await res.json();

  if (data.Response === 'True') {
    movieDetailsEl.innerHTML = `
      <div class="movie__details--card">
        <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/150'}" alt="${data.Title}" />
        <div class="movie__info">
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Director:</strong> ${data.Director}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
        </div>
      </div>
    `;
  } else {
    movieDetailsEl.innerHTML = "<p>Movie not found.</p>";
  }
}

loadMovie();