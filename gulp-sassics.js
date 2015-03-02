'use strict';

var through = require('through2');
var path = require('path');

module.exports = function(search) {
	var doSassics = function(file, enc, callback) {
		if (file.isNull() || file.isStream()) {
			return callback(null, file);
		}

		function doSassics() {
			if (file.isBuffer()) {
				var encoded = String(file.contents);
				encoded = encodeURIComponent(encoded);
				encoded = encoded.replace(search, '#{$color}');
				var name = path.basename(file.path).slice(0, -4);

				encoded = '@function ' + name + '-icon($color: $base-shape-color) {\n\t@return "data:image/svg+xml,' + encoded + '";\n}\n';

				file.contents = new Buffer(encoded);
				return callback(null, file);
			}

			callback(null, file);
		}

		doSassics();
	};

	return through.obj(doSassics);
};