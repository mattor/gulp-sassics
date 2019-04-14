# gulp-sassics

> A gulp-plugin to embed SVG files into colorizable SASS-functions

## Build

Gulp < 4:

```js
var gulp = require('gulp');
var sassics = require('gulp-sassics');

gulp.task('embed-svg', function() {
    return gulp.src('./resources/svg/*.svg')
    	.pipe(sassics(/FF0000/g)) // #FF0000 is the SVG color we want to control
        .pipe(gulp.dest('./dist/scss/_generated-graphics.scss'));
});
```

Gulp >= 4:

```js
const gulp = require('gulp');
const sassics = require('gulp-sassics');

const embedSvg = () => gulp.src('./resources/svg/*.svg')
    .pipe(sassics(/FF0000/g)) // #FF0000 is the SVG color we want to control
    .pipe(gulp.dest('./dist/scss/_generated-graphics.scss'));

exports.embedSvg = embedSvg
```

## Use

```scss
@import "_generated-graphics";

.element {
    background: url(filename-icon("#BADA55")) center no-repeat;
}

```
