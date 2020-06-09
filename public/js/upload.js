//Redundant
function postFunc(name, file) {
    console.log("postFunc:" + file)
    var form = new FormData();
    form.append("name", name);
    form.append("file", file);

    var settings = {
      "url": "http://localhost:3005/audio/add",
      "method": "POST",
      "timeout": 0,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
});
}

    $("#submit_file").click(function(e) {
        var title = document.getElementById('song_title').value
        var artist = document.getElementById('artist').value
        var album = document.getElementById('album').value
        var file = document.getElementById('file').files[0]
        if (file) {
            var reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = function (evt) {
                postFunc(title, evt.target.result)
            }
        }
});
