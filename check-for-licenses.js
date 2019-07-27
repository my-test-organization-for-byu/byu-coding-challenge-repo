const createLicenseAndCommitIt = require('./create-license-and-commit-it');
const createPullRequestToAddLicense = require('./create-pull-request-to-add-license');
const getTreeSha = require('./get-tree-sha');

module.exports = (optionsOrganizationAuth, githubOrganizationRepos) => {
    const repos = JSON.parse(githubOrganizationRepos);

    for (let i = 0; i < repos.length; i++) {
        if (!repos[i].license) {
            // createLicenseAndCommitIt(repos[i], optionsOrganizationAuth[1], optionsOrganizationAuth[2]);
            // createPullRequestToAddLicense(repos[i], optionsOrganizationAuth[1], optionsOrganizationAuth[2]);
            getTreeSha(repos[i], optionsOrganizationAuth[1], optionsOrganizationAuth[2]);
        }
    }
}
