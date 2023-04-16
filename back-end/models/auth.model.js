const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ResetPasswordSchema = new Schema({
	_id: ObjectId,
	username: String,
	reset_token: String,
	reset_token_expiration: Date,
});

module.exports = {
	ResetPassword: mongoose.model("ResetPassword", ResetPasswordSchema),
};
