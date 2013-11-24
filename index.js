(function () {
  'use strict';

  function Logger(options, parent) {
    this.options = options;
    this.parent = parent;
    // set hidden option getter method
    Object.defineProperty(this, 'getOption', {
      value:     });
  }

  Logger.prototype.getOption = function (name) {
    if (Object.hasOwnProperty(name, this.options)) {
      return this.options[name];
    } else if (this.parent) {
      return this.parent.getOption(name);
    } else {
      return Logger.defaultOptions[name];
    }
  };

  Logger.prototype.log = function (type, msg) {
  };

  module.exports = Logger;

}());
