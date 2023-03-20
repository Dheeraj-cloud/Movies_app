const express = require('express');
const router = express.Router();
const Verifytoken = require('../jwt/jwt')

const {
    createUser,
    validateUser,
    createMovie,
    getAllMovies,
    deleteMovies,
    upDateMovies
   
} = require('../Controllers/controllers');
const verifyToken = require('../jwt/jwt');

router.route('/signup').post(createUser);
router.route('/login').post(validateUser);
router.route('/createMovie').post(verifyToken,createMovie);
router.route('/').get(verifyToken,getAllMovies);
router.route('/delete').post(verifyToken,deleteMovies);
router.route('/update').put(verifyToken,upDateMovies);

module.exports = router