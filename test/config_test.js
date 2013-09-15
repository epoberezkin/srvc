var assert = require('assert');

var productionConfig = {
    "server": {
        "port": 3333
    },
    "session": {
        "cookie": "sid",
        "secret": "SECRET",
        "prefix": "sess:"
    },
    "redis": {
        "host": "localhost",
        "port": 6379,
        "db": 2
    }
};

var developmentConfig = {
    "server": {
        "port": 3334
    },
    "session": {
        "cookie": "sid",
        "secret": "SECRET",
        "prefix": "sess:"
    },
    "redis": {
        "host": "localhost",
        "port": 6379,
        "db": 3
    }
};

var configModulePath = '../lib/config';

describe('config module', function() {
    var mainFile;

    beforeEach(function() {
        // a hack to trick config module into thinking that current file is the main app module
        // we need it in order to test loading of config files located relative to this test
        mainFile = require.main.filename;
        require.main.filename = __filename;

        delete require.cache[require.resolve(configModulePath)];
        delete require.cache[require.resolve('nconf')];
    });

    afterEach(function() {
        // restoring back to main app file (mocha in this case)
        require.main.filename = mainFile;
    });

    it('should load config files for development environment', function() {
        process.env.NODE_ENV = 'development'
        var config = require(configModulePath);

        assert.deepEqual(config, developmentConfig);
    });

    it('should load config files for production environment', function() {
        process.env.NODE_ENV = 'production'
        var config = require(configModulePath);

        assert.deepEqual(config, productionConfig);
    });
});
