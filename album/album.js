const parametro = new URLSearchParams(window.location.search);
const albumId = parametro.get("id");
const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`

fetch(url + albumId)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    canzoni = data.data;
   
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
</div>` 
// TO DO FOR EACH
let brano = document.createElement("div");
brano.classList("top-canzoni","d-flex","justify-content-between");
brano.innerHTML=`
<div class="d-flex ms-3">
                <h6><span class="me-2">#</span>TITOLO</h6>
              </div>
              <div class="d-flex ms-5">
                <h6>11111</h6>
              </div>
              <div class="d-flex">
                <i class="bi bi-clock me-5"></i>
              </div>
            </div>




`
  })

