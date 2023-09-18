import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, require: true },
    email: { type: String, require: true },
    contact: { type: String, require: true },
    password: { type: String, require: true },
    adress: { type: String }
}, { versionKey: false } );

const user = mongoose.model("user", userSchema);

export { user, userSchema };
