# [gulp](https://github.com/wearefractal/gulp)-sassics

> Embed SVG files into SASS as functions with possibility to define the shape color as a function argument.

## Example

```js
var gulp = require('gulp');
var sassics = require('./gulp-sassics.js');

gulp.task('default', function() {
    return gulp.src('./source/*.svg')
    	.pipe(sassics(/3C3C3C/g))
        .pipe(gulp.dest('./build/css/_graphics.scss'));
});
```

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Torbjørn Mathisen