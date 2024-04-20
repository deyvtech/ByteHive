import { Schema, models, model } from "mongoose";


const UserSchema = new Schema({
	name: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String },
	profile_url: { type: String },
	questions:[{type: Schema.Types.ObjectId, ref: "Question"}],
	saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
	joined_at: { type: Date, default: Date.now },
});

const User = models?.User || model('User', UserSchema)

export default User;