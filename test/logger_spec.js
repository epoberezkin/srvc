var assert = require('assert')
    Logger = require('../lib/logger');

describe('Logger', function() {
    var options = {
        level: 3,
        logPrefix: 'srvc(' + process.pid + ')',
        logPrefixColor: 34
    };

    it('should not fail when instantiated', function() {
        assert.doesNotThrow(function() {
            var logger = new Logger(options);
        });
    });

    it('should define methods error, warn, info, debug that print to console.log with prefix and method name', function() {
        var methods = ['error', 'warn', 'info', 'debug'];
        var expectedPrefix, expectedType, expectedMessage;
        var systemLog = console.log;

        console.log = function() {
            try {
                assert.equal(arguments[0], expectedPrefix);
                assert.equal(arguments[1], expectedType + ':');
                assert.equal(arguments[2], expectedMessage);
            } catch(e) {
                console.log = systemLog;
                throw e;
            }
        };

        expectedPrefix = options.logPrefix;
        expectedMessage = 'logger test';

        var logger = new Logger(options);

        methods.forEach(function(method) {
            expectedType = method;
            assert(logger[method]);
            logger[method]('logger test');
        });

        console.log = systemLog;
    });
});
