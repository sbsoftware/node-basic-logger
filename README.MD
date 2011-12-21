logger
======

Basic logger for nodejs supporting error, warning, debug and info messages with timestamp.
Everything you log is printed to the console.

Installation
------------

	npm install logger

Usage
-----

	var logger = require('logger');

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

`showMillis` - Show the milliseconds in the timestamp
`stringifyJSON` - Apply JSON.stringify to the given message. Good to log objects or arrays.
