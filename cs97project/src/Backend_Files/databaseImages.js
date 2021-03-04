const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = mongoose.Schema({
    sender : String,
    filename : String,
    fileId : String,
    timestamp: String,
    received: Boolean,
    chatroomID: String
});

export default mongoose.model('uploads', messageSchema);