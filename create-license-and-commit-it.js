const https = require('https');
const createPullRequestToAddLicense = require('./create-pull-request-to-add-license');

module.exports = (repoWithoutLicense, githubOrganization, auth) => {
    const options = {
        host: 'api.github.com',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : auth,
            'user-agent': 'node.js'
        },
        path: `/repos/${githubOrganization}/${repoWithoutLicense.name}/contents/LICENSE`,
        method: 'PUT',
    }

    const licenseContents = 'MIT License\n\n' +
        'Copyright (c) ' + new Date().getFullYear() + ` ${githubOrganization}\n\n` +
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

        const lc = Buffer.from(licenseContents).toString('base64');

    const body = '{' +
        '"message": "Added a license (MIT) to the repo",' +
        `"content": "${lc}"` +
        '}';

    const req = https.request(options, res => {
        let resData = '';
    
        res.on('data', part => {
            resData += part;
        });

        res.on('end', () => {
            console.log('resData@@@@@@@@@@@@@@@@@@:', resData);
            createPullRequestToAddLicense(repoWithoutLicense, githubOrganization, auth);
        });
    }).on('error', e => {
        console.error(e);
    });

    console.log('req:', req);
    
    req.write(body);
    req.end();
}
