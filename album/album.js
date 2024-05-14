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


var cover = document.querySelectorAll(".album-img");

fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q={query}")
    .then((response) => {
        if(!response.ok) {
        throw new Error("Network non okay");
    }
    return response.json();
    })
    .then((data) => {
        
    })
    .catch((error) => {
    console.log("errore:", error)
})