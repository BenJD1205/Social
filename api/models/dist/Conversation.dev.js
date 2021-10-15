"use strict";

var mongoose = require("mongoose");

var ConversationSchema = new mongoose.Schema({
  members: {
    type: Array
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Conversation", ConversationSchema);