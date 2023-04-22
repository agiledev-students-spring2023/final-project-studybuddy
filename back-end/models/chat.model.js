const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChatSchema = new Schema({
	members: [String],
	last_read: [Number],
});


const MessageSchema = new Schema({
	sender_id: String,
	content: String,
	timestamp: Number,
	chat_id: ObjectId,
});

module.exports = {
	Chat: mongoose.model("Chat", ChatSchema),
	Message: mongoose.model("Message", MessageSchema),
};
