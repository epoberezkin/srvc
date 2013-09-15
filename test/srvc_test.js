var assert = require('assert')
    , srvc = require('..');

describe('srvc package', function() {
   it('should have Logger module', function() {
       assert.equal(typeof srvc.Logger, 'function');
   });

   it('should have config module', function() {
       var mainFile = require.main.filename; // see comments in config_test.js
       require.main.filename = __filename;
       delete require.cache[require.resolve('nconf')];
       delete require.cache[require.resolve('../lib/config')];
       delete require.cache[require.resolve('..')];

       var srvc = require('..');

       assert.equal(typeof srvc.config, 'object');

       require.main.filename = mainFile;
   });
});
