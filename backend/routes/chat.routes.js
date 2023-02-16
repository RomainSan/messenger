const express = require("express");
const {
  createRoom,
  getRooms,
  getMessages,
  sendMessage,
  deleteRoom,
} = require("../controllers/chat.controller");

const router = express.Router();

router.post("/createRoom/:id", createRoom);
router.get("/getRooms/:id", getRooms);
router.get("/getMessages/:id", getMessages);
router.put("/sendMessage/:id", sendMessage);
router.delete("/deleteRoom/:id", deleteRoom);

module.exports = router;
