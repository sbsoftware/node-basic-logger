vows = require 'vows'
assert = require 'assert'
logger = require '../'

vows
	.describe('Logger')
	.addBatch
		"when instantiating a new logger with a custom config showMillis = true":
			topic: () ->
				config = 
					showMillis: true
				log = new logger config
				
			"the value of the logger config for showMillis is true and stringifyJSON is still true": (topic) ->
				assert.equal topic.config.showMillis,true
				assert.equal topic.config.stringifyJSON,true
				
		"when padding a one-digit number with zeros to 2 digits":
			topic: () ->
				log = new logger
				
			"the result is the one-digits number left-padded with a zero": (topic) ->
				assert.equal topic.padZeros(3,2),'03'
	
.exportTo(module)
