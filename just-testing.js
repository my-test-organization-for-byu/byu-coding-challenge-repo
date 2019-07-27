// const readlineSync = require('readline-sync');

// const githubUsername = readlineSync.question('Please enter your GitHub username: ');
// const githubPassword = readlineSync.question('Please enter your GitHub password: ', {
//     hideEchoBack: true
// });

// const auth = 'Basic ' + Buffer.from(githubUsername + ':' + githubPassword).toString('base64');

// console.log(auth);

// "body": {
//     "license": {
//         "key": "mit",
//         "name": "MIT License",
//         "spdx_id": "MIT",
//         "url": "https://api.github.com/licenses/mit",
//         "node_id": "MDc6TGljZW5zZTEz"
//     }
// },

console.log(Buffer.from('bXkgbmV3IGZpbGUgY29udGVudHM=', 'base64').toString('ascii'));

const fs = require('fs');

const licenseContents = 'MIT License\n\n' +
    'Copyright (c) ' + new Date().getFullYear() + ' my-test-organization-for-byu\n\n' +
    'Permission is hereby granted, free of charge, to any person obtaining a copy\n' +
    'of this software and associated documentation files (the "Software"), to deal\n' +
    'in the Software without restriction, including without limitation the rights\n' +
    'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n' +
    'copies of the Software, and to permit persons to whom the Software is\n' +
    'furnished to do so, subject to the following conditions:\n\n' +
    'The above copyright notice and this permission notice shall be included in all\n' +
    'copies or substantial portions of the Software.\n\n' +
    'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
    'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
    'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n' +
    'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n' +
    'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n' +
    'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n' +
    'SOFTWARE.'

fs.writeFile('LICENSE', licenseContents, err => {
  if (err) throw err;
  console.log('Saved!');
});
