const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AuthSchema = new Schema({
	_id: ObjectId,
	username: String,
	session_token: String,
});

const ResetPasswordSchema = new Schema({
	_id: ObjectId,
	username: String,
	reset_token: String,
	reset_token_expiration: Date,
});

module.exports = {
	Auth: mongoose.model("Auth", AuthSchema),
	ResetPassword: mongoose.model("ResetPassword", ResetPasswordSchema),
};
