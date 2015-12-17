module.exports = function(grunt)
{
	// HTML tasks
	grunt.registerTask('html', 'Build the site HTML', [
		'clean:html',
		'jade:release'
	]);

	grunt.registerTask('html-debug', 'Build the site HTML in debug mode', [
		'jade:debug'
	]);

	// Build hooks
	grunt.registerTask('_pre-build', [
		'html'
	]);

	grunt.registerTask('_pre-build-debug', [
		'html-debug'
	]);

	grunt.registerTask('deploy', [
		'default',
		'copy:deploy'
	]);
};