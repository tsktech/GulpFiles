// bootstrapWP TuT
// see: https://www.browsersync.io/docs/options/


var themeName 		= 'tsktech-basic';

var gulp 		 = require('gulp'),
	plumber      = require('gulp-plumber'), // .pipe(plumber()) for geting the errors
	autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync').create(),
	reload       = browserSync.reload,
	jshint       = require('gulp-jshint'),  
	stylish      = require('jshint-stylish' ),
	uglify       = require('gulp-uglify'),
	rename       = require('gulp-rename'),
	notify       = require('gulp-notify'),
	include      = require('gulp-include'),
	sass         = require('gulp-sass'),
	imagemin     = require('gulp-imagemin'),
	changed 	 = require('gulp-changed'),
	zip          = require('gulp-zip');

// critical 	 = require('critical') is no longer require cause could not get critical.generate to work
// 	changed 	 = require('gulp-changed'),
//	log 		 = require('fancy-log');

var config = {
     nodeDir: './node_modules' 
}

// automatically reloads the page when files changed
var browserSyncWatchFiles = [
	'./sass/**/*.scss',
    './**/*.php',
    './js/**/*.js', 
    '!./js/dist/*.js'
];

//     './js/**/*.min.js',
//         './*.min.css',

var root 	= './',
	imgSRC 	= root + 'images/**/*',
	imgDEST	= root + 'images',
	zipDEST	= root + 'zipFiles';


// add the js file in the order you want them processed.
var jsSRC 	= [
	root + 'js/manifest.js'
];

var cssSRC = [
	root +  'sass/**/*.scss'
];

// './js/src/*.js' for test

// zip is my addition
var zipSRC 			= [
	'*',
	'./css/*',
	'./fonts/*',
	'./images/**/*',
	'./inc/**/*',
	'./js/**/*',
	'./languages/*',
	'./sass/**/*',
	'./template-parts/*',
	'./templates/*',
	'!bower_components',
	'!node_modules',
	'!src',
	'!dist',
	'!originalFiles',
	'!gulp*.*',
	'!pack*.*',
	'!.git*',
	'zipFile'
];


/*
// error handling	?? is this used ..
function errorLog(error) {
    console.error(error.message);
}﻿


function errorLogs(error) {
    console.error.bind(error);
    this.emit('end');
}﻿ 
// .on('error', errorLogs)
*/

// Default error handler
var onError = function( err ) {
  console.log( 'An error occured:', err.message );
  this.emit('end');
}
// .pipe(plumber()) 

function zippackage (){
	return gulp.src(zipSRC, {base: "."})
	.pipe(zip(themeName + '.zip'))
  	.pipe(gulp.dest(zipDEST));
}

// Jshint outputs any kind of javascript problems you might have
// Only checks javascript files inside /src directory
function jsCheck () {
  return gulp.src(jsSRC)
    .pipe( jshint())
    .pipe( jshint.reporter(stylish))
    //.pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
}

// Concatenates all files that it finds in the manifest
// and creates two versions: normal and minified.
// It's dependent on the jshint task to succeed.
function scripts () {
  return gulp.src( './js/manifest.js' )
    .pipe( include() )
    .pipe( rename( { basename: 'scripts' } ) )
    .pipe( gulp.dest( './js/dist' ) )
    // Normal done, time to create the minified javascript (scripts.min.js)
    // remove the following 3 lines if you don't want it
    .pipe( uglify() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( './js/dist' ) )
    //.pipe(browserSync.reload({stream: true}))//
    .pipe(notify({ message: 'scripts task complete' }));
}

// Different options for the Sass tasks
var options = {};
options.sass = {
  errLogToConsole: true,
  precision: 8,
  noCache: true,
  //imagePath: 'assets/img',
  includePaths: [
    config.nodeDir + '/bootstrap/scss',
  ]
};

options.sassmin = {
	errLogToConsole: true,
	precision: 8,
	noCache: true,
	outputStyle: 'compressed',
	//imagePath: 'assets/img',
	includePaths: [
		config.nodeDir + '/bootstrap/scss',
	]
};

// Sass
function sassCSS () {
    return gulp.src('./sass/style.scss')
        .pipe(plumber())
        .pipe(sass(options.sass).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('.'))
        // .pipe(browserSync.reload({stream: true}))
        .pipe(notify({ title: 'Sass', message: 'sass task complete'  }));
}

// Sass-min - Release build minifies CSS after compiling Sass
function sassMin () {
    return gulp.src('./sass/style.scss')
        .pipe(plumber())
        .pipe(sass(options.sassmin).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename( { suffix: '.min' } ) )
        .pipe(gulp.dest('.'))
        // .pipe(browserSync.reload({stream: true}))
        .pipe(notify({ title: 'Sass', message: 'sass-min task complete' }));
}


// Optimize Images

// gulp.task('images', function() {
//     return gulp.src('./images/**/*')
//         .pipe(imageoptim.optimize({jpegmini: true}))
//         .pipe(gulp.dest('./images'))
//         .pipe( notify({ message: 'Images task complete' }));
// });

function imgmin() {
	return gulp.src(imgSRC)
	.pipe(changed(imgDEST))
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationLevel: 5})
	]))
	.pipe(gulp.dest(imgDEST))
	.pipe(notify({message: 'Images task complete'}));
}

// Generate & Inline Critical-path CSS
// del could not get it to work

// watch task for gulp 4
function watch () {
	// browserSync.init(browserSyncOptions);
	browserSync.init({
		open: 		'external',
		proxy: 		'http://localhost:8888/wordpress',
		port: 		'8090',
		browser: 	'google chrome'
	});
	// gulp.watch(jsSRC, jsCheck);
	gulp.watch(jsSRC, gulp.series(jsCheck , scripts));
	gulp.watch(cssSRC, gulp.series(sassCSS, sassMin));
	gulp.watch(imgSRC, imgmin);
	gulp.watch(browserSyncWatchFiles).on('change', browserSync.reload);
}

exports.watch = watch;
exports.zip = zippackage;
exports.jscheck = jsCheck;
exports.scripts = scripts;
exports.sass = sassCSS;
exports.sassMin = sassMin;
exports.imgmin = imgmin;

var build = gulp.parallel(watch);
gulp.task('default', scripts);
gulp.task('default', build);


