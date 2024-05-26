var audio = document.getElementById("audio");
var playImg = document.getElementById("playImg");
var audioSource = document.getElementById("audioSource");
var trackTitle = document.getElementById("trackTitle");
var playlist = document.getElementById("playlist").getElementsByTagName("li");
var currentTrackIndex = 0;

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playImg.src = "https://static.vecteezy.com/system/resources/previews/009/992/357/large_2x/pause-icon-sign-symbol-design-free-png.png";
    } else {
        audio.pause();
        playImg.src = "https://cdn-icons-png.flaticon.com/512/120/120625.png";
    }
}

function playMusic(id) {
    var source = document.getElementById(id).firstChild.href;
    var title = document.getElementById(id).innerText;
    audioSource.src = source;
    audio.load();
    audio.play();
    playImg.src = "https://static.vecteezy.com/system/resources/previews/009/992/357/large_2x/pause-icon-sign-symbol-design-free-png.png";
    trackTitle.textContent = `Now Playing: ${title}`;
    setCurrentTrackIndex(id);
}

function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    var nextTrack = playlist[currentTrackIndex];
    playMusic(nextTrack.id);
}

function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    var previousTrack = playlist[currentTrackIndex];
    playMusic(previousTrack.id);
}

function setCurrentTrackIndex(id) {
    for (var i = 0; i < playlist.length; i++) {
        if (playlist[i].id === id) {
            currentTrackIndex = i;
            break;
        }
    }
}