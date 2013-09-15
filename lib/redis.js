var config = require('./config')
    , redisConf = config && config.redis;

if (redisConf && redisConf.port && redisConf.host) {
    var redis = {}
        , redis_cli = redis.redis = require('redis')
        , Logger = require('./logger');

    module.exports = redis;


    // function to create clents
    redis.createClient = function() {
        return redis_cli.createClient(redisConf.port, redisConf.host);
    };


    var client = redis.client = redis.createClient();

    client.on("error", function (err) {
        Logger.error("redis: " + err);
    });
}
