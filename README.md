logger
======

Basic logger for nodejs supporting error, warning, info, debug and trace messages with (or without) timestamp.
Everything you log is printed to the console.

Installation
------------

	npm install basic-logger

Usage
-----

	var logger = require('basic-logger');
	// configure level one time, it will be set to every instance of the logger
	logger.setLevel('warning'); // only warnings and errors will be shown

	var customConfig = {
		showMillis: true;
		showTimestamp: true;
	};

	var log = new logger(customConfig) // custom config parameters will be used, defaults will be used for the other parameters

	log.error('An error occurred');
	log.warn('I am not kidding!');
	log.info('you just screwed this');
	log.debug('this code is still alive...');
	log.trace('we are here.');
	
Config options
--------------

* `showTimestamp` - Show the timestamp with every message.
* `showMillis` - Show milliseconds in the timestamp.
* `printObjFunc` - The function to apply objects to, if logged. Default is util.inspect.
* `prefix` - String that is prepended to every message logged with this instance.

Test
----

You'll need `vows`. Then just run `npm test`.

Future versions
---------------

* support for colored log messages
