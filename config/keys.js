
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    // dev.setThisFromExternalApiKeys - not in git ignore
    module.exports = require('./dev');

    // remove comment line bellow and set keys from external API to dev.js  --it will be in git ignore
    // module.exports = require('./dev');
}
