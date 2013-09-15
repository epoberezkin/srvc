module.exports = function(worker, numWorkers, maxRestarts) {
    var cluster = require('cluster')
        , _ = require('underscore')
        , Logger = require('./logger');


    if (cluster.isMaster) {
        // Fork workers
        for (var i = 0; i < numWorkers; i++)
            forkWorker();

        cluster.on('exit', function(worker, code, signal) {
            Logger.error('worker ' + worker.process.pid + ' died');
            var restartsCount = worker.__clstr__restarts;

            if (restartsCount < maxRestarts) {
                Logger.info('restarting worker');
                forkWorker(restartsCount + 1);
            } else
                Logger.error(maxRestarts, 'restarts reached, worker not restarted');
        });

        return cluster.workers;


    } else
        worker();


    function forkWorker(restartsCount) {
        var worker = cluster.fork();
        worker.__clstr__restarts = restartsCount || 0;
    }
};
