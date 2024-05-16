const parametro = new URLSearchParams(window.location.search);
const albumId = parametro.get("id");
const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;

fetch(url + albumId)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const canzoni = data.data;

    let card = document.getElementById('album-contents');
    card.innerHTML = `
    <div id="cover-album" class="d-flex">
      <img class="album-img" src="${canzoni[0].album.cover}" alt="${canzoni[0].album.title}">
      <div class="album-texts">
        <p class="category">ALBUM</p>
        <h1 id="album-title" class="mb-3">${canzoni[0].album.title}</h1>
        <div id="album-artist" class="d-flex gap-1">
          <img class="album-img1" src="${canzoni[0].album.cover}" alt="${canzoni[0].album.title}">
          <h3 id="artist">${canzoni[0].artist.name} ·</h3>
          <h3 id="tracks">${canzoni.length} Brani</h3>
        </div>
      </div>
    </div>`;

    let listaCanzoni = document.querySelector(".listSongs");

    // Clear previous contents if any
    listaCanzoni.innerHTML = '';

    // Loop through each song and create the necessary HTML
    canzoni.forEach((brano, index) => {
      let songDiv = document.createElement("div");
      songDiv.classList.add("canzoni", "row");

      // Convert duration from seconds to mm:ss format
      let minutes = Math.floor(brano.duration / 60);
      let seconds = brano.duration % 60;
      let duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      // Format rank with thousands separator
      let formattedRank = brano.rank.toLocaleString();

      if (window.innerWidth >= 1200) {
        songDiv.innerHTML = `
          <div class="col-5 col-md-7 col-lg-8 d-flex">
            <h6 class="me-2">${index + 1}</h6>
            <p class="overflow-ellipsis">${brano.title}</p>
          </div>
          <div class="col-3 col-md-2 col-lg-2">
            <h6>${formattedRank}</h6>
          </div>
          <div class="col-2 col-md-3 col-lg-2">
            ${duration}
          </div>`;
      } else {
        songDiv.innerHTML = `
          <div id="rowSong" class="col-7 col-md-7 d-flex">
            <p class="overflow-ellipsis">${brano.title}</p>
            <img src="/assets/more-vertical.svg" alt="">
          </div>`;
      }

      listaCanzoni.appendChild(songDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching the data:', error);
  });

// Listener per rilevare il ridimensionamento della viewport
window.addEventListener('resize', () => {
  // Ricarica la pagina per applicare i cambiamenti
  window.location.reload();
});

