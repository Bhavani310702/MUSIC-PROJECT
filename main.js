let logout = document.getElementById("logout")
logout.addEventListener("click" ,()=>{
  alert("logout succesfully")
  location.replace("./index.html")
})

function claimOffer() {
  alert("Congratulations! You have claimed the $1 trial offer.");
 
  window.location.href = "https://gaana.com/subscribe/buy-gaana-plus?udf=topbar_trial"; 
}

// songs starts--------------------------------
// let currentAudios = null;
// let currentButton = null;

// fetch("https://vybbii-api-iu8p.onrender.com/songs")
//   .then((response) => response.json())
//   .then((data) => {
//     const container = document.getElementById("Allsongs");
//     container.style.display = "flex";
//     container.style.flexWrap = "wrap";
//     container.style.gap = "20px";

//     data.forEach((song) => {
//       const songElement = document.createElement("div");
//       songElement.style.position = "relative";
//       songElement.style.margin = "10px";
//       songElement.style.textAlign = "center";

//       songElement.innerHTML = `
//         <div style="position: relative; display: inline-block;">
//             <img src="${song.img}" alt="${song.title}" style="width:100px; height:100px; display: block; border-radius: 10px;">
//             <button class="play-button" style="position: absolute; top: 40%; left: 40%; transform: translate(-50%, -50%); border: none;  cursor: pointer; border-radius: 10%; padding: 5px;">
//                 <i class="ri-play-circle-line" style="font-size: 35px; colorL:black;"></i>
//             </button>
//             <h6 style="margin-top: 8px; color: white;">${song.title}</h6>
//         </div>
//         `;

//       const playButton = songElement.querySelector(".play-button");

//       playButton.addEventListener("click", () => {
//         togglePlayPause(song.audiourl, playButton);
//       });

//       container.appendChild(songElement);
//     });
//   })
//   .catch((error) => console.error("Error fetching songs:", error));

// function togglePlayPause(audiourl, button) {
//   if (currentAudios && currentAudios.src === audiourl) {
//     if (currentAudios.paused) {
//       currentAudios.play();
//       button.innerHTML =
//         '<i class="ri-pause-circle-line" style="font-size: 32px; color: white;"></i>';
//     } else {
//       currentAudios.pause();
//       button.innerHTML =
//         '<i class="ri-play-circle-line" style="font-size: 32px; color: white;"></i>';
//     }
//   } else {
//     if (currentAudios) {
//       currentAudios.pause();
//       if (currentButton) {
//         currentButton.innerHTML =
//           '<i class="ri-play-circle-line" style="font-size: 32px; color: white;"></i>';
//       }
//     }

//     // Play the new song
//     currentAudios = new Audio(audiourl);
//     currentAudios.play();
//     currentButton = button;
//     button.innerHTML =
//       '<i class="ri-pause-circle-line" style="font-size: 32px; color: white;"></i>';

//     currentAudios.addEventListener("ended", () => {
//       button.innerHTML =
//         '<i class="ri-play-circle-line" style="font-size: 32px; color: white;"></i>';
//       currentAudios = null;
//       currentButton = null;
//     });
//   }
// }

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        let currentAudios = null;
        let currentPlayButton = null;

        function addToWishlist(song, button) {
            if (!wishlist.some(item => item.title === song.title)) {
                wishlist.push(song);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                button.innerText = "❤️ Added";
                alert(`${song.title} added to wishlist!`);
            }
        }

        function openWishlistPage() {
            window.location.href = "wishlist.html";
        }

        function togglePlayPause(song, playButton, wishlistButton) {
            if (currentAudio && currentAudio.src === song.audiourl) {
                if (currentAudios.paused) {
                    currentAudios.play();
                    playButton.innerText = "⏸ Pause";
                } else {
                    currentAudios.pause();
                    playButton.innerText = "▶️ Play";
                }
            } else {
                if (currentAudios) {
                    currentAudios.pause();
                    if (currentPlayButton) currentPlayButton.innerText = "▶️ Play";
                }

                currentAudios = new Audio(song.audiourl);
                currentAudios.play();
                playButton.innerText = "⏸ Pause";
                currentPlayButton = playButton;

                currentAudios.addEventListener("ended", () => {
                    playButton.innerText = "▶️ Play";
                });

                // Also add to wishlist
                addToWishlist(song, wishlistButton);
            }
        }

        fetch("https://vybbii-api-iu8p.onrender.com/songs")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("Allsongs");
                data.forEach(song => {
                    const songElement = document.createElement("div");
                    songElement.classList.add("song-item");
                    songElement.innerHTML = `
                        <img src="${song.img}" alt="${song.title}">
                        <h6>${song.title}</h6>
                        <button class="play-button">▶️</button>
                        <button class="wishlist-button">❤️</button>
                    `;

                    const playButton = songElement.querySelector(".play-button");
                    const wishlistButton = songElement.querySelector(".wishlist-button");

                    playButton.addEventListener("click", () => togglePlayPause(song, playButton, wishlistButton));
                    wishlistButton.addEventListener("click", () => addToWishlist(song, wishlistButton));

                    container.appendChild(songElement);
                });
            })
            .catch(error => console.error("Error fetching songs:", error));
// all songs---------------------------------------------

fetch("https://679bb6bd33d316846324dfe5.mockapi.io/songs")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("songsContainer");
    data.forEach((song) => {
      const songElement = document.createElement("div");
      songElement.innerHTML = `
      <div>
        <img src="${song.image}" alt="${song.title}" style="width:100px;height:100px;">
        <h6>${song.title}</h6>
      </div>
    `;
      container.appendChild(songElement);
    });
    // Auto-scroll function
    function autoScroll() {
      container.scrollLeft += 1;
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft = 0;
      }
    }

    setInterval(autoScroll, 50);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Top charts---------------------------------

fetch("https://679bb6bd33d316846324dfe5.mockapi.io/Artists")
.then((response) => response.json())
.then((data) => {
  const artistContainer = document.getElementById("artist");
  const artistDetails = document.getElementById("artistDetails");

  function showArtists() {
    artistContainer.innerHTML = "";
    artistDetails.style.display = "none";
    artistContainer.style.display = "flex";

    data.forEach((artist) => {
      const artistDiv = document.createElement("div");
      artistDiv.classList.add("artist-item");
      artistDiv.innerHTML = `
                <img src="${artist.image}" alt="${artist.name}">
                <h6>${artist.name}</h6>
            `;
      artistDiv.addEventListener("click", () =>
        showArtistDetails(artist)
      );
      artistContainer.appendChild(artistDiv);
    });

    startAutoScroll(); 
  }
  function showArtistDetails(artist) {
    artistContainer.style.display = "none";
    artistDetails.style.display = "block";
    artistDetails.innerHTML = `
            <button id="backButton">Go Back</button>
            <h2>${artist.name}</h2>
            <img src="${artist.image}" alt="${artist.name}">
            <p>${artist.bio || "No bio available."}</p>
            <h3>Songs</h3>
            <ul>
                ${
                  artist.famousSongs && artist.famousSongs.length > 0
                    ? artist.famousSongs
                        .map((famousSongs) => `<li>${famousSongs}</li>`)
                        .join("")
                    : "<li>No songs available.</li>"
                }
            </ul>
        `;
    document
      .getElementById("backButton")
      .addEventListener("click", showArtists);
  }

  // Auto-scroll function
  function startAutoScroll() {
    let scrollAmount = 0;
    let slideTimer = setInterval(() => {
      artistContainer.scrollLeft += 1;
      scrollAmount += 1;
      if (
        scrollAmount >=
        artistContainer.scrollWidth - artistContainer.clientWidth
      ) {
        artistContainer.scrollLeft = 0; // Reset to start when reached end
        scrollAmount = 0;
      }
    }, 50);
  }

  showArtists(); // Load the artists
})
.catch((error) => console.error("Error fetching data:", error));

// Artists-----------------------------------------------

fetch("https://67ac6af55853dfff53da9f75.mockapi.io/melodysongs")
  .then((response) => response.json())
  .then((data) => {
    const staticContainer = document.getElementById("staticImages");
    const allSongsContainer = document.getElementById("allSongsContainer");
    const seeAllButton = document.getElementById("seeAll");
    const goBackButton = document.getElementById("goBack");
    function showFirstFour() {
      staticContainer.innerHTML = "";
      data.slice(0, 4).forEach((song) => {
        const songDiv = document.createElement("div");
        songDiv.classList.add("song-item");
        songDiv.innerHTML = `
                            <img src="${song.image}" alt="${song.title}">
                            <h6>${song.title}</h6>
                        `;
        staticContainer.appendChild(songDiv);
      });
    }
    showFirstFour();
    seeAllButton.addEventListener("click", function () {
      allSongsContainer.innerHTML = "";
      allSongsContainer.style.display = "grid";
      staticContainer.style.display = "none";
      seeAllButton.style.display = "none";
      goBackButton.style.display = "inline-block";

      data.forEach((song) => {
        const songDiv = document.createElement("div");
        songDiv.classList.add("song-item");
        songDiv.innerHTML = `
                            <img src="${song.image}" alt="${song.title}">
                            <h6>${song.title}</h6>
                        `;
        allSongsContainer.appendChild(songDiv);
      });
    });
    goBackButton.addEventListener("click", function () {
      allSongsContainer.style.display = "none";
      staticContainer.style.display = "grid";
      seeAllButton.style.display = "inline-block";
      goBackButton.style.display = "none";
      showFirstFour();
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// melody songs--------------------------------------------------

let currentAudio = new Audio();
let isPlaying = false;
let currentSong = null;
let currentSongList = [];
let currentSongIndex = -1;

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const footerThumbnail = document.getElementById("footerThumbnail");
const footerTitle = document.getElementById("footerTitle");
const footerArtist = document.getElementById("footerArtist");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const API_URL = "https://vybbii-api-iu8p.onrender.com/songs";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) {
    alert("Please enter a search term.");
    return;
  }

  fetch(API_URL)
    .then((response) => response.json())
    .then((songs) => {
      const filteredSongs = songs.filter(
        (song) => song.title && song.title.toLowerCase().includes(searchTerm)
      );
      if (filteredSongs.length === 0) {
        alert("No song found.");
        return;
      }

      currentSongList = filteredSongs;

      currentSongIndex = 0;
      loadSongInFooter(currentSongList[currentSongIndex]);
    })
    .catch((error) => {
      console.error("Error fetching songs:", error);
      alert("Failed to load songs. Please try again later.");
    });
});

function loadSongInFooter(song) {
  currentSong = song;

  footerThumbnail.src = song.img || "placeholder.jpg";
  footerTitle.textContent = song.title;
  footerArtist.textContent = song.artist || "Unknown Artist";

  if (song.audiourl) {
    currentAudio.src = song.audiourl;
    playAudio();
  } else {
    console.error("No audio URL for this song:", song);
  }
}

function playAudio() {
  currentAudio.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="ri-pause-circle-line"></i>';
}

function pauseAudio() {
  currentAudio.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="ri-play-circle-line"></i>';
}

playPauseBtn.addEventListener("click", () => {
  if (!currentSong) return;
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentSongList.length === 0) return;
  currentSongIndex =
    (currentSongIndex - 1 + currentSongList.length) % currentSongList.length;
  loadSongInFooter(currentSongList[currentSongIndex]);
});

nextBtn.addEventListener("click", () => {
  if (currentSongList.length === 0) return;
  currentSongIndex = (currentSongIndex + 1) % currentSongList.length;
  loadSongInFooter(currentSongList[currentSongIndex]);
});

currentAudio.addEventListener("timeupdate", () => {
  if (currentAudio.duration) {
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.value = progress;
    currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);
  }
});

currentAudio.addEventListener("loadedmetadata", () => {
  totalDurationDisplay.textContent = formatTime(currentAudio.duration);
});

progressBar.addEventListener("input", (e) => {
  if (currentAudio.duration) {
    const seekTime = (e.target.value / 100) * currentAudio.duration;
    currentAudio.currentTime = seekTime;
  }
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// contact page------------------

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();
  alert("Your message has been sent! 🎵");
  this.reset();
});
