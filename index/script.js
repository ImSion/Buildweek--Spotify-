const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`
const contenuto = document.getElementById("carouselExampleSlidesOnly")

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
          <img src="${canzone.album.cover}" alt="${canzone.title}" style="width: 250px;">
        <div class="card-body">
          <p>Album</p>
          <h1>${canzone.title}</h1>
          <p>${canzone.artist.name}</p>
          <p>Ascolta il nuovo singolo di ${canzone.artist.name}</p>
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






// Seleziona il bottone
var btn = document.querySelector('.colapse-sidebr-btn');

// Aggiungi un gestore per l'evento 'mouseenter'
btn.addEventListener('mouseenter', function() {
  // Imposta un timer per cambiare il display dopo 1 secondo
  setTimeout(function() {
    btn.querySelector('.bi').style.display = 'block';
  }, 800); // Ritardo di 800 millisecondi (1 secondo)
});

// Aggiungi un gestore per l'evento 'mouseleave'
btn.addEventListener('mouseleave', function() {
  // Rimuovi immediatamente l'icona quando il mouse lascia il bottone
  btn.querySelector('.bi').style.display = 'none';
});