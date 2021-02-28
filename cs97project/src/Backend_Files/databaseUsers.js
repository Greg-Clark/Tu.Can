import mongoose from 'mongoose';

//define data schema(build methods, flow of data)

const userSchema = mongoose.Schema({
    username: String,
    password: String
    // Maybe add full name later?
});

export default mongoose.model('users', userSchema);

