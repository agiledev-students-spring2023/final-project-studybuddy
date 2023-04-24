const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MajorsSchema = new Schema({
    _id: ObjectId,
    field: String,
});

module.exports = mongoose.model("Majors", MajorsSchema);
