var songList = document.getElementById("songlist");
songList.addEventListener("click", changeAudio);
var audioTag = document.getElementById("audioelement");

var playpause = document.getElementById("playpause");
playpause.addEventListener("click", toggle)

var prev = document.getElementById("previous");
prev.addEventListener("click", prev);
var next = document.getElementById("next");
next.addEventListener("click", next);

var progress = document.getElementById("progress");
audioTag.addEventListener("timeupdate", update)
audioTag.addEventListener("play", update)
audioTag.addEventListener("pause", update)


// function handleControls(e) {
//     if(e.type == "timeupdate" || e.type == "play" || e.type == "pause") {
//         update(e);
//     }
//     else if(e.target.ID == "playpause") {
//         toggle(e);
//     }
//     else if(e.target.ID == "previous") {
//         prev(e);
//     }
//     else if(e.target.ID == "next") {
//         next(e);
//     }
// }

function changeAudio(e) {
    if (e.target !== e.currentTarget) {
            console.log(e.target);
            var clickedItem = e.target.id;
            audioTag.src=""
            audioTag.src="/audio/" + clickedItem
            console.log("Playing song: " + clickedItem);
    }
}

function toggle(e) {
        var clickedItem = e.target;
        console.log("hello");
        if(clickedItem.innerHTML == "play_arrow") {
            clickedItem.innerHTML = "pause";
            audioTag.play();
        }
        else if(clickedItem.innerHTML == "pause") {
            clickedItem.innerHTML = "play_arrow"
            audioTag.pause();
        }
    }

    function next(e) {
        console.log("hit next button");
        var active = element.querySelector('.active');
        var next = active.nextElementSibling;
        console.log(next);
        audioTag.src=next.id;
    }

    function prev(e) {
        console.log("hit previous button");
        var active = element.querySelector('.active');
        var prev = active.previousElementSibling;
        var clickedItem = e.target;
    }

function update(e) {
    console.log("time update")
    var duration = audioTag.duration;
    var curTime = audioTag.currentTime;
    var currentPercent = (curTime/duration)*145;
    console.log("width: " + currentPercent);
    progress.style = "width: " + currentPercent + "%";
}
