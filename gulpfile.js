var gulp = require('gulp');

var jade = require('gulp-jade-php');

var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var riot = require("gulp-riot");
var sourcemaps = require("gulp-sourcemaps");

//var browser = require("browser-sync");
gulp.task("scss", function(){ 
  return gulp.src("./scss/*.scss")
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe(sourcemaps.init())
      .pipe(sass({
        sourceComments:true
      }).on('error', sass.logError)) 
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./"));

});


gulp.task("riot", function(){ 
  return gulp.src("./riottags/*.jade")
    .pipe(riot( {
      template:"pug"
    }))
    .pipe(gulp.dest("./public/riotjs/"));
});


gulp.task('watch',function () {
  gulp.watch("scss/**/*.scss", ["scss"]);
  gulp.watch("riottags/*.jade", ["riot"]);
  gulp.watch('source/**/*.jade', ['templates']);
});

gulp.task('templates', function() {
  gulp.src('./source/*.jade')
    .pipe(jade({
      pretty:true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['scss', 'riot', 'watch', 'templates']);
