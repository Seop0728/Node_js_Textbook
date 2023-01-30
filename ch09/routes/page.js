const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

//공통적으로 사용하길 원하는 데이터를 넣어두자
router.use( (req, res, next) => {
	res.locals.user = req.user;
	res.locals.followerCount = 0;
	res.locals.followingCount = 0;
	res.locals.followingIdlist = [];
	next();
})

router.get('/profile', isLoggedIn,renderProfile); // login Ok = profile ok
router.get('/join',isNotLoggedIn, renderJoin);  // login No = join ok
router.get('/', renderMain); // router 마지막 미들웨어를 controller 분리

module.exports = router;