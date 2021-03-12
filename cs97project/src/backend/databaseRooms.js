import mongoose from 'mongoose';

// room schema for mongoDB
const roomSchema = mongoose.Schema ({
    chatroomID : String,
    users : [{ type: String }],
});

export default mongoose.model('rooms', roomSchema);