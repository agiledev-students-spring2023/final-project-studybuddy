const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ResetPasswordSchema = new Schema({
	_id: ObjectId,
	username: String,
	reset_token: String,
	reset_token_expiration: Date,
});

const EmailConfirmationSchema = new Schema({
	_id: ObjectId,
	userid: {
		type: ObjectId,
		ref: "User",
		unique: true,
		required: true,
	},
	confirmation_token: String,
	confirmed: Boolean,
});

module.exports = {
	ResetPassword: mongoose.model("ResetPassword", ResetPasswordSchema),
	EmailConfirmation: mongoose.model("EmailConfirmation", EmailConfirmationSchema),
};
