const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
	_id: ObjectId,
	dateAndTime: Date,
	mode: String,
	subject: String,
	description: String,
});

module.exports = {
	PostModel: mongoose.model("Post", PostSchema),
};
