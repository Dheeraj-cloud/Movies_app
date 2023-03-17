const Users = require("../Models/users");
const Movies = require("../Models/movies");
const bcrypt =  require('bcryptjs')

const createUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPassword= await bcrypt.hash(password, 10) 
  await Users.create({ username: username, password: hashedPassword });
  return res.json({ Msg: "user created" });
};

const validateUser = async (req, res) => {
  const name = req.body.username;
  const pass = req.body.password;
  const users = await Users.findOne({ username: name })
  const validPass   =  bcrypt.compare(pass,users.password);
  
  if (!users) return res.json({ valid: false });
  else {
    if (validPass) return res.json({ valid: true });
  }

  return res.json({ valid: false });
};

const createMovie = async (req, res) => {
  await Movies.create(req.body);
  return res.json({ Msg: "Movie Added Successfully" });
};


const getAllMovies = async(req,res)=>{
   const AllMovies =  await Movies.find({});
    res.send(AllMovies);
}

const deleteMovies = async(req,res)=>{
  const movie_Id = req.body.id;
  await Movies.findOneAndDelete({_id:movie_Id}) 
}

const upDateMovies = async(req,res)=>{
  const movie_Id = req.body._id;
  await Movies.findByIdAndUpdate({_id:movie_Id},req.body,{
    new:true,
    runValidators:true
  })
  return 200;
}

module.exports = {
  createUser,
  validateUser,
  createMovie,
  getAllMovies,
  deleteMovies,
  upDateMovies
};
