const querystring = require('querystring')
const https = require('https')
document.getElementById('submit').addEventListener("click", upload)

function upload() {
    console.log("in upload")
    var title = document.getElementById('song_title').innerHTML
    var artist = document.getElementById('artist').innerHTML
    var album = document.getElementById('album').innerHTML
    var file = document.getElementById('file').files

    var postData = querystring.stringify({
        'name': title,
        'song': file
    })

    var options = {
        hostname: 'localhost',
        port: 3005,
        path: '/upload.ejs',
        method: 'POST',
    }
    var req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode)
        console.log('headers', res.headers)

        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })
    req.on('error', (e) => {
        console.error(e)
    })
    req.write(postData)
    req.end()
}
