var __inNode = typeof module !== 'undefined' && module.exports
    , __inAMD = typeof define == 'function' && define.amd;

if (! __inAMD) // not AMD (e.g. requireJS)
    var define = function(moduleName, requirements, func) {
        var dependencies = [];
        requirements.forEach(function(req) {
            if (req) dependencies.push( __inNode ? require(req) : window[req] );
        });
        func.apply(this, dependencies);
    };


define('logger', ['underscore'],
function(_)
{

    // Log levels.

    var levels = [
        'error'
      , 'warn'
      , 'info'
      , 'debug'
    ];

    // Colors for log levels.

    var colors = [
        31
      , 33
      , 36
      , 90
    ];

    var defaultOptions = {
        colors: __inNode && process.env.NODE_ENV == 'development',
        level: 3,
        enabled: true,
        logPrefix: __inNode ? '(' + process.pid + ')' : '',
        logPrefixColor: 34
    };


    // Pads the nice output to the longest log level.

    function pad (str) {
        var max = 0;
        for (var i = 0, l = levels.length; i < l; i++)
            max = Math.max(max, levels[i].length);

        return str.length < max
                ? padRight(str, max, ' ')
                : str;

        function padRight(s, len, ch) {
            return s + new Array(len - s.length + 1).join(ch);
        }
    };

    // Logger (console)

    var Logger = function (opts) {
        if (! this instanceof Logger) throw new Error('Logger should be used as constructor');

        _.defaults(this, opts || {}, defaultOptions);

        Logger.__logger = this;
    };


    // Log method.

    Logger.prototype.log = function (type) {
        var index = levels.indexOf(type);

        if (index > this.level || ! this.enabled)
          return this;

        console.log.apply(
            console
            , [this.colors && this.logPrefixColor
                    ? '   \033[' + this.logPrefixColor + 'm' + this.logPrefix + '  -\033[39m'
                    : this.logPrefix
               ,this.colors
                    ? ' \033[' + colors[index] + 'm' + pad(type) + ' -\033[39m'
                    : type + ':'
              ].concat(Array.prototype.slice.call(arguments, 1))
        );

        return this;
    };

    // Generate methods for all log levels.

    _.each(levels, function (name) {
        Logger.prototype[name] = function () {
            this.log.apply(this, [name].concat(Array.prototype.slice.call(arguments)));
        };
        
        Logger[name] = function () {
            var logger = Logger.__logger;
            if (! logger)
                logger = new Logger(defaultOptions);

            logger[name].apply(logger, arguments);
        };
    });


    // exports for Node
    if (__inNode)  module.exports = Logger;

    // exports for browser
    if (! __inAMD && ! __inNode) window.Logger = Logger;

    // exports for AMD (requirejs)
    return Logger;

});
