const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile } = require('../controllers/page');

//공통적으로 사용하길 원하는 데이터를 넣어두자
router.use( (req, res, next) => {
	res.locals.user = null;
	res.locals.followerCount = 0;
	res.locals.followingCount = 0;
	res.locals.followingIdlist = [];
	next();
})

router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain); // router 마지막 미들웨어를 controller 분리

module.exports = router;