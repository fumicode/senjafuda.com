var gulp = require('gulp');

var jade = require('gulp-jade-php');

var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var riot = require("gulp-riot");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("scss", function(){ 
  return gulp.src("./scss/*.scss")
    .pipe(plumber({
      errorHandler: notify.onError("SCSS Error: <%= error.message %>") //<-
    }))
    .pipe(sourcemaps.init())
      .pipe(sass({
        sourceComments:true
      }).on('error', sass.logError)) 
    .pipe(sourcemaps.write("dest/"))
    .pipe(gulp.dest("dest/"));

});


/*
gulp.task("riot", function(){ 
  return gulp.src("./riottags/*.jade")
    .pipe(plumber({
      errorHandler: notify.onError("Riot Error: <%= error.message %>") //<-
    }))
    .pipe(riot( {
      template:"pug"
    }))
    .pipe(gulp.dest("./riotjs/"));
});
*/


gulp.task('watch',function () {
  gulp.watch("src/scss/**/*.scss", ["scss"]);
  //  gulp.watch("src/riottags/**/*.jade", ["riot"]);
  gulp.watch('src/jade/**/*.jade', ['jade-php']);
});

gulp.task('jade-php', function() {
  gulp.src('src/jade/**/*.jade')
    .pipe(plumber({
      errorHandler: notify.onError("Template Error: <%= error.message %>") //<-
    }))
    .pipe(jade({
      pretty:true
    }))
    .pipe(gulp.dest('dest/'));
});

gulp.task('default', ['scss', 'riot', 'watch', 'jade-php']);

