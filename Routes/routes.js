const express = require('express');
const router = express.Router();

const {
    createUser,
    validateUser,
    createMovie,
    getAllMovies,
    deleteMovies,
    upDateMovies
   
} = require('../Controllers/controllers')

router.route('/signup').post(createUser);
router.route('/login').post(validateUser);
router.route('/createMovie').post(createMovie);
router.route('/').get(getAllMovies);
router.route('/delete').post(deleteMovies);
router.route('/update').put(upDateMovies);

module.exports = router