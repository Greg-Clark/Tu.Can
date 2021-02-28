// imports
import express from 'express';
import mongoose from 'mongoose';
import Messages from './databaseMessages.js';
import Users from './databaseUsers.js'
import Pusher from 'pusher';
import cors from 'cors';

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
    const messageCollection = db.collection("messagecontents");
    // user collection in mongoDB
    const userCollection = db.collection("users");
    // monitors changes
    const changeStream = messageCollection.watch();
    // console.log(changeStream);

    changeStream.on('change', (change) => {
        console.log('Change Happened:', change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            const userDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                }
            );
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
});

// api routes
app.get("/", (req, res) => res.status(200).send('Hello World!!')); // get data from server

app.get("/messages/sync", (req,res) => { // post(send) data to server

    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});
app.post("/messages/new", (req,res) => { // post(send) data to server
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

app.post("/users/new", (req,res) => { // post(send) data to server
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

app.get("/users/sync", (req,res) => { // post(send) data to server

    Users.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });

});

// listen
app.listen(port, ()=>console.log(`Listening on localhost:${port}`));