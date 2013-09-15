var assert = require('assert')
    , srvc = require('..');

describe('srvc', function() {
   it('should have Logger - constructor function', function() {
       assert.equal(typeof srvc.Logger, 'function');
   });
});
