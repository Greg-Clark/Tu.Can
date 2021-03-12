import mongoose from 'mongoose';

// message schema for mongoDB
const messageSchema = mongoose.Schema({
    content : String,
    sender : String,
    timestamp: String,
    received: Boolean,
    chatroomID: String
});

export default mongoose.model('msgcollections', messageSchema);
