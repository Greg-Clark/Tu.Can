// imports
import express from 'express';
import mongoose from 'mongoose';
import Messages from './databaseMessages.js';
import Users from './databaseUsers.js';
import Rooms from './databaseRooms.js';
import Pusher from 'pusher';
import cors from 'cors';

// imports for gridFS implementation
// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const methodOverride = require('method-override');
// const config = require('./config');
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
// import Grid from 'gridfs-stream';
import crypto from 'crypto';

// import Promise from 'bluebird';


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
app.use(express.urlencoded(
    {
        extended: false
    }
));
app.use(cors());

// can use cors or these header 
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });

///////////////////////////////////////////////



// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });




///////////////////////////////////////////////

// DB Config - basic mongoose, MongoDB setup
const url_connection = 'mongodb+srv://cs97project:yungseggy@cluster0.roojp.mongodb.net/cs97projectdb?retryWrites=true&w=majority';

// create storage engine
const storage = new GridFsStorage({
    url: url_connection,
    file: (req, file) => {
        return {
            filename: buf.toString('hex') + path.extname(file.originalname),
            bucketName: 'uploads'
        }
    }
});



//import {Promise} from "bluebird"
mongoose.connect(url_connection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// mongoose.Promise = Promise;


const db = mongoose.connection;

// once database is open, start doing stuff

//allows us to access gridFs outside db.once
let gfs;

db.once('open', () => {
    console.log("Database Connected");

    //gridFS mongo intialization

    gfs = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "uploads"
    });

    // variable representing collection in mongoDB
    const messageCollection = db.collection("msgcollections");
    // user collection in mongoDB
    const userCollection = db.collection("users");
    // room collection in mongoDB
    const roomCollection = db.collection("rooms");
    // monitors changes

    const changeStream_messages = messageCollection.watch();
    const changeStream_users = userCollection.watch();
    const changeStream_rooms = roomCollection.watch();
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
});

// api routes
const upload = multer({ storage });
//app.use('/', imageRouter(upload));
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
app.get("/messages/room", async (req, res) => {
    const room = req.query.target;

    Messages.find({ chatroomID: room }, (err, data) => {
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

app.post("/users/new", async (req, res) => { // post(send) data to server
    const user = req.body;
    const existing = Users.findOne({ username: user.username });
    Users.create(user, (err, data) => {
        if (err || existing) {
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
    const room = req.body;
    const existingRoom = Rooms.find({ chatroomID: room.chatroomID });
    const existingUser = Users.find({ username: { $in: [room.users] } });
    Rooms.create(room, (err, data) => {
        if (err || existingRoom || existingUser) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });
});

// app.post("/rooms/new", (req,res) => { // post(send) data to server
//     const user = req.body;
//     Rooms.create(user, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         else {
//             res.status(201).send(data);
//         }
//     });
// });

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

app.get("/rooms/userrooms", (req, res) => { // post(send) data to server
    const user = req.query.target

    Rooms.find({ users: user }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});


// gridFS api Routes


// POST: Upload a single image/file to Image collection
app.route('/')
    .post(upload.single('file'), (req, res, next) => {
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
            //caption: req.body.caption,
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
    GET: Delete an image from the collection
*/
app.route('/delete/:id')
    .get((req, res, next) => {
        Image.findOne({ _id: req.params.id })
            .then((image) => {
                if (image) {
                    Image.deleteOne({ _id: req.params.id })
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                message: `File with ID: ${req.params.id} deleted`,
                            });
                        })
                        .catch(err => { return res.status(500).json(err) });
                } else {
                    res.status(200).json({
                        success: false,
                        message: `File with ID: ${req.params.id} not found`,
                    });
                }
            })
            .catch(err => res.status(500).json(err));
    });

/*
    GET: Fetch most recently added record
*/
app.route('/recent')
    .get((req, res, next) => {
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
    POST: Upload multiple files up to 3
*/
app.route('/multiple')
    .post(upload.array('file', 3), (req, res, next) => {
        res.status(200).json({
            success: true,
            message: `${req.files.length} files uploaded successfully`,
        });
    });

/*
    GET: Fetches all the files in the uploads collection
*/
app.route('/files')
    .get((req, res, next) => {
        gfs.find().toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available'
                });
            }

            files.map(file => {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });

            res.status(200).json({
                success: true,
                files,
            });
        });
    });

/*
    GET: Fetches a particular file by filename
*/
app.route('/file/:filename')
    .get((req, res, next) => {
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
app.route('/image/:filename')
    .get((req, res, next) => {
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

/*
    DELETE: Delete a particular file by an ID
*/
app.route('/file/del/:id')
    .post((req, res, next) => {
        console.log(req.params.id);
        gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) {
                return res.status(404).json({ err: err });
            }

            res.status(200).json({
                success: true,
                message: `File with ID ${req.params.id} is deleted`,
            });
        });
    });





// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));