"use strict";

// const io = require("socket.io")(8900, {
//     cors:{
//         origin:"http://localhost:3000",
//     }
// })
// let users =[];
// const addUser = (userId,socketId) => {
//     !users.some((user) => user.userId === userId) && users.push({userId,socketId}); 
// }
// const removeUser = (socketId) => {
//     users = users.filter(user => user.socketId !== socketId);
// }
// const getUser = (userId) => {
//     return users.find(user=>user.userId === userId)
// }
// io.on("connection", (socket) => {
//     console.log("a user connected");
//    //take userid and socketid
//    socket.on("addUser", userId=>{
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//    })
//    //send and get message
//    socket.on("sendMesage",({senderId,receiverId, text}) => {
//        const user = getUser(receiverId);
//        io.to(user.socketId).emit("getMessage",{
//            senderId,
//            text
//        })
//    })
//    socket.on("disconnect", () => {
//        console.log("a user disconnected");
//         removeUser(socket.id);
//         io.emit("getUsers", users);
//     })
// })
var io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000"
  }
});

var users = [];

var addUser = function addUser(userId, socketId) {
  !users.some(function (user) {
    return user.userId === userId;
  }) && users.push({
    userId: userId,
    socketId: socketId
  });
};

var removeUser = function removeUser(socketId) {
  users = users.filter(function (user) {
    return user.socketId !== socketId;
  });
};

var getUser = function getUser(userId) {
  return users.find(function (user) {
    return user.userId === userId;
  });
};

io.on("connection", function (socket) {
  //when ceonnect
  console.log("a user connected."); //take userId and socketId from user

  socket.on("addUser", function (userId) {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  }); //send and get message

  socket.on("sendMessage", function (_ref) {
    var senderId = _ref.senderId,
        receiverId = _ref.receiverId,
        text = _ref.text;
    var user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId: senderId,
      text: text
    });
  }); //when disconnect

  socket.on("disconnect", function () {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});