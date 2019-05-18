const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardListSchema = new Schema({
  name: { type: String, required: true },
  position: { type: Number, required: true }
});

module.exports = mongoose.model("BoardList", boardListSchema);
