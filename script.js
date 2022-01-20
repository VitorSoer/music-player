//Select music and properties.
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
//Select audio and buttons.
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');


const btnPrev = document.getElementById('prev');
const btnPlay = document.getElementById('play');
const btnNext = document.getElementById('next');
//Select svg for make the change when i click
const changePlay = document.getElementById('changePlay');

//Array of music and properties
const songs = [
    {
        name: 'mich',
        displayName: 'Cold Little Heart',
        artist: 'Michael Kiwanuka',
    },
    {
        name: 'sabri',
        displayName: 'Tell Me',
        artist: 'Sabrina Claudio',
    },
    {
        name: 'saint',
        displayName: 'Borders',
        artist: 'Saint Jhn',
    },
    {
        name: 'roy',
        displayName: 'Get you good',
        artist: 'Roy Woods',
    },
    {
        name: 'love',
        displayName: 'Love Galore',
        artist: 'Sza',
    }
];

//Checking if is playing
let isPlaying = false;

//For play 
function playSong() {
    isPlaying = true;
    changePlay.setAttribute('href', '/music-player/img/sprite.svg#icon-pause');
    music.play();
}
//For pause
function pauseSong() {
    isPlaying = false;
    changePlay.setAttribute('href', "/music-player/img/sprite.svg#icon-play2");
    music.pause();
}

//Click event
btnPlay.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


//Update the timer
function updatePregressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //Update the progress bar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        //Delay the switching duration element to avoid NaN
        if (durationSeconds) { durationEl.textContent = `${durationMinutes}:${durationSeconds}`; }
        //Calculate display current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`; 
    }
}

//Set Progress Bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const{ duration } = music;
    music.currentTime = (clickX / width) * duration;

    if(!isPlaying){
        playSong();
    }
}


//Event Listeners
btnPrev.addEventListener('click', prevSong);
btnNext.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updatePregressBar);
progressContainer.addEventListener('click', setProgressBar);
