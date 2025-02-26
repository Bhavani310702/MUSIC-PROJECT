let logout = document.getElementById("logout")
logout.addEventListener("click" ,()=>{
  alert("logout succesfully")
  location.replace("./index.html")
})

// songs starts--------------------------------
let currentAudios = null;
let currentButton = null;

fetch("https://vybbii-api-iu8p.onrender.com/songs")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("Allsongs");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "20px";

    data.forEach((song) => {
      const songElement = document.createElement("div");
      songElement.style.position = "relative";
      songElement.style.margin = "10px";
      songElement.style.textAlign = "center";

      songElement.innerHTML = `
        <div style="position: relative; display: inline-block;">
            <img src="${song.img}" alt="${song.title}" style="width:100px; height:100px; display: block; border-radius: 10px;">
            <button class="play-button" style="position: absolute; top: 40%; left: 40%; transform: translate(-50%, -50%); border: none;  cursor: pointer; border-radius: 10%; padding: 5px;">
                <i class="ri-play-circle-line" style="font-size: 35px; colorL:black;"></i>
            </button>
            <h6 style="margin-top: 8px; color: white;">${song.title}</h6>
        </div>
        `;

      const playButton = songElement.querySelector(".play-button");

      playButton.addEventListener("click", () => {
        togglePlayPause(song.audiourl, playButton);
      });

      container.appendChild(songElement);
    });
  })
  .catch((error) => console.error("Error fetching songs:", error));

function togglePlayPause(audiourl, button) {
  // If the same song is playing, toggle play/pause
  if (currentAudios && currentAudios.src === audiourl) {
    if (currentAudios.paused) {
      currentAudios.play();
      button.innerHTML =
        '<i class="ri-pause-circle-line" style="font-size: 32px; color: white;"></i>';
    } else {
      currentAudios.pause();
      button.innerHTML =
        '<i class="ri-play-circle-line" style="font-size: 32px; color: white;"></i>';
    }
  } else {
    // Stop the currently playing song
    if (currentAudios) {
      currentAudios.pause();
      if (currentButton) {
        currentButton.innerHTML =
          '<i class="ri-play-circle-line" style="font-size: 32px; color: white;"></i>';
      }
    }

    // Play the new song
    currentAudios = new Audio(audiourl);
    currentAudios.play();
    currentButton = button;
    button.innerHTML =
      '<i class="ri-pause-circle-line" style="font-size: 32px; color: white;"></i>';

    // When song ends, reset the button
    currentAudios.addEventListener("ended", () => {
      button.innerHTML =
        '<i class="ri-play-circle-line" style="font-size: 32px; color: white;"></i>';
      currentAudios = null;
      currentButton = null;
    });
  }
}

fetch("https://679bb6bd33d316846324dfe5.mockapi.io/songs")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("songsContainer");
    data.forEach((song) => {
      const songElement = document.createElement("div");
      songElement.innerHTML = `
      <div>
        <img src="${song.image}" alt="${song.title}" style="width:100px;height:100px;">
        <button class="play-button"><i class="ri-play-circle-line"></i></button>
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
    const container = document.getElementById("artist");
    data.forEach((song) => {
      const songElement = document.createElement("div");
      songElement.innerHTML = `
      <div>
        <img src="${song.image}" alt="${song.title}" style="width:100px;height:100px;">
       <h6>${song.name}</h6>
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
