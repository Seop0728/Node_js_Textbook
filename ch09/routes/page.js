const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {
  renderProfile, renderJoin, renderMain, renderHashtag,
} = require('../controllers/page');

const router = express.Router();

//공통적으로 사용하길 원하는 데이터를 넣어두자
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
  next();
});

router.get('/profile', isLoggedIn,renderProfile); // login Ok = profile ok
router.get('/join',isNotLoggedIn, renderJoin);  // login No = join ok
router.get('/', renderMain); // router 마지막 미들웨어를 controller 분리
router.get('/hashtag', renderHashtag);  // hashtag?hashtag=고양이
module.exports = router;