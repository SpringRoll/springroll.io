module.exports = {
	release: {
		options: {
			data: {
				debug: false,
				name: "<%= project.name %>",
				version: "<%= project.version %>",
				year: "<%= new Date().getFullYear() %>"
			}
		},
		files: {
			'<%= distFolder %>/index.html': 'src/main.jade'
		}
	},
	debug: {
		options: {
			pretty: true,
			data: {
				debug: true,
				name: "<%= project.name %>",
				version: "<%= project.version %>",
				year: "<%= new Date().getFullYear() %>"
			}
		},
		files: {
			'<%= distFolder %>/index.html': 'src/main.jade'
		}
	}
};