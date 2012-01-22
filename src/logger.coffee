pgkinfo = require('pkginfo')(module,'version')
_ = require 'underscore'

module.exports = class Logger

	@defaultConfig = 
		showMillis: false
		showTimestamp: true
		stringifyJSON: true
		prefix: ""
		
	@setLevel: (level) ->
		exports.level = level

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
		
	debug: (msg) ->
		@log msg,4,'debug'
