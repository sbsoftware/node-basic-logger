pgkinfo = require('pkginfo')(module,'version')
_ = require 'underscore'

module.exports = class Logger

	@defaultConfig = 
		showMillis: false
		showTimestamp: true
		stringifyJSON: true
		prefix: ""

	constructor: (config={}) ->
		@config = _.defaults config,Logger.defaultConfig

	padZeros: (num,digits) ->
		num = String num
		zerosToAdd = digits - num.length
		while zerosToAdd > 0
			num = '0'+num
			zerosToAdd = zerosToAdd - 1;
		num		
	
	log: (msg,level) ->
		date = new Date
		timestamp = date.getFullYear()+"-"+@padZeros((date.getMonth()+1),2)+"-"+@padZeros(date.getDate(),2)+" "+@padZeros(date.getHours(),2)+":"+@padZeros(date.getMinutes(),2)+":"+@padZeros(date.getSeconds(),2)
		timestamp += "."+@padZeros(date.getMilliseconds(),3) if @config.showMillis
		msg = JSON.stringify msg if @config.stringifyJSON
		output = ''
		output += '['+timestamp+']' if @config.showTimestamp
		output += ' '+@config.prefix if @config.prefix != ""
		output += ' ('+level+') '
		output += msg
		console.log output
		
	error: (msg) ->
		@log msg,'error'
		
	info: (msg) ->
		@log msg,'info'
		
	warn: (msg) ->
		@log msg,'warning'
		
	debug: (msg) ->
		@log msg,'debug'
