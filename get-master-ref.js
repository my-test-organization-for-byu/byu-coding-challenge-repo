const https = require('https');
const createCommit = require('./create-commit');
// https://api.github.com/repos/my-test-organization-for-byu/repo-public-2/git/refs/heads/master

module.exports = (repoWithoutLicense, githubOrganization, auth, treeSha) => {
    const options = {
        host: 'api.github.com',
        headers: {
            'Authorization' : auth,
            'user-agent': 'node.js'
        },
        path: `/repos/${githubOrganization}/${repoWithoutLicense.name}/git/refs/heads/master`
    }

    https.get(options, res => {
        let resData = '';
    
        res.on('data', part => {
            resData += part;
        });

        res.on('end', () => {
            console.log('resData get most recent commit on masterRRRRRRRRRRRRRRRRRRRR:', resData);
            const rd = JSON.parse(resData);
            console.log('rd.object.sha:', rd.object.sha);
            // return checkForLicenses(optionsOrganizationAuth, organizationRepos);
            return createCommit(repoWithoutLicense, githubOrganization, auth, treeSha, rd.object.sha);
        });
    }).on('error', e => {
        console.error(e);
    });
}