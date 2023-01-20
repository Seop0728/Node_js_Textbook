const url = require('url');

const { URL } = url;
const myURL = new URL('https://github.com/Seop0728/Node_js_Textbook');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));