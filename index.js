//NPM Module Dependencies
const express = require('express');
const audioRoute = express.Router();
const indexRoute = express.Router();
const multer = require('multer');
const path = require('path')
const mongodb = require('mongodb');
const MongoClient=require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

//NodeJS Module Dependencies
const { Readable } = require('stream')


//Create express server and express router config
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'));
app.use('/audio', audioRoute)
app.set('view engine', 'ejs')
app.get('/', function(req, res) {
     db.collection("Songs").find({}).toArray(function(err, result) {
         if (err) {throw err}
         console.log(result)
         res.render('index.ejs', {
             songs: result
         });
     })
});
app.get('/upload', function(req, res) {
    res.render('upload.ejs')
})

//Mongo config
let config = require('./config.json')
let pass = config.password;
const uri = "mongodb+srv://admin:" + pass + "@comp127musicplayer.lfnoa.mongodb.net/test?retryWrites=true&w=majority";

// Connect Mongo Driver to MongoDB

let db;
MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
  if (err) {
    console.log('MongoDB connection error. Please check the connection string or DB.')
    process.exit(1);
  }
  db = client.db("MusicPlayer");
})

// GET audio/:songID

audioRoute.get('/:songID', (req, res) => {
  try {
    var songID = new ObjectID(req.params.songID);
  }
  catch(err){
    return res.status(400).json({message:"Invalid trackID in URL parameter. Must be a single string of 12 bytes or 24 hex."})
  }
  res.set('content-type', 'audio/mp3')
  res.set('accept-ranges', 'bytes')

  let bucket = new mongodb.GridFSBucket(db, {
    bucketName: 'songs'
  });
  let downloadStream = bucket.openDownloadStream(songID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  })

  downloadStream.on('end', () => {
    res.end();
  })
});

/**
 * POST /songs
 */
audioRoute.post('/add', (req, res) => {
    console.log("in audioRoute post handler")
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage, limits: { fieldSize: 20000000, fileSize: 20000000, files: 1}});
    upload.single('song')(req, res, (err) => {
      console.log(req)
      console.log(err)
    if (err) {
        console.log("Upload Request Validation Failed")
        return res.status(400).json({ message: "Upload Request Validation Failed" });
    }   else if(!req.body.name) {
        console.log("No track name in request body")
        return res.status(400).json({ message: "No track name in request body" });
    }

    let songName = req.body.name;
    let artist = req.body.artist;
    let album = req.body.album;
    let length = req.body.length;



    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: 'songs'
    });

    let uploadStream = bucket.openUploadStream(songName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    db.collection('Songs').insertOne({"SongName": songName, "Artist": artist, "Album": album, "Length": length, "songID": id}, function(err) {
        assert.equal(null, err);
    })

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
        console.log("Stored under ID: " + id)
      return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    });
  });
});

app.listen(3005, () => {
  console.log("App listening on port 3005!");
});
