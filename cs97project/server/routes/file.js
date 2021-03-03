const path = require('path');
const util = require("util");
const express = require('express');
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
const Router = express.Router();

const upload = multer({
    storage: new GridFsStorage({
        url: "mongodb+srv://19chenterry:Tc_02052001@cluster0.rdagt.mongodb.net/files",
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        file: (req, file) => {
            const match = ["image/png", "image/jpeg"];

            if (match.indexOf(file.mimetype) === -1) {
                const filename = `${file.originalname}`;
                return filename;
            }

            return {
                bucketName: "photos",
                filename: `${file.originalname}`
            };
        }
    })
});

//var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
//var upload = multer({ storage: storage }).single("file");
//var uploadFilesMiddleware = util.promisify(uploadFiles);
//module.exports = uploadFilesMiddleware;


Router.post(
    '/upload',
    upload.single('file'),
    async (req, res) => {
        try {
            const { title, description } = req.body;
            const { path, mimetype } = req.file;
            const file = new File({
                title,
                description,
                file_path: path,
                file_mimetype: mimetype
            });
            await GridFsStorage.save();
            res.send('file uploaded successfully.');
        } catch (error) {
            res.status(400).send('Error while uploading file. Try again later.');
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
);

Router.get('/getAllFiles', async (req, res) => {
    try {
        const files = await File.find({});
        const sortedByCreationDate = files.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of files. Try again later.');
    }
});

Router.get('/download/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        res.set({
            'Content-Type': file.file_mimetype
        });
        res.sendFile(path.join(__dirname, '..', file.file_path));
    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
});

module.exports = Router;
