const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    users: {
      type: [{}],
    },
    messages: {
      type: [{}],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", chatSchema);
