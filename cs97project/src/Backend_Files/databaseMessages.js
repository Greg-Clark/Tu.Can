import mongoose from 'mongoose';

//define data schema(build methods, flow of data)

const projectSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

export default mongoose.model('messagecontents', projectSchema);
