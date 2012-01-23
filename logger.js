(function() {
  var Logger, pgkinfo, _;

  pgkinfo = require('pkginfo')(module, 'version');

  _ = require('underscore');

  exports.level = 4;

  module.exports = Logger = (function() {

    Logger.defaultConfig = {
      showMillis: false,
      showTimestamp: true,
      stringifyJSON: true,
      prefix: ""
    };

    Logger.levels = {
      error: 1,
      warning: 2,
      warn: 2,
      info: 3,
      debug: 4
    };

    Logger.setLevel = function(level) {
      var levelName, levelValue, log, name, val, _ref;
      levelName = "debug";
      levelValue = 4;
      _ref = Logger.levels;
      for (name in _ref) {
        val = _ref[name];
        if (level === name || level === val) {
          levelName = name;
          levelValue = val;
          break;
        }
      }
      log = new this({
        prefix: 'basic-logger'
      });
      log.info("Setting log level to '" + levelName + "'");
      return exports.level = levelValue;
    };

    function Logger(config) {
      if (config == null) config = {};
      this.config = _.defaults(config, Logger.defaultConfig);
    }

    Logger.prototype.padZeros = function(num, digits) {
      var zerosToAdd;
      num = String(num);
      zerosToAdd = digits - num.length;
      while (zerosToAdd > 0) {
        num = '0' + num;
        zerosToAdd = zerosToAdd - 1;
      }
      return num;
    };

    Logger.prototype.log = function(msg, level, levelName) {
      var date, output, timestamp;
      if (level <= exports.level) {
        date = new Date;
        timestamp = date.getFullYear() + "-" + this.padZeros(date.getMonth() + 1, 2) + "-" + this.padZeros(date.getDate(), 2) + " " + this.padZeros(date.getHours(), 2) + ":" + this.padZeros(date.getMinutes(), 2) + ":" + this.padZeros(date.getSeconds(), 2);
        if (this.config.showMillis) {
          timestamp += "." + this.padZeros(date.getMilliseconds(), 3);
        }
        if (this.config.stringifyJSON) msg = JSON.stringify(msg);
        output = '';
        if (this.config.showTimestamp) output += '[' + timestamp + ']';
        if (this.config.prefix !== "") output += ' ' + this.config.prefix;
        output += ' (' + levelName + ') ';
        output += msg;
        return console.log(output);
      } else {
        return -1;
      }
    };

    Logger.prototype.error = function(msg) {
      return this.log(msg, 1, 'error');
    };

    Logger.prototype.info = function(msg) {
      return this.log(msg, 3, 'info');
    };

    Logger.prototype.warn = function(msg) {
      return this.log(msg, 2, 'warning');
    };

    Logger.prototype.warning = function(msg) {
      return this.log(msg, 2, 'warning');
    };

    Logger.prototype.debug = function(msg) {
      return this.log(msg, 4, 'debug');
    };

    return Logger;

  })();

}).call(this);
