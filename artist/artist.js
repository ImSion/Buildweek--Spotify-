document.addEventListener("DOMContentLoaded", function () {
  let nuovoParametro = new URLSearchParams(window.location.search);
  let artistId = nuovoParametro.get("artistId");
  console.log(artistId);

  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      let dati = data.data;
      let users = document.querySelectorAll(".users");
      let durations = document.querySelectorAll(".duration");
      let songs = document.querySelectorAll(".song");
      let albumCovers = document.querySelectorAll(".album");
      let fotoBand = document.querySelector(".foto-band");
      let artist = document.querySelector(".artist");
      let bandName = document.querySelector(".band-name");
      let upperDiv = document.querySelector(".upper-div");
     
    
    
      let primeSetteCanzoni = dati.slice(0, 7);

     

      // Itera su ciascun elemento e assegna il titolo e la durata
      primeSetteCanzoni.forEach((dati, index) => {
        // Assegna il titolo all'elemento .song
        songs[index].innerText = dati.title;
        songs[index].style.width="100px";

        // Assegna la durata all'elemento .duration
        const duration = (parseFloat(dati.duration) / 60).toFixed(2);
        const formattedDuration = duration.replace(/\./g, ":");
        // Assegna la durata formattata all'elemento .duration
        durations[index].innerText = formattedDuration;
        albumCovers[index].src=dati.album.cover_small;
        fotoBand.src = dati.album.cover_small;  
        bandName.innerText = "Di " + dati.artist.name;
        artist.innerText=dati.artist.name;
        let cover=dati.album.cover_big;
        upperDiv.style.backgroundImage = `url(${cover})`;
        upperDiv.style.backgroundSize = "contain";
        upperDiv.style.backgroundRepeat = "repeat";
        upperDiv.style.backgroundPosition = "center";

        
      });

      
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
});
