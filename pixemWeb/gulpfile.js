//pixeweb TuT

var themeName 		= 'tsktech-basic';

var gulp 			= require('gulp'),
	autoprefixer 	= require('gulp-autoprefixer'),
	browserSync 	= require('browser-sync').create(),
	reload 			= browserSync.reload,
	sass 			= require('gulp-sass'),
	cleanCSS		= require('gulp-clean-css'),
	sourcemaps 		= require('gulp-sourcemaps'),
	concat 			= require('gulp-concat'),
	imagemin		= require('gulp-imagemin'),
	changed 		= require('gulp-changed'),
	uglify			= require('gulp-uglify'),
	lineec 			= require('gulp-line-ending-corrector')
	zip 			= require('gulp-zip'),      				// my additions
	notify			= require('gulp-notify');					// my additions

var root 			= './',
	scss			= root + 'sass/',
	js 				= root + 'src/js/',
	jsdist			= root + 'dist/js/';

// Watch Files
var phpWatchFiles 	= root + '**/*.php',
	styleWatchFiles	= scss + '**/*.scss';

// Used to concat the files in a specific order.
var jsSRC = [
    js + 'bootstrap.bundle.js',
    js + 'bootstrap-hover.js',
    js + 'nav-scroll.js',
    js + 'prism.js',
    js + 'resizeSensor.js',
    js + 'sticky-sidebar.js',
    js + 'sticky-sb.js',
    js + 'skip-link-focus-fix.js'
];

// Used to concat the files in a specific order.
var cssSRC =  [
  root + 'src/css/bootstrap.css',
  root + 'src/css/all.css',
  root + 'src/css/prism.css',
  root + 'style.css',
];

var imgSRC 			= root + 'src/images/*',
	imgDEST			= root + 'dist/images',
	zipDEST			= root + 'zipFiles';

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