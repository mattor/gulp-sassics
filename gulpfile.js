var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var concat = require('gulp-concat');
var sassics = require('./gulp-sassics.js');


// Project specific variables
var colorReplace = /3C3C3C/g;
var svgSourcePath = './source/';
var scssDestFile = '_graphics-generated.scss';
var scssDestPath = '../../Web/Static/styles/pages/shoppinglist/';


gulp.task('default', function() {
    return gulp.src(svgSourcePath + '*.svg')
        .pipe(svgmin({
            plugins: [
				{ removeTitle: true },
				{ removeDesc: true },
				{ removeDoctype: true },
				{ removeMetadata: true },
				{ removeEditorsNSData: true },
				{ removeXMLProcInst: true },
				{ removeComments: true },
				{ cleanupAttrs: true },
				{ cleanupIDs: true },
				{ cleanupEnableBackground: true },
				{ removeHiddenElems: true },
				{ removeEmptyText: true },
				{ removeUnusedNS: true },
				{ removeUnknownsAndDefaults: true },
            ]
        }))
    	.pipe(sassics(colorReplace))
    	.pipe(concat(scssDestFile))
        .pipe(gulp.dest(scssDestPath));
});