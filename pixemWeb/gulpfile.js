//pixeweb TuT

var themeName 		= 'tsktech-basic';

var gulp 			= require('gulp'),
	autoprefixer 	= require('gulp-autoprefixer'),
	browserSync 	= require('browser-sync').create(),
	reload 			= browserSync.reload,
	sass 			= require('gulp-sass'),
	critical 		= require('critical'),
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

function css() {
  return gulp.src([scss + 'style.scss'])
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sass({
  	outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(sourcemaps.write())
  .pipe(lineec())
  .pipe(gulp.dest(root));
}

function concatCSS () {
	return gulp.src(cssSRC)
	.pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
	.pipe(concat('style.min.css'))
	.pipe(cleanCSS())
	.pipe(sourcemaps.write('./maps/'))
	.pipe(lineec())
	.pipe(gulp.dest(scss));
}

function javaScript() {
	return gulp.src(jsSRC)
	.pipe(concat(themeName + '.js'))
	.pipe(uglify())
	.pipe(lineec())
	.pipe(gulp.dest(jsdist));
}
//   .pipe(concat('devwp.js'))

function imgmin() {
	return gulp.src(imgSRC)
	.pipe(changed(imgDEST))
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationLevel: 5})
	]))
	.pipe(gulp.dest(imgDEST));
}

function zippackage (){
	return gulp.src(zipSRC, {base: "."})
	.pipe(zip(themeName + '.zip'))
  	.pipe(gulp.dest('./zipFiles/'));
}

function watch () {
	browserSync.init({
		open: 		'external',
		proxy: 		'http://localhost:8888/wordpress',
		port: 		'8090',
		browser: 	'google chrome'
	});
	gulp.watch(styleWatchFiles, gulp.series([css, concatCSS]));
	gulp.watch(jsSRC, javaScript);
	gulp.watch(imgSRC, imgmin);
	gulp.watch([phpWatchFiles, jsdist + themeName + '.js', scss + 'style.min.css']).on('change', browserSync.reload);

}

// browser: "google chrome"
// browser: ["google chrome", "firefox"]

exports.css = css;
exports.concatCSS = concatCSS;
exports.javaScript = javaScript;
exports.watch = watch;
exports.imgmin = imgmin;
exports.zip = zippackage;

var build = gulp.parallel(watch);
gulp.task('default', build);
// gulp.task('default', zippackage);