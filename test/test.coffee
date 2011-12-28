vows = require 'vows'
assert = require 'assert'
logger = require '../'

vows
	.describe('Logger')
	.addBatch
		"when instantiating a new logger":
			"with a custom config showMillis = true":
				topic: () ->
					config = 
						showMillis: true
					log = new logger config
				
				"the value of the logger config for showMillis is true and stringifyJSON is still true": (topic) ->
					assert.equal topic.config.showMillis,true
					assert.equal topic.config.stringifyJSON,true
					
			"with a custom config showMillis = false":
				topic: () ->
					config = 
						showMillis: false
					log = new logger config
				
				"the value of the logger config for showMillis is false and stringifyJSON is still true": (topic) ->
					assert.equal topic.config.showMillis,false
					assert.equal topic.config.stringifyJSON,true
				
		"when padding a one-digit number with zeros to 2 digits":
			topic: () ->
				log = new logger
				
			"the result is the one-digits number left-padded with a zero": (topic) ->
				assert.equal topic.padZeros(3,2),'03'
				
		"when logging a message":
			topic: () ->
				config = 
					showMillis: true
					prefix: "Test"
				log = new logger config
				
			"the log method doesn't throw an error": (topic) ->
				assert.doesNotThrow () ->
					topic.info "test message"
	
.exportTo(module)
