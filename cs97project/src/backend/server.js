import express from 'express';
import mongoose from 'mongoose';
import Messages from './databaseMessages.js';
import Users from './databaseUsers.js';
import Rooms from './databaseRooms.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;

// pusher is a middleware tech that makes mongoDB realtime
const pusher = new Pusher({
    appId: "1159552",
    key: "8cdc3d1a07077d29caf4",
    secret: "11517b87f24f93ffa877",
    cluster: "us3",
    useTLS: true
});

// middleware
app.use(express.json());
app.use(cors());

// DB Config - basic mongoose, MongoDB setup
const url_connection = 'mongodb+srv://cs97project:yungseggy@cluster0.roojp.mongodb.net/cs97projectdb?retryWrites=true&w=majority';
mongoose.connect(url_connection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

// once DB is open
db.once('open', () => {

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

    // change stream for messages
    changeStream_messages.on('change', (change) => {

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

    // change stream for users
    changeStream_users.on('change', (change) => {

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

    // change stream for rooms
    changeStream_rooms.on('change', (change) => {

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

// API routes
// app.get("/", (req, res) => res.status(200).send('Hello World!!')); 

// sync messages
app.get("/messages/sync", (req, res) => { 
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});

// get messages from a room
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

// post new messages
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

// search/get messages for 'search messages' features
app.get("/messages/search", async (req, res) => {
    const currentRoom = req.query.currentRoom;
    const currentContent = req.query.currentContent;
    Messages.findOne({
        chatroomID: currentRoom,
        content: currentContent
    }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.status(201).send(data);
            }
        }
    });
});

// post new users
app.post("/users/new", async (req, res) => { 
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

// sync users
app.get("/users/sync", (req, res) => { 
    Users.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });
});

// search/get users for 'search users' feature
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

// delete user for 'delete user' feature
app.get("/users/delete", async (req, res) => {
    const target = req.query.target;
    Users.findOneAndDelete({
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

// login
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

// sync rooms
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

// creating new rooms (ensures both users and rooms are valid)
app.post("/rooms/new", (req, res) => { 
    const room = req.body;
    Rooms.findOne({ chatroomID: room.chatroomID }, (err, foundRoom) => {
        if (err) {
            res.status(501).send("1");
        }
        else if (foundRoom) {
            res.status(200).send("1");
        }
        else {
            Users.find({ username: { $in: room.users } }, (err, foundUser) => {
                if (err) {
                    res.status(502).send("1");
                }
                else if (Object.keys(foundUser).length !== room.users.length) {
                    res.status(200).send("1");
                }
                else {
                    Rooms.create(room, (err, data) => {
                        if (err) {
                            res.status(503).send("1");
                        }
                        else {
                            res.status(201).send("0");
                        }
                    });
                }
            });
        }
    });
});

// search/get rooms
app.get("/rooms/userrooms", (req, res) => {
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

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));