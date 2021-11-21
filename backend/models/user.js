import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    roleId: {type: mongoose.Schema.ObjectId , ref: "roles"}
});

const user = mongoose.model("users", userSchema);

export default user;