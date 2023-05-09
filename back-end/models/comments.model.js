const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
	_id: ObjectId,
	dateAndTime: Date,
	post_id: String,
	content: String,
	author_name: String, // username of the author
	author_major: String,
});

module.exports = {
	CommentModel: mongoose.model("Comment", CommentSchema),
};
