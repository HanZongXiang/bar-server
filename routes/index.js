var express = require('express');
var router = express.Router();
const register = require('../controller/register');
const login = require('../controller/login');
const message = require('../controller/message');
const user = require('../controller/user');
const music = require('../controller/music');
const journalism = require('../controller/journalism');
const goods = require('../controller/goods');

router.use(register);
router.use(login);
router.use(message);
router.use(user);
router.use(music);
router.use(journalism);
router.use(goods);

module.exports = router;
