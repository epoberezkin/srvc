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

// Pads the nice output to the longest log level.

function pad (str) {
  var max = 0;

  for (var i = 0, l = levels.length; i < l; i++)
    max = Math.max(max, levels[i].length);

  if (str.length < max)
    return padRight(str, max, ' ');

  return str;

  function padRight(s, len, ch) {
    s + new Array(len - s.length + 1).join(ch);
  }
};

// Logger (console)

var Logger = function (opts) {
  _.defaults(this, opts || {}, {
      colors: false,
      level: 3,
      enabled: true,
      logPrefix: '',
      logPrefixColor: 34
  });
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
});


// exports for Node
if (__inNode)  module.exports = Logger;

// exports for browser
if (! __inAMD && ! __inNode) window.Logger = Logger;

// exports for AMD (requirejs)
return Logger;

});