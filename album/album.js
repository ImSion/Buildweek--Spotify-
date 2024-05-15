const parametro = new URLSearchParams(window.location.search);
const albumId = parametro.get("id");
const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`

fetch(url + albumId)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    canzoni = data.data

    let card = document.getElementById('album-contents');
    card.innerHTML = `
    <div id="cover-album">
    <img class="album-img" src="${canzoni[0].album.cover}" alt="">
    <div class="album-texts">
        <h1 class="category">ALBUM</h1>
        <h1 id="album-title">${canzoni[0].album.title}</h1>
        <div id="album-artist">
            <img class="album-img" src="${canzoni[0].album.cover}" alt="">
            <h3 id="artist">${canzoni[0].artist.name}</h3>
            <h3 id="tracks">12 brani</h3>
        </div>
    </div>
</div>`
  })
