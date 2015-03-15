'use strict';
var through = require('through2');
var path = require('path');

module.exports = function (search) {
	search = search || 'ff0000';

	return through.obj(function (file, enc, callback) {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		if (file.isStream()) {
			callback(new gutil.PluginError('gulp-sassics', 'Streaming not supported'));
			return;
		}

		try {
			var name = path.basename(file.path).slice(0, -4);
			var outStr = String(file.contents);
			outStr = encodeURIComponent(outStr);
			outStr = outStr.replace(new RegExp(search, 'g'), '#{$color}');
			outStr = '@function ' + name + '-icon($color: $base-icon-color) {\n\t@return "data:image/svg+xml,' + outStr + '";\n}\n';

			file.contents = new Buffer(outStr);

			callback(null, file);
			return;
		}
		catch (err) {
			this.emit('error', new gutil.PluginError('gulp-sassics', err, {
				fileName: file.path
			}));
		}

		callback(null, file);
	});
};