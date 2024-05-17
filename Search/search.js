const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=`;
const mostRelevant = document.getElementById(`most-relevant`);
const searchedTracks = document.getElementById(`searched-tracks`);
const searchedArtists = document.getElementById(`searched-artists`);
const searchedAlbums = document.getElementById(`searched-albums`);
const podcastContainer = document.querySelector(".othercontents");
const searchResults = document.querySelector(".searchresults");  // Seleziona il div che contiene i risultati della ricerca
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

            // Nascondi o mostra i contenitori dei podcast e dei risultati di ricerca
            if (this.value.length > 0) {
                podcastContainer.classList.add("d-none");
                searchResults.style.display = 'block';  // Mostra i risultati di ricerca
            } else {
                podcastContainer.classList.remove("d-none");
                searchResults.style.display = 'none';  // Nascondi i risultati di ricerca
            }
        });
    })
    .catch(error => console.error('Errore nella fetch:', error));

function updateMostRelevant(items) {
    mostRelevant.innerHTML = '';  
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
    searchedArtists.innerHTML = '';
    const addedArtists = new Set();  
    items.forEach(item => {
        const artistId = item.artist.id;
        if (!addedArtists.has(artistId)) {
            addedArtists.add(artistId);
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
    searchedAlbums.innerHTML = '';
    const addedAlbums = new Set();  
    items.forEach(item => {
        const albumId = item.album.id;
        if (!addedAlbums.has(albumId)) {
            addedAlbums.add(albumId);
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
