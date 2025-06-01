// let progress =document.getElementById('progress');
// let song =document.getElementById('song');
// let ctrIcon =document.getElementById('ctrIcon');

// song.onloadedmetdata = function() {
//     progress.max = song.duration;
//     progress.value = song.currentTime;

// }
// function playPause() {
//     if (ctrIcon.classList.contains("fa-pause")) {
//         song.pause();
//         ctrIcon.classList.remove("fa-pause");
//         ctrIcon.classList.add("fa-play")
//     } else {
//         song.play();
//         ctrIcon.classList.add("fa-pause");
//         ctrIcon.classList.remove("fa-play")
//     }
// }
// if (song.play()) {
//     setInterval(()=>{
//         progress.value = song.currentTime
//     },500)
// }
// progress.onchange = function(){
//     song.play();
//     song.currentTime = progress.value;
//     ctrIcon.classList.add("fa-pause");
//     ctrIcon.classList.remove("fa-play");
// }
let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrIcon = document.getElementById('ctrIcon');

let updateInterval;

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (ctrIcon.classList.contains("fa-pause")) {
        // Pause music
        song.pause();
        ctrIcon.classList.remove("fa-pause");
        ctrIcon.classList.add("fa-play");
        clearInterval(updateInterval);  // Stop updating progress
    } else {
        // Play music
        song.play();
        ctrIcon.classList.add("fa-pause");
        ctrIcon.classList.remove("fa-play");

        // Start updating progress bar
        updateInterval = setInterval(() => {
            progress.value = song.currentTime;
            if (song.ended) {  // Jab song khatam ho jaye to icon change karo
                ctrIcon.classList.remove("fa-pause");
                ctrIcon.classList.add("fa-play");
                clearInterval(updateInterval);
            }
        }, 500);
    }
}

progress.onchange = function() {
    song.currentTime = progress.value;
    if (song.paused) {
        song.play();
        ctrIcon.classList.add("fa-pause");
        ctrIcon.classList.remove("fa-play");

        updateInterval = setInterval(() => {
            progress.value = song.currentTime;
            if (song.ended) {
                ctrIcon.classList.remove("fa-pause");
                ctrIcon.classList.add("fa-play");
                clearInterval(updateInterval);
            }
        }, 500);
    }
}
