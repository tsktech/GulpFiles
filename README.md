**My collection of gulpFile**

1- Gulp 4 Tutorial with Node JS, ImageMin, Browser Sync, SASS, SourceMaps, CleanCSS 

[PixemWeb: Tutorial](https://youtu.be/tTrPLQ6nOX8 "Youtube Video") 
<a href="https://www.pixemweb.com/blog/gulp-4-0-0-with-nodejs-imagemin-browsersync-sass-sourcemaps-cleancss-more/" target="_blank"> Read the Blog</a>

2- Glup 3 Tutorial by [bootstrapWP](https://bootstrapwp.com/ "Develop a WP Theme with BootStrap") adapted to gulp 4 using example from Gulp 
<a href="https://bootstrapwp.com/download-sass-starter-wordpress-theme/" target="_blank"> the Paid Tutorial </a>

**the gulp file are from github**

* [StrapPress](https://github.com/braginteractive/StrapPress/blob/master/gulpfile.js "the StarpPress Theme GulpFile.js")
* [StanleyWP](https://github.com/braginteractive/stanleywp/blob/master/gulpfile.js "StanleyWP Theme GulpFile")


**CRITICAL Plugin NOTES:**

[CRITICAL](https://github.com/addyosmani/critical "Critical Github")

Are there any sample projects available using Critical?
Why, yes!. [Take a look at this](https://github.com/addyosmani/critical-path-css-demo "Critical Path CSS") Gulp project which demonstrates using Critical to generate and inline critical-path CSS. It also includes a mini-tutorial that walks through how to use it in a simple webapp.


**JSHint** is a program that flags suspicious usage in programs written in JavaScript [gulp-jshint](https://www.npmjs.com/package/gulp-jshint "How to use gulp-jshint")

[How to install JSHint and get it working with Sublime Text 3](https://www.youtube.com/channel/UCmRDMfauwbiYKkuIh3B0q3Q "JSHINT by Paul Cheney") also check the [GitHub Repo for plugin SublimeLinter-JShint](https://github.com/SublimeLinter/SublimeLinter-jshint "SublimeLinter-JSHint")

[Tuts+ Code on gulp-jshint](https://youtu.be/tNEdq0eqAQE?t=584 "JSHint in Sublime & Gulp") the actual tut start at 10:00. 

    ```
    .pipe( jshint() )
	.pipe( jshint.reporter( 'default' ) );
    or
    .pipe( jshint() )
    .pipe( jshint.reporter( stylish ) )  // will require ***jshint-stylish***
    .pipe( jshint.reporter( 'fail' ) );  // task to fail when a JSHint error happens?
    ```

***btw its recommeneded to ESLint instead of JSHint*** [ESHINT](https://eslint.org/docs/rules/ "Rules in ESLint")

```
const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src([...])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
```

**GULP Node NOTES:**
If you’ve globally installed gulp before, you’ll want to remove the old version. To check your version, run:

`> gulp -v`

![alt text](https://cdn-images-1.medium.com/max/1600/1*7nkP1HJpMefx74a6yPZo4g.png)

If you don’t see CLI Version 1.x (as shown above), remove your old installation by running:

`npm rm --global gulp`

Now, you can install the standalone CLI using:

`npm install --global gulp-cli`

Run gulp -v again. Everything should match the screenshot above.