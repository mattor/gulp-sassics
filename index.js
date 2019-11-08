var through = require('through2');
var path = require('path');
var PluginError = require('plugin-error');

// vars
var PLUGIN_NAME = 'gulp-sassics';

module.exports = function (search) {
    search = search || 'ff0000';

    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) {
            callback(null, file);
            return;
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
            return;
        }

        try {
            var name = path.basename(file.path).slice(0, -4);
            var outStr = String(file.contents);
            outStr = encodeURIComponent(outStr);
            outStr = outStr.replace(new RegExp(search, 'g'), '#{$color}');
            outStr = '@function ' + name + '-icon($color: $base-icon-color) {\n\t@return "data:image/svg+xml,' + outStr + '";\n}\n';

            file.contents = new Buffer.from(outStr);

            callback(null, file);
            return;
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err, { fileName: file.path }));
        }

        callback(null, file);
    });
};
