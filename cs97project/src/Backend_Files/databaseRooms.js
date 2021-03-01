import mongoose from 'mongoose';

//define data schema(build methods, flow of data)

const roomSchema = mongoose.Schema ({
    chatroomID : String,
    // user1 : String,
    // user2 : String,
    users : [{ type: String }],
});


export default mongoose.model('rooms', roomSchema);