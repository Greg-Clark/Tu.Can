import mongoose from 'mongoose';

// user schema for mongoDB
const userSchema = mongoose.Schema({
    username: String,
    password: String
});

export default mongoose.model('users', userSchema);

