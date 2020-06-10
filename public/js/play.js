var songList = document.getElementById("songlist");
songList.addEventListener("click", changeAudio);
var audioTag = document.getElementById("audioelement");

var playpause = document.getElementById("playpause");
playpause.addEventListener("click", toggle)

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
        else {
            clickedItem.innerHTML = "play_arrow"
            audioTag.pause();
        }
    }
