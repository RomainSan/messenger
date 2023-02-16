const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.json({ code: 401 });
    }
    bcrypt.compare(req.body.password, user.password).then((valid) => {
      if (!valid) {
        return res.json({ code: 401 });
      }

      const jwtToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_JSON_TOKEN
      );

      res.json({
        token: jwtToken,
        id: user._id,
        name: user.name,
        email: user.email,
        theme: user.theme,
      });
    });
  });
};

module.exports.getTheme = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    return res.send(user);
  } else {
    return res.send({ message: "error" });
  }
};

module.exports.changeTheme = async (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status;

  const user = await User.findById(id);
  if (user) {
    await User.findByIdAndUpdate(id, { theme: status }, { new: true });
    res.json({
      theme: status,
    });
  }
};
