import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    name: String,
    description: String
})

const role = mongoose.model("roles", roleSchema);

export default role;