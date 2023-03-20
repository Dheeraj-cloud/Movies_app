const Users = require("../Models/users");
const Movies = require("../Models/movies");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  await Users.create({ username: username, password: hashedPassword });
  return res.json({ Msg: "user created" });
};

const validateUser = async (req, res) => {
  const name = req.body.username;
  const pass = req.body.password;
  const users = await Users.findOne({ username: name });
  const validPass = bcrypt.compare(pass, users.password);

  if (!users) return res.json({ valid: false });
  else {
    if (validPass) {
      const token = jwt.sign({ user_id: name }, process.env.TOKEN_KEY, {
        expiresIn: "300s",
      });
      return res.json({ valid: true, newtoken: token });
    }
  }

  return res.json({ valid: false });
};

const createMovie = async (req, res) => {
  const token = req.headers["x-access-token"];
  const user =   jwt.verify(token, process.env.TOKEN_KEY);
   if(Users.find(user)){
    await Movies.create(req.body);
    return res.json({ Msg: "Movie Added Successfully" }); 
   }
   return res.json({Msg:"Token expired"})
};

const getAllMovies = async (req, res) => {
  const AllMovies = await Movies.find({});
  res.send(AllMovies);
};

const deleteMovies = async (req, res) => {
  const movie_Id = req.body.id;
  await Movies.findOneAndDelete({ _id: movie_Id });
  return res.json({ Msg: "Deleted Movies Successfully" });
};

const upDateMovies = async (req, res) => {
  const movie_Id = req.body._id;
  await Movies.findByIdAndUpdate({ _id: movie_Id }, req.body, {
    new: true,
    runValidators: true,
  });
  return res.json({ Msg: "Updated Movies Successfully" });
};

module.exports = {
  createUser,
  validateUser,
  createMovie,
  getAllMovies,
  deleteMovies,
  upDateMovies,
};
