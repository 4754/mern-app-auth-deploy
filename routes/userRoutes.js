// import express from 'express'
const express = require("express");
const router = express.Router();


// import { authUser,registerUser, logoutUser, getUserProfile, updateUserProfile  } from '../controllers/userController.js';
// import { protect } from '../middlewares/authMiddleware.js';

const { authUser,registerUser, logoutUser, getUserProfile, updateUserProfile  } = require("../controllers/userController");
const {protect} = require("../middlewares/authMiddleware")


router.post('/auth', authUser)
router.post('/', registerUser)
router.post('/logout', logoutUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)



// export default router;
//  exports.router = router;
module.exports = router;