logger
======

Basic logger for nodejs supporting error, warning, info and debug messages with timestamp.
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
		stringifyJSON: false;
	};

	var log = new logger(customConfig)

	log.info('New Info!');
	log.error('An error occurred');
	log.warn('I am not kidding!');
	log.debug('this code is still alive...');
	
Config options
--------------

* `showTimestamp` - Show the timestamp with every message.
* `showMillis` - Show milliseconds in the timestamp.
* `stringifyJSON` - Apply JSON.stringify to the given message. Good to log objects or arrays.
* `prefix` - String that is prepended to every message logged with this instance.

Test
----

You'll need `vows`. Then just run `npm test`.

Future versions
---------------

* support for colored log messages
