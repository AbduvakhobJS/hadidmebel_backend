const express = require('express')
const {login, logout, verifyToken, protectded, admin} = require("../controller/login");
const router = express.Router()

router.post('/login', login)
router.get('/logout', logout)
router.get('/admin', verifyToken, admin)

module.exports = router