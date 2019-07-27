const https = require('https');
const checkForLicenses = require('./check-for-licenses');

module.exports = optionsOrganizationAuth => {
    https.get(optionsOrganizationAuth[0], res => {
        let organizationRepos = '';
    
        res.on('data', part => {
            organizationRepos += part;
        });

        res.on('end', () => {
            return checkForLicenses(optionsOrganizationAuth, organizationRepos);
        });
    }).on('error', e => {
        console.error(e);
    });
}
