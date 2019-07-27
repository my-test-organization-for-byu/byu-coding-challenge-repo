module.exports = async () => {
    const getOrganizationRepos = require('./get-organization-repos');
    const promptUser = require('./prompt-user');

    const optionsOrganizationAuth = promptUser();
    getOrganizationRepos(optionsOrganizationAuth);
}
