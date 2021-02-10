const express = require('express');
const {createUser, loginUser, updateUser, getUserByName, RefCode} = require('../controllers/Users');
const getHero = require('../controllers/Hero');

const router = express.Router();

// User
router.post('/users', createUser);
router.post('/login', loginUser);
router.put('/users', updateUser);
router.get('/users', getUserByName);
router.put('/ref-code', RefCode)


// Hero
router.get('/hero', getHero)

module.exports = router;