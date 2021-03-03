const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cs97project:yungseggy@cluster0.roojp.mongodb.net/cs97projectdb?authSource=admin&replicaSet=atlas-mo4y7l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//mongodb+srv://cs97project:yungseggy@cluster0.roojp.mongodb.net/test?authSource=admin&replicaSet=atlas-mo4y7l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
//mongodb+srv://19chenterry:Tc_02052001@cluster0.rdagt.mongodb.net/files