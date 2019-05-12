var gulp = require("gulp");
const { watch, series } = require("gulp");

var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var cssnano = require("gulp-cssnano");

function sassToCss() {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass()) // Using gulp sass
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

function startBrowserSync() {
  browserSync.init({
    server: { baseDir: "app" }
  });
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

gulp.task("useref", function() {
  return gulp
    .src("app/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist"));
});

exports.default = function() {
  startBrowserSync();
  watch("app/scss/**/*.scss", series(sassToCss, browserSyncReload));
  watch("app/*.html", browserSyncReload);
};
