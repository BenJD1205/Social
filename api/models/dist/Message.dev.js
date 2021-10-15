"use strict";

var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String
  },
  sender: {
    type: String
  },
  text: {
    type: String
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("Message", MessageSchema);