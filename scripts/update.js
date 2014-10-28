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

// Get the arguments
var args = process.argv.slice(2);

pullContent(
	config.site.repo, 
	config.site.name, 
	config.site.path,
	args[0] || "trunk"
);

function pullContent(repo, name, dir,  tag)
{
        // Create the game path
        var basePath = path.join(home, dir);
        var baseDeployPath = path.join(basePath, "deploy");
        fs.rmrfSync(path.join(basePath, "assets"));
        
	if (fs.existsSync(path.join(basePath, "index.html")))
	{
		fs.unlinkSync(path.join(basePath, "index.html"));
	}

        // Make the directory
        fs.mkdirRecursiveSync(basePath);

        // Go to the game folder
        process.chdir(basePath);
        var cmd = "svn export " + repo + "/" + tag + "/deploy";

        console.log(("Checking out " + tag + " of " + name).info);

        var git = exec(cmd, function (err, stdout, stderr) {
                console.log(stdout.data);
                console.log(stderr.error);
                if (err !== null)
                {
                        console.log(err.error);
                        process.exit(1);
                }
                else
                {
                        fs.copyRecursive(baseDeployPath, basePath, function(err){
                                if (err)
                                {
                                        console.log(err.error);
                                        process.exit(1);
                                }
                                fs.rmrfSync(baseDeployPath);
                                console.log("Completed!".info);
                                process.exit(0);
                        });
                }
        });
}