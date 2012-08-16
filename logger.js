(function() {
  var Logger, pgkinfo, _,
    __slice = Array.prototype.slice;

  pgkinfo = require('pkginfo')(module, 'version');

  _ = require('underscore');

  exports.level = 4;

  exports.defaultConfig = {
    showMillis: false,
    showTimestamp: true,
    printObjFunc: require('util').inspect,
    prefix: ""
  };

  module.exports = Logger = (function() {

    Logger.levels = {
      error: 1,
      warning: 2,
      warn: 2,
      info: 3,
      debug: 4,
      trace: 5
    };

    Logger.setLevel = function(level) {
      var levelName, levelValue, log, name, val, _ref;
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
        log.info("Setting log level to '" + levelName + "'");
        return exports.level = levelValue;
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
      msg = arguments[0], level = arguments[1], levelName = arguments[2], args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
      if (level <= exports.level) {
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
      args.unshift(msg, 1, 'error');
      return this.log.apply(this, args);
    };

    Logger.prototype.info = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 3, 'info');
      return this.log.apply(this, args);
    };

    Logger.prototype.warn = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 2, 'warning');
      return this.log.apply(this, args);
    };

    Logger.prototype.warning = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 2, 'warning');
      return this.log.apply(this, args);
    };

    Logger.prototype.debug = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 4, 'debug');
      return this.log.apply(this, args);
    };

    Logger.prototype.trace = function() {
      var args, msg;
      msg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(msg, 5, 'trace');
      return this.log.apply(this, args);
    };

    return Logger;

  })();

}).call(this);
