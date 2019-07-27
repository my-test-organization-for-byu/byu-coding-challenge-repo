const https = require('https');
const updateMasterRef = require('./update-master-ref');

module.exports = (repoWithoutLicense, githubOrganization, auth, treeSha, parentCommitSha) => {
    const options = {
        host: 'api.github.com',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : auth,
            'user-agent': 'node.js'
        },
        path: `/repos/${githubOrganization}/${repoWithoutLicense.name}/git/commits`,
        method: 'POST',
    }
    
    // "parents": [
    //     "7d1b31e74ee336d15cbd21741bc88a537ed063a0"
    //   ],

    console.log('parentCommitSha^^^^^^^^^^^^^^: ', parentCommitSha);

    const body = '{' +
        '"message": "Adding a license (MIT) to the repo",' +
        `"tree": "${treeSha}",` +
        `"parents": ["${parentCommitSha}"]`
        '}';

    console.log('body::::::::::::', body);
    
    const req = https.request(options, res => {
        let resData = '';
    
        res.on('data', part => {
            resData += part;
        });

        res.on('end', () => {
            console.log('resData create commitTTTTTTTTTTTTTTTTTTTTTTTTTT:', resData);
            const rd = JSON.parse(resData);
            return updateMasterRef(repoWithoutLicense, githubOrganization, auth, rd.sha);
        });
    });

    req.on('error', (error) => {
        console.error(error)
    });

    // console.log('req:', req);
    
    req.write(body);
    req.end();
}