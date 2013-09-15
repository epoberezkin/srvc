srvc
====

Micro-services framework for node.js

This module has the code usually used in node.js application to simplify creation of micro-services.


install
-------

npm install srvc


use
---

    var srvc = require('srvc');


cluster
-------

spawns workers.

server.js:

    var cluster = srvc.cluster
        , worker = require('./worker');
        
    cluster(worker, 4, 10); // spawns 4 workers and restarts up to 10 times if they exit
    
worker.js:

    module.exports = function() {
        var express = require('express')
            , app = express();
            
        app.get('/hello', function(req, res){
            res.send('Hello World');
        });
        
        app.listen(3000);
        console.log('worker', process.pid, 'listens on port 3000');
    };


redis
-----

creates one redis client if redis is configured and simplifies creation of more clients

config
------

loads configuration based on host, environment and defaults.

uses nconf.


logger
------

logs messages according to log level
logger.js can be used in browser as is (with/without require.js).



    var logger = new Logger(options);
    logger.info('starting');
    logger.debug('debugging');
    logger.error('error');
    logger.warning('!!!');


#####logger options#####

    {
        colors: true, // true by default in node/development, false in browser
        level: 3,
        enabled: true,
        logPrefix: '', // (process.pid) by default in node,
        logPrefixColor: 34 // blue
    }
    
options can be set via logger instance.

    logger.level = 1; // errors and warnings
    
The same methods can be used with Logger class. The last created instance will be used to log,
if logger was never instantiated it will be created with default options. 


#####log level#####

- 0 - errors
- 1 - + warnings
- 2 - + info
- 3 - + debug

