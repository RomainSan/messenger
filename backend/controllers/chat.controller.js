const ChatModel = require("../models/chat.model");

module.exports.createRoom = async (req, res) => {
  const { name, users, messages } = req.body;
  const id = req.params.id;
  await ChatModel.create({ name, users, messages });
  const rooms = await ChatModel.find({ users: id }).sort({ updatedAt: -1 });
  return res.send(rooms);
};

module.exports.getRooms = async (req, res) => {
  const id = req.params.id;
  const rooms = await ChatModel.find({ users: id }).sort({ updatedAt: -1 });
  return res.send(rooms);
};

module.exports.getMessages = async (req, res) => {
  const id = req.params["id"];
  const messages = await ChatModel.findById(id);
  return res.send(messages);
};

module.exports.sendMessage = async (req, res) => {
  const id = req.params["id"];
  const data = req.body;
  const room = ChatModel.findById(id);
  if (!room) {
    return res.send({ err: "errror" });
  }
  const addMessage = await ChatModel.findByIdAndUpdate(
    id,
    { $addToSet: { messages: req.body } },
    { new: true }
  );
  return res.send(addMessage);
};

module.exports.deleteRoom = async (req, res) => {
  const id = req.params["id"];
  await ChatModel.findByIdAndRemove(id);
  return res.send({ message: "ok" });
};
