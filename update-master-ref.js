const https = require('https');
const createPullRequestToAddLicense = require('./create-pull-request-to-add-license');

module.exports = (repoWithoutLicense, githubOrganization, auth, commitSha) => {
    const options = {
        host: 'api.github.com',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : auth,
            'user-agent': 'node.js'
        },
        path: `/repos/${githubOrganization}/${repoWithoutLicense.name}/git/refs/heads/master`,
        method: 'PATCH',
    }

    const body = '{' +
        `"sha": "${commitSha}"` +
        '}';

        console.log('body in update master ref:', body);

    const req = https.request(options, res => {
        let resData = '';
    
        res.on('data', part => {
            resData += part;
        });

        res.on('end', () => {
            console.log('resData&&&&&&&&&&&&&&&&&&&&&:', resData);
            // createPullRequestToAddLicense(repoWithoutLicense, githubOrganization, auth);
            return createPullRequestToAddLicense(repoWithoutLicense, githubOrganization, auth);
        });
    }).on('error', e => {
        console.error(e);
    });

    console.log('req:', req);
    
    req.write(body);
    req.end();
}