pgkinfo = require('pkginfo')(module,'version')
_ = require 'underscore'

# default level = debug
exports.level = 4

module.exports = class Logger

	@defaultConfig = 
		showMillis: false
		showTimestamp: true
		stringifyJSON: true
		prefix: ""
		
	@levels =
		error: 1
		warning: 2
		warn: 2
		info: 3
		debug: 4
		
	@setLevel: (level) ->
		levelName = "debug"
		levelValue = 4
		for name,val of Logger.levels
			if level == name or level == val
				levelName = name
				levelValue = val
				break;
			
		log = new this {prefix: 'basic-logger'}
		log.info "Setting log level to '"+levelName+"'"
		exports.level = levelValue		

	constructor: (config={}) ->
		@config = _.defaults config,Logger.defaultConfig

	padZeros: (num,digits) ->
		num = String num
		zerosToAdd = digits - num.length
		while zerosToAdd > 0
			num = '0'+num
			zerosToAdd = zerosToAdd - 1;
		num
	
	log: (msg,level,levelName) ->
		if level <= exports.level
			date = new Date
			timestamp = date.getFullYear()+"-"+@padZeros((date.getMonth()+1),2)+"-"+@padZeros(date.getDate(),2)+" "+@padZeros(date.getHours(),2)+":"+@padZeros(date.getMinutes(),2)+":"+@padZeros(date.getSeconds(),2)
			timestamp += "."+@padZeros(date.getMilliseconds(),3) if @config.showMillis
			msg = JSON.stringify msg if @config.stringifyJSON
			output = ''
			output += '['+timestamp+']' if @config.showTimestamp
			output += ' '+@config.prefix if @config.prefix != ""
			output += ' ('+levelName+') '
			output += msg
			return console.log output 
		else
			return -1
		
	error: (msg) ->
		@log msg,1,'error'
		
	info: (msg) ->
		@log msg,3,'info'
		
	warn: (msg) ->
		@log msg,2,'warning'
		
	warning: (msg) ->
		@log msg,2,'warning'
		
	debug: (msg) ->
		@log msg,4,'debug'
