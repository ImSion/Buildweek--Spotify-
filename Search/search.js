const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
const mostRelevant = document.getElementById(`most-relevant`);
const searchedTracks = document.getElementById(`searched-tracks`);
const searchedArtists = document.getElementById(`searched-artists`);
const searchedAlbums = document.getElementById(`searched-albums`);
const podcastContainer = document.querySelector(".othercontents")
const artisti = ["eminem", "queen", "metallica", "lazza", "oasis", "Pink"];
const index = Math.floor(Math.random() * artisti.length);

fetch(url + artisti[index])
    .then(response => response.json())
    .then(data => {
        const canzoni = data.data;
        document.querySelector("input[type='search']").addEventListener("input", function () {
            const searchText = this.value.toLowerCase();
            const filteredSongs = canzoni.filter(canzone => canzone.title.toLowerCase().includes(searchText));

            updateMostRelevant(filteredSongs);
            updateSearchedTracks(filteredSongs);
            updateSearchedArtists(filteredSongs);
            updateSearchedAlbums(filteredSongs);

            // nascondo i podcast non appena scrivo nell'input ricerca
            if (this.value.length > 0) {
                podcastContainer.classList.add("d-none");
            } else {
                podcastContainer.classList.remove("d-none");
            }
        });
    })
    .catch(error => console.error('Errore nella fetch:', error));

function updateMostRelevant(items) {
    mostRelevant.innerHTML = '';  // Pulisce il container prima di aggiungere nuovi elementi
    if (items.length > 0) {
        const item = items[0];
        mostRelevant.appendChild(createCard(item));
    }
}

function updateSearchedTracks(items) {
    searchedTracks.innerHTML = '';
    items.slice(0, 4).forEach(item => {
        searchedTracks.appendChild(createCard(item));
    });
}

function updateSearchedArtists(items) {
    searchedArtists.innerHTML = '';  // Pulisce il container prima di aggiungere nuovi elementi
    const addedArtists = new Set();  // Crea un set per tenere traccia degli ID degli artisti aggiunti

    items.forEach(item => {
        const artistId = item.artist.id;
        if (!addedArtists.has(artistId)) {  // Controlla se l'ID dell'artista è già stato aggiunto
            addedArtists.add(artistId);  // Aggiunge l'ID dell'artista al set

            let div = document.createElement('div');
            div.classList.add('artist-info', 'm-2');
            div.innerHTML = `
                <img src="${item.artist.picture}" alt="${item.artist.name}" style="width: 150px; height: 150px; border-radius: 50%;">
                <p>${item.artist.name}</p>
                `;
            searchedArtists.appendChild(div);
        }
    });
}

function updateSearchedAlbums(items) {
    searchedAlbums.innerHTML = '';  // Pulisce il container prima di aggiungere nuovi elementi
    const addedAlbums = new Set();  

    items.forEach(item => {
        const albumId = item.album.id;
        if (!addedAlbums.has(albumId)) {  // Controlla se l'ID dell'album è già stato aggiunto
            addedAlbums.add(albumId);  // Aggiunge l'ID dell'album al set

            let div = document.createElement('div');
            div.classList.add('album-info', 'm-2');
            div.innerHTML = `<img src="${item.album.cover}" alt="${item.album.title}" style="width: 150px; height: 150px;"><p>${item.album.title}</p>`;
            searchedAlbums.appendChild(div);
        }
    });
}


function createCard(item) {
    let card = document.createElement("div");
    card.classList.add("card1");
    card.innerHTML = `
        <div>
            <a href="/album/album.html?id=${item.album.id}">
                <img class="relevant-album-img" src="${item.album.cover}" alt="${item.title}">
            </a>
            <div class="card-body">
                <h3 class="revelant-song-title">${item.title}</h3>
                <p class="mb-4 artist-name">${item.artist.name}</p>
            </div>
        </div>
    `;
    const artistName = card.querySelector('.artist-name');
    artistName.onclick = () => {
        window.location = `../artist/artist.html?artistId=${item.artist.id}`;
    };
    return card;
}
