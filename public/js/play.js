var songList = document.getElementById("songlist");
songList.addEventListener("click", changeAudio);
var audioTag = document.getElementById("audioelement");

function changeAudio(e) {
    if (e.target !== e.currentTarget) {
        console.log(e.target);
        var clickedItem = e.target.id;
        audioTag.src=""
        audioTag.src="/audio/" + clickedItem
        alert(clickedItem);
    }
}
