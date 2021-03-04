// imports
import express from 'express';
import mongoose from 'mongoose';
import Messages from './databaseMessages.js';
import Users from './databaseUsers.js';
import Rooms from './databaseRooms.js';
import Files from './databaseFiles.js';
import Images from './databaseImages.js';
import Pusher from 'pusher';
import cors from 'cors';
import multer from 'multer';

// app config
const app = express();
const port = process.env.PORT || 9000;


// pusher is a middleware technology that makes mongoDB realtime
// it is connected to both front and back end
const pusher = new Pusher({
    appId: "1159552",
    key: "8cdc3d1a07077d29caf4",
    secret: "11517b87f24f93ffa877",
    cluster: "us3",
    useTLS: true
});

// middleware
// Think about security??
app.use(express.json());
app.use(cors());

// can use cors or these header 
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });


// DB Config - basic mongoose, MongoDB setup
const url_connection = 'mongodb+srv://cs97project:yungseggy@cluster0.roojp.mongodb.net/cs97projectdb?retryWrites=true&w=majority';

mongoose.connect(url_connection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

// once database is open, start doing stuff
db.once('open', () => {
    console.log("Database Connected");

    // variable representing collection in mongoDB
    const messageCollection = db.collection("msgcollections");
    // user collection in mongoDB
    const userCollection = db.collection("users");
    // room collection in mongoDB
    const roomCollection = db.collection("rooms");

    // upload collection in mongoDB
    const uploadCollection = db.collection("uploads");


    // monitors changes
    const changeStream_messages = messageCollection.watch();
    const changeStream_users = userCollection.watch();
    const changeStream_rooms = roomCollection.watch();
    const changeStream_uploads = uploadCollection.watch();
    // console.log(changeStream);

    //==============change stream for messages============
    changeStream_messages.on('change', (change) => {
        console.log('Change Happened:', change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    sender: messageDetails.sender,
                    content: messageDetails.content,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                    chatroomID: messageDetails.chatroomID,
                }
            );
        }
        else {
            console.log('Error triggering Pusher');
        }
    });
    //==============change stream for users============
    changeStream_users.on('change', (change) => {
        console.log('Change Happened:', change);

        if (change.operationType === 'insert') {
            const userDetails = change.fullDocument;
            pusher.trigger('users', 'inserted',
                {
                    username: userDetails.username,
                    password: userDetails.password,
                }
            );

        }
        else {
            console.log('Error triggering Pusher');
        }
    });

    //==============change stream for rooms============
    changeStream_rooms.on('change', (change) => {
        console.log('Change Happened:', change);

        if (change.operationType === 'insert') {
            const roomDetails = change.fullDocument;
            pusher.trigger('rooms', 'inserted',
                {
                    chatroomID: roomDetails.chatroomID,
                    users: roomDetails.users,
                }
            );
        }
        else {
            console.log('Error triggering Pusher');
        }
    });

    changeStream_uploads.on('change', (change) => {
        console.log('Change Happened:', change);

        if (change.operationType === 'insert') {
            const uploadDetails = change.fullDocument;
            pusher.trigger('uploads', 'inserted',
                {
                    sender: messageDetails.sender,
                    filename: messageDetails.filename,
                    fileId: messageDetails.fileId,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                    chatroomID: messageDetails.chatroomID,
                }
            );
        }
        else {
            console.log('Error triggering Pusher');
        }
    });
});

// api routes
app.get("/", (req, res) => res.status(200).send('Hello World!!')); // get data from server

app.get("/messages/sync", (req, res) => { // post(send) data to server

    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});
app.post("/messages/new", (req, res) => { // post(send) data to server
    const databaseMessage = req.body;

    Messages.create(databaseMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });

});

app.post("/users/new", (req, res) => { // post(send) data to server
    const user = req.body;

    Users.create(user, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });

});

app.get("/users/sync", (req, res) => { // post(send) data to server

    Users.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});

app.get("/users/search", async (req, res) => {
    const target = req.query.target;
    Users.findOne({
        username: target
    }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });
});

app.get("/login", async (req, res) => {
    const userlogin = req.query.username;
    const userpw = req.query.password;
    await Users.findOne({
        username: userlogin
    }, (err, data) => {
        if (err) {
            res.status(500).send("1");
        }
        else if (!data) {
            res.status(200).send("1");
        }
        else {
            if (userpw !== data.password) {
                res.status(200).send("1");
            }
            else {
                res.status(200).send("0");
            }
        }
    });
});

app.post("/rooms/new", (req, res) => { // post(send) data to server
    const user = req.body;

    Rooms.create(user, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });

});

app.get("/rooms/sync", (req, res) => { // post(send) data to server

    Rooms.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});

/*
        POST: Upload a single image/file to Image collection
    */

app.post("/upload", (req, res, next) => {
    console.log(req.body);
    // check for existing images
    /*
    Image.findOne({ caption: req.body.caption })
        .then((image) => {
            console.log(image);
            if (image) {
                return res.status(200).json({
                    success: false,
                    message: 'Image already exists',
                });
            }
            */

    let newImage = new Image({
        caption: req.body.caption,
        filename: req.file.filename,
        fileId: req.file.id,
    });

    newImage.save()
        .then((image) => {

            res.status(200).json({
                success: true,
                image,
            });
        })
        .catch(err => res.status(500).json(err));

    //.catch(err => res.status(500).json(err));
})
    .get((req, res, next) => {
        Image.find({})
            .then(images => {
                res.status(200).json({
                    success: true,
                    images,
                });
            })
            .catch(err => res.status(500).json(err));
    });


/*
       GET: Fetch most recently added file
   */
app.get("/recent", (req, res, next) => {
    Image.findOne({}, {}, { sort: { '_id': -1 } })
        .then((image) => {
            res.status(200).json({
                success: true,
                image,
            });
        })
        .catch(err => res.status(500).json(err));
});


/*
        GET: Fetches a particular file by filename
    */
app.get('/file/:filename', (req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files[0] || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No files available',
            });
        }

        res.status(200).json({
            success: true,
            file: files[0],
        });
    });
});

/* 
        GET: Fetches a particular image and render on browser
    */
app.get('/image/:filename', (req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files[0] || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No files available',
            });
        }

        if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
            // render image to browser
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image',
            });
        }
    });
});


// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));