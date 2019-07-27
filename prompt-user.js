const readlineSync = require('readline-sync');

module.exports = () => {
    const githubUsername = readlineSync.question('Please enter your GitHub username: ');
    const githubPassword = readlineSync.question('Please enter your GitHub password: ', {
        hideEchoBack: true
    });
    const auth = 'Basic ' + Buffer.from(githubUsername + ':' + githubPassword).toString('base64');
    const githubOrganization = readlineSync.question('Please enter a GitHub organization to get repositories from: ');

    console.log(`\nThank you! The repositories in \"${githubOrganization}\" will be checked for licenses; for each repository that doesn't have a license, a pull request will be made to add a license.\n`);

    const options = {
        host: 'api.github.com',
        headers: {
            'Authorization' : auth,
            'user-agent': 'node.js'
        },
        path: `/orgs/${githubOrganization}/repos`
    }

    return [options, githubOrganization, auth];
}
