pgkinfo = require('pkginfo')(module,'version')
_ = require 'underscore'

# default level = debug
exports.level = 4

# default options
exports.defaultConfig = 
	showMillis: false
	showTimestamp: true
	printObjFunc: require('util').inspect
	prefix: ""

module.exports = class Logger
		
	@levels =
		error: 1
		warning: 2
		warn: 2
		info: 3
		debug: 4
		trace: 5
		
	@setLevel: (level) ->
		levelName = null
		levelValue = null
		for name,val of Logger.levels
			if level == name or level == val
				levelName = name
				levelValue = val
				break;
		
		log = new this {prefix: 'basic-logger'}	
		if levelName? and levelValue?
			log.info "Setting log level to '"+levelName+"'"
			exports.level = levelValue
		else
			log.warn "Can't set log level to '"+level+"'. This level does not exist."		

	constructor: (config={}) ->
		@config = _.defaults config,exports.defaultConfig

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
			msg = @config.printObjFunc msg if typeof msg == "object"
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
		
	trace: (msg) ->
		@log msg,5,'trace'
