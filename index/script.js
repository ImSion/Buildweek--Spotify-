const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`
const contenuto = document.getElementById("songCarousel")

const artisti= ["eminem", "salmo", "metallica", "lazza", "oasis"]
const index= Math.floor(Math.random() * (artisti.length - 0));

fetch(url+artisti[index])
  .then(response => response.json())  // Converte la risposta in JSON
  .then(braniOttenuti => {let canzoni = braniOttenuti.data
    let i=0;
    let active;
    canzoni.forEach(canzone => {
      i++;
     
      let card = document.createElement("div");
      card.classList.add("carousel-item");
      if(i===1) {
        card.classList.add("active");
      }
      card.innerHTML = `
      <div class="d-flex">
          <img class="album-img" src="${canzone.album.cover}" alt="${canzone.title}">
        <div class="card-body">
          <p>Album</p>
          <h1 class="song-title" >${canzone.title}</h1>
          <p class="mb-4">${canzone.artist.name}</p>
          <p class="mb-4">Ascolta il nuovo singolo di ${canzone.artist.name}</p>
          <div>
            <button type="button" class="btn btn-success">Play</button>
            <button type="button" class="btn btn-dark">Salva</button>
            <i class="bi bi-three-dots"></i>
          </div>
        </div>
      </div>
        `;
      contenuto.appendChild(card);

    });
  }
    


    )    // Stampa i dati nella console
  .catch(error => console.error('Errore nella fetch:', error)); // Gestisce eventuali errori

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