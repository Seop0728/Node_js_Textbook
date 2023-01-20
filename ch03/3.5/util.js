const util = require('util');
const crypto = require('crypto');

// const dontUseMe = util.deprecate((x, y) => {
//   console.log(x + y);
// }, 'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!');
//
// dontUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString('base64'));
  })
  .catch((error) => {
    console.error(error);
  });

// 민섭이가 만들었는데 사실 고장난 함수 였던거임.
// 그럼 승윤님이 sum함수 가져다 쓰고있는데 삭제할수없답

const sum = util.deprecate((x ,y) => {
	console.log(x+y);
},"재밌구만.")

sum(1,5)
