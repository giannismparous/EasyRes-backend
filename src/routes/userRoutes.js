const express = require('express');
const { getUserInfo, loginHandler, createUserHandler, logoutHandler } = require('../controllers/userController');
const router = express.Router();

// Route: GET /:collectionKey/users/:uid
router.get('/:collectionKey/users/:uid', getUserInfo);
// Route: POST /login
router.post('/login', loginHandler);

// Route: POST /signup
router.post('/signup', createUserHandler);

// Route: POST /logout
router.post('/logout', logoutHandler);

module.exports = router;
