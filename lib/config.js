var nconf = require('nconf')
    , fs = require('fs')
    , os = require('os')
    , path = require('path')
    , Logger = require('./logger');


function useConfigFile(name, file) {
    if (fs.existsSync(file)) {
        Logger.info('using', name, 'configuration in file ' + file);
        nconf.file(name, file);
    }
}


var configDir = path.join(path.dirname(require.main.filename), 'conf/');
useConfigFile('host', configDir + os.hostname() + '.json');
useConfigFile('environment', configDir + (process.env.NODE_ENV || 'development') + '.json');
useConfigFile('default', configDir + 'default.json');


module.exports = nconf.get();
