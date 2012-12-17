(function() {
  var Logger, logLevel, pgkinfo, _,
    __slice = Array.prototype.slice;

  pgkinfo = require('pkginfo')(module, 'version');

  _ = require('underscore');

  exports.defaultConfig = {
    showMillis: false,
    showTimestamp: true,
    printObjFunc: require('util').inspect,
    prefix: ""
  };

  logLevel = 4;

  module.exports = Logger = (function() {

    Logger.levels = {
      error: 1,
      warning: 2,
      warn: 2,
      info: 3,
      debug: 4,
      trace: 5
    };

    Logger.setLevel = function(level, silent) {
      var levelName, levelValue, log, name, val, _ref;
      if (silent == null) silent = false;
      levelName = null;
      levelValue = null;
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
      if ((levelName != null) && (levelValue != null)) {
        if (!silent) log.info("Setting log level to '" + levelName + "'");
        return logLevel = levelValue;
      } else {
        return log.warn("Can't set log level to '" + level + "'. This level does not exist.");
      }
    };

    function Logger(config) {
      if (config == null) config = {};
      this.config = _.defaults(config, exports.defaultConfig);
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

    Logger.prototype.log = function() {
      var args, date, level, levelName, msg, output, timestamp;
      msg = arguments[0], levelName = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      level = Logger.levels[levelName];
      if (level <= logLevel) {
        date = new Date;
        timestamp = date.getFullYear() + "-" + this.padZeros(date.getMonth() + 1, 2) + "-" + this.padZeros(date.getDate(), 2) + " " + this.padZeros(date.getHours(), 2) + ":" + this.padZeros(date.getMinutes(), 2) + ":" + this.padZeros(date.getSeconds(), 2);
        if (this.config.showMillis) {
          timestamp += "." + this.padZeros(date.getMilliseconds(), 3);
        }
        if (typeof msg === "object") msg = this.config.printObjFunc(msg);
        output = '';
        if (this.config.showTimestamp) output += '[' + timestamp + ']';
        if (this.config.prefix !== "") output += ' ' + this.config.prefix;
        output += ' (' + levelName + ') ';
        output += msg;
        args.unshift(output);
        return console.log.apply(this, args);
      } else {
        return -1;
      }
    };

    Logger.prototype.error = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 'error');
      return this.log.apply(this, args);
    };

    Logger.prototype.info = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 'info');
      return this.log.apply(this, args);
    };

    Logger.prototype.warn = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 'warning');
      return this.log.apply(this, args);
    };

    Logger.prototype.warning = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 'warning');
      return this.log.apply(this, args);
    };

    Logger.prototype.debug = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 'debug');
      return this.log.apply(this, args);
    };

    Logger.prototype.trace = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 'trace');
      return this.log.apply(this, args);
    };

    return Logger;

  })();

}).call(this);
