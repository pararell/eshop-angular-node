
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    // dev.setThisFromExternalApiKeys - not in git ignore
    module.exports = require('./dev.setThisFromExternalApiKeys');

    // remove comment line bellow and set keys from external API to dev.js in his folder --it will be in git ignore
    // module.exports = require('./dev'); 
}
