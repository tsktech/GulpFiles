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
	sass         = require('gulp-sass'),
	imagemin     = require('gulp-imagemin'),
	changed 	 = require('gulp-changed'),
	log 		 = require('fancy-log');
	zip          = require('gulp-zip');

// 	critical 	 = require('critical').stream,
// 	

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

// see: https://www.browsersync.io/docs/options/
/*var browserSyncOptions = {
	watchTask: true,
	proxy    : 'http://localhosts:8888/wordpress',
	port     : 8090,
	browser  : 'google chrome'
}*/

var root 	= './',
	imgSRC 	= root + 'images/**/*',
	imgDEST	= root + 'images',
	zipDEST	= root + 'zipFiles';

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

// var zipDEST = './zipFiles/';


/* not installed in this project
watch        = require( 'gulp-watch' ),
bower        = require('gulp-bower');
livereload   = require('gulp-livereload'), ==> replaced browserSync
critical = require('critical'),
imageoptim = require('gulp-imageoptim'),
jshint       = require('gulp-jshint'),  //replaced with eshint
stylish      = require('jshint-stylish' ),
eslint 		 = require('gulp-eslint'),
*/

// error handling	

function errorLog(error) {
    console.error(error.message);
}﻿

/*
function errorLogs(error) {
    console.error.bind(error);
    this.emit('end');
}﻿ 
// .on('error', errorLogs)
*/

/*
	.pipe( jshint() )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter( 'fail' ) );  // used to stop after error
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

var jsSRC 	= [
	'./js/src/*.js',
	'./js/manifest.js'
];

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
function sass () {
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
	.pipe( notify({ message: 'Images task complete' }));
}

/*
gulp.task('critical', function (cb) {
  critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['css/all.min.css'],
    dimensions: [{
      width: 320,
      height: 480
    },{
      width: 768,
      height: 1024
    },{
      width: 1280,
      height: 960
    }],
    dest: '../_includes/critical.css',
    minify: true,
    extract: false,
    ignore: ['font-face']
  });
});

// Generate & Inline Critical-path CSS
gulp.task('critical', function (cb) {
    critical.generate({
        base: './',
        src: 'http://dev:8888/',
        dest: 'css/home.min.css',
        ignore: ['@font-face'],
        dimensions: [{
          width: 320,
          height: 480
        },{
          width: 768,
          height: 1024
        },{
          width: 1280,
          height: 960
        }],
        minify: true
    });
});


var gulp = require('gulp');
var log = require('fancy-log');
var critical = require('critical').stream;
 
// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('dist/*.html')
        .pipe(critical({base: 'dist/', inline: true, css: ['dist/styles/components.css','dist/styles/main.css']}))
        .on('error', function(err) { log.error(err.message); })
        .pipe(gulp.dest('dist'));
});
*/

// var critical = require('critical').stream;
// gulp.task('html-inline-critical', function () {
// return gulp.src('public/**/*.html', {base: './'})
//     .pipe(
//         critical({
//             base: 'public/',
//             inline: true,
//             css: [
//                 'public/c/css/main.css'
//             ],
//             dimensions: [
//                 {height: 720, width: 1280}
//             ],
//             minify: true,
//             timeout: 120000
//         });
//     )
//     .on('error', function(err) { 
//         gutil.log(gutil.colors.red(err.message)); 
//     })
//     .pipe(gulp.dest('./'));
// });



function criticalGen () {
	return gulp.src('./')
	.pipe(critical({
		base: './',
		src: 'http://localhost:8888/wordpress/',
	    dimensions: [{
	      width: 320,
	      height: 480
	    },{
	      width: 768,
	      height: 1024
	    },{
	      width: 1280,
	      height: 960
	    }],
	    minify: true,
	    ignore: ['@font-face']
	}))
	.pipe(gulp.dest('css/home.min.css'))
	.on('error', function(err) { 
         gutil.log(gutil.colors.red(err.message)); 
     })
	.pipe( notify({ message: 'Images task complete' }));
}



function watch () {
	// browserSync.init(browserSyncOptions);
	browserSync.init({
		open: 		'external',
		proxy: 		'http://localhost:8888/wordpress',
		port: 		'8090',
		browser: 	'google chrome'
	});
	// gulp.watch(jsSRC, jsCheck);
	gulp.watch('./js/manifest.js', gulp.series(jsCheck , scripts));
	gulp.watch( './sass/**/*.scss', gulp.series(sass, sassMin));
	gulp.watch(imgSRC, imgmin);
	gulp.watch(browserSyncWatchFiles).on('change', browserSync.reload);
}



/*
	gulp.watch(styleWatchFiles, gulp.series([css, concatCSS]));
	gulp.watch(jsSRC, javaScript);
	gulp.watch(imgSRC, imgmin);
	exports.css = css;
	exports.concatCSS = concatCSS;
	exports.javaScript = javaScript;
	exports.imgmin = imgmin;

*/


exports.watch = watch;
exports.zip = zippackage;
exports.jsCheck = jsCheck;
exports.scripts = scripts;
exports.sass = sass;
exports.sassMin = sassMin;
exports.imgmin = imgmin;
exports.criticalGen = criticalGen;

var build = gulp.parallel(watch);
gulp.task('default', scripts);
gulp.task('default', build);
gulp.task('default', critical);

/*
	.pipe( jshint() )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter( 'fail' ) );  // used to stop after error
*/


