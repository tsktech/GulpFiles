//pixeweb TuT

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
	sass         = require('gulp-sass');
	imagemin     = require('gulp-imagemin');
	zip          = require('gulp-zip');

/* not installed 
watch        = require( 'gulp-watch' ),
bower        = require('gulp-bower');
livereload   = require('gulp-livereload'), ==> replaced browserSync
critical = require('critical'),
*/

browserSync 	= require('browser-sync').create(),
	
/*
function errorLog(error) {
    console.error(error.message);
}﻿

function errorLogs(error) {
    console.error.bind(error);
    this.emit('end');
}﻿ 
// .on('error', errorLogs)
*/

/*
	.pipe( jshint() )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter( 'fail' ) );
*/


// Default error handler
var onError = function( err ) {
  console.log( 'An error occured:', err.message );
  this.emit('end');
}
// .pipe(plumber()) 

