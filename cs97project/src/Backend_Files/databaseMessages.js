import mongoose from 'mongoose';

//define data schema(build methods, flow of data)

// const projectSchema = mongoose.Schema({
//     message: String,
//     name: String,
//     timestamp: String,
//     received: Boolean,
// });

// export default mongoose.model('messagecontents', projectSchema);


const messageSchema = mongoose.Schema({
    content : String,
    sender : String,
    timestamp: String,
    received: Boolean,
    chatroomID: String
});

export default mongoose.model('msgcollections', messageSchema);
