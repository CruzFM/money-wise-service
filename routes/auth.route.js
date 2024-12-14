const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");

//* Resgister User
router.post('/register', registerUser);

//* Logs in user
router.post('/login', loginUser);

module.exports = router;