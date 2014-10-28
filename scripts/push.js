#!/usr/bin/env node

// Modules to include
var path = require('path');
var fs = require('fs.extra');
var colors = require('colors');
var exec = require('child_process').exec;
var home = process.env.HOME;
                                       
// Set up the colors
colors.setTheme({
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

require('./banner.js');

// The list of settings
var config = JSON.parse(fs.readFileSync(
	path.join(home, 'config.json')
));

var source = path.join(home, config.site.path);
var target = path.join(home, config.site.pathLive);

// Remove and re-create
fs.rmrfSync(target);
fs.mkdir(target);

fs.copyRecursive(source, target, function(err){
	console.log("Completed".info);
});