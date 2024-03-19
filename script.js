console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "अभिर गुलाल उधळीत रंग", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "जैसे ज्याचे कर्म तैसे फळ देतो रे ईश्वर", filePath: "songs/2.mp3", coverPath: "covers/10.jpg"},
    {songName: "विठ्ठल नाम्याची शाळा भरली", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "नाम तुझे घेता देवा होई समाधान", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "विठू माऊली तू माऊली जगाची", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "दर्शन दे रे दे रे भगवंता", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "कानडा राजा पंढरीचा", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "जगण्याचे देवा", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "चंद्रभागेच्या तिरी", filePath: "songs/9.mp3", coverPath: "covers/3.jpg"},
    {songName: "माझे माहेर पंढरी", filePath: "songs/10.mp3", coverPath: "covers/5.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;

    // Update Timer
    let currentTime = formatTime(audioElement.currentTime);
    let duration = formatTime(audioElement.duration);
    document.getElementById('currentTime').innerText = currentTime;
    document.getElementById('duration').innerText = duration;
})

// Helper function to format time in MM:SS format
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    // Increment the songIndex
    songIndex = (songIndex + 1) % songs.length;

    // Update audio source and details
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    // Reset and play the audio
    audioElement.currentTime = 0;
    audioElement.play();

    // Update play/pause icon
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
// ... (Your existing code)

// Listen to the 'ended' event to automatically play the next song
audioElement.addEventListener('ended', () => {
    // Increment the songIndex
    songIndex = (songIndex + 1) % songs.length;

    // Update audio source and details
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    // Reset and play the audio
    audioElement.currentTime = 0;
    audioElement.play();

    // Update play/pause icon
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
    // Add the next song to the queue
    addToQueue((songIndex + 1) % songs.length);
});

// ... (Your existing code)
// ... (Your existing code)

// Listen to the 'keydown' event on the document
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ':
            // Space key
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
            break;
        case 'n':
        case 'N':
            // 'N' key
            playNextSong();
            break;
        case 'p':
        case 'P':
            // 'P' key
            playPreviousSong();
            break;
        default:
            break;
    }
});

// ... (Your existing code)
