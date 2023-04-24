const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
	id: ObjectId,
	dateAndTime: Date,
	post_id: String,
	content: String,
	author_id: String,
});

module.exports = {
	CommentModel: mongoose.model("Comment", CommentSchema),
};
