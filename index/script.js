const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`
const contenuto = document.getElementById("songCarousel")

const artisti= ["eminem", "queen", "metallica", "lazza", "oasis", "Pink"]
const index= Math.floor(Math.random() * (artisti.length - 0));

fetch(url+artisti[index])
  .then(response => response.json())  // Converte la risposta in JSON
  .then(braniOttenuti => {let canzoni = braniOttenuti.data
    let i=0;
    canzoni.forEach(canzone => {
      i++;
     
      let card = document.createElement("div");
      card.classList.add("carousel-item");
      if(i===1) {
        card.classList.add("active");
      }
      card.innerHTML = `
      <div class="d-flex">
      <a href="/album/album.html?id=${canzone.album.title}"><img class="album-img" src="${canzone.album.cover}" alt="${canzone.title}"></a>
        <div class="card-body">
          <p>Album</p>
          <h1 class="song-title" >${canzone.title}</h1>
          <p class="mb-4 artist-name" >${canzone.artist.name}</p>
          <p class="mb-4">Ascolta il nuovo singolo di ${canzone.artist.name}</p>
          <div>
            <button type="button" class="btn btn-success" onclick="visible('${canzone.album.cover}', '${canzone.title}','${canzone.artist.name}')">Play</button>
            <button type="button" class="btn btn-dark">Salva</button>
            <i class="bi bi-three-dots"></i>
          </div>
        </div>
      </div>
        `;
      contenuto.appendChild(card);

  let artistName = card.querySelector('.artist-name');
  artistName.onclick = () => {
  // Assicurarsi che "canzone.artist.id" esista e contenga l'ID corretto
  window.location = `../artist/artist.html?artistId=${canzone.artist.id}`;
};
    });
  })
    


  // Stampa i dati nella console
  .catch(error => console.error('Errore nella fetch:', error)); // Gestisce eventuali errori

  // gestisco il cambio testo del bottone che consente di collassare il carosello con gli annunci
  document.addEventListener('DOMContentLoaded', function() {
    var collapseElement = document.getElementById('carouselcollapse');
    var button = document.getElementById('carouselToggle');

    // Aggiorno il testo in base allo stato iniziale del collapse
    if (collapseElement.classList.contains('show')) {
        button.textContent = 'NASCONDI ANNUNCI';
    } else {
        button.textContent = 'MOSTRA ANNUNCI';
    }

    // Ascoltatore per il cambiamento di stato del collapse
    collapseElement.addEventListener('show.bs.collapse', function () {
        button.textContent = 'NASCONDI ANNUNCI';
    });

    collapseElement.addEventListener('hide.bs.collapse', function () {
        button.textContent = 'MOSTRA ANNUNCI';
    });

});



// punto il bottone
var btn = document.querySelector('.colapse-sidebr-btn');

// Variabile per tenere traccia del timer
var timer;

// Aggiungo un gestore per l'evento 'mouseenter'
btn.addEventListener('mouseenter', function() {
  // Cancello eventuali timer esistenti
  clearTimeout(timer);

  // Imposto un timer per cambiare il display dopo 400 millisecondi
  timer = setTimeout(function() {
    btn.querySelector('.bi').style.display = 'block';
  }, 400);
});

// Aggiungo un gestore per l'evento 'mouseleave'
btn.addEventListener('mouseleave', function() {
  // Cancello il timer quando il mouse lascia il bottone
  clearTimeout(timer);

  // Rimuovo immediatamente l'icona quando il mouse lascia il bottone
  btn.querySelector('.bi').style.display = 'none';
});



function visible (img, titleSong, nameArtist) {
  const playNav= document.getElementById("play-nav");
  playNav.classList.add("nav-visible")

  const songArtist= document.getElementById("song-artist");
  songArtist.textContent= `${titleSong} by ${nameArtist}`;
  const songPlay= document.getElementById("song-play");
  songPlay.innerHTML= `
    <div class="d-flex gap-3 align-items-center w-25">
      <div>
        <img src="${img}" alt="cover ${titleSong}" width="50" class="album-cover"></div>
        <div style ="max-width:180px">
            <h6 class="text-white song-title fs-6">${titleSong}</h6>
            <h6 class="text-secondary artist-name">${nameArtist}</h6>
        </div>
      <div>
      <i class="bi bi-heart ms-4 fs-5"></i></div>
    </div>
            `;
}