const https = require('https');
const createCommit = require('./create-commit');
const getMostRecentCommitOnMasterBranch = require('./get-most-recent-commit-on-master-branch');

module.exports = (repoWithoutLicense, githubOrganization, auth) => {
    const options = {
        host: 'api.github.com',
        headers: {
            'Authorization' : auth,
            'user-agent': 'node.js'
        },
        path: `/repos/${githubOrganization}/${repoWithoutLicense.name}/branches/master`
    }

    https.get(options, res => {
        let resData = '';
    
        res.on('data', part => {
            resData += part;
        });

        res.on('end', () => {
            const rd = JSON.parse(resData);
            console.log('treeSha:', rd.commit.commit.tree.sha);
            // return createCommit(repoWithoutLicense, githubOrganization, auth, rd.commit.commit.tree.sha);
            return getMostRecentCommitOnMasterBranch(repoWithoutLicense, githubOrganization, auth, rd.commit.commit.tree.sha)
        });
    }).on('error', e => {
        console.error(e);
    });
}