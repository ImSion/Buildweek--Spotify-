const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=queen`

fetch(url)
  .then(response => response.json())  // Converte la risposta in JSON
  .then(data => console.log(data))    // Stampa i dati nella console
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