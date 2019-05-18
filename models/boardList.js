const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardListSchema = new Schema({
  name: { type: String, required: true },
  position: { type: Number, required: true }
});

boardListSchema.statics.InsertInLastPosition = async function(cb) {
  let position = await this.find()
    .sort({ position: -1 })
    .limit(1);

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

module.exports = mongoose.model("BoardList", boardListSchema);
