const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
	_id: ObjectId,
	name: { type: String, required: true },
	major: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	Profile_pic: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("User", UserSchema);
