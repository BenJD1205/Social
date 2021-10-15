"use strict";

var router = require("express").Router();

var Conversation = require("../models/Conversation"); //new conversations


router.post("/", function _callee(req, res) {
  var newConversation, savedConversation;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
          });
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(newConversation.save());

        case 4:
          savedConversation = _context.sent;
          res.status(200).json(savedConversation);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //get conver of a user

router.get("/:userId", function _callee2(req, res) {
  var conversation;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Conversation.find({
            members: {
              $in: [req.params.userId]
            }
          }));

        case 3:
          conversation = _context2.sent;
          res.status(200).json(conversation);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", function _callee3(req, res) {
  var conversation;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Conversation.findOne({
            members: {
              $all: [req.params.firstUserId, req.params.secondUserId]
            }
          }));

        case 3:
          conversation = _context3.sent;
          res.status(200).json(conversation);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;