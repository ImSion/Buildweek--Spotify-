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
      let titleSong=document.querySelector(".title-song");
      titleSong.innerText=dati[0].title;
    
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
        albumCovers[index].src=dati.album.cover_medium;
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


// funzione per far sparire la sidebar di destra con scritto attività amici

 function closeSideBar () {

  //punto il pulsante con la x
  let closeButton=document.getElementById("close-button");

  //punto la sidebar di destra

  let sideBarDestra=document.getElementById("sb-right");

  //punto il div centrale perchè voglio che si espanda quando la barra scompare
  let divCentrale=document.querySelector(".central-div");

  //punto il div in cui si trova il pulsante
    let openDiv=document.getElementById("open-sidebar");

     //punto il pulsantino per aprire la sidebar
  let openButton=document.getElementById("open-button");

  // aggiungo un event listener al pulsante x, quando premo su x la sidebar scompare

   closeButton.addEventListener("click", function() {
    sideBarDestra.style.display="none";
    sideBarDestra.style.width="0px";
    sideBarDestra.classList.remove("p-3")
    divCentrale.style.flexGrow = "1";

      if ((sideBarDestra.style.display === "none") && sideBarDestra.style.width==="0px") {
          openDiv.style.height = "100vh";
          openDiv.style.width = "100px";
          openDiv.style.display = "flex";
          openButton.style.display = "inline";
      }

});

}


function openSideBar () {

  //punto la sidebar di destra
  let sideBarDestra=document.getElementById("sb-right");

 //punto il div in cui si trova il pulsante
 let openDiv=document.getElementById("open-sidebar");

  //punto il pulsantino per aprire la sidebar
  let openButton=document.getElementById("open-button");
  openButton.addEventListener("click", function () {
    sideBarDestra.classList.add("d-flex", "flex-column", "flex-shrink-0", "p-3");
    openButton.style.display="none";
    openDiv.style.width="0px";
    sideBarDestra.style.width="320px";

  })


}
