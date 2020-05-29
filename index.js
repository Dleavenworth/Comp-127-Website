//NPM Module Dependencies
const express = require('express');
const audioRoute = express.Router();
const indexRoute = express.Router();
const multer = require('multer');
const path = require('path')

const mongodb = require('mongodb');
const MongoClient=require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//NodeJS Module Dependencies
const { Readable } = require('stream')


//Create express server and express router config
const app = express();
app.use('/audio', audioRoute)
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//Mongo config
//let config = require('config.json').password
const uri = "mongodb+srv://admin:hihi@comp127musicplayer.lfnoa.mongodb.net/test?retryWrites=true&w=majority";

// Connect Mongo Driver to MongoDB

let db;
MongoClient.connect(uri, (err, client) => {
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
    res.sendStats(404);
  })

  downloadStream.on('end', () => {
    res.end();
  })
});

/**
 * POST /tracks
 */
audioRoute.post('/', (req, res) => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
  upload.single('song')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }

    let songName = req.body.name;

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

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
    });
  });
});

app.listen(3005, () => {
  console.log("App listening on port 3005!");
});
