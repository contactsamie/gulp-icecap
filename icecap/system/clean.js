var gulp = require('gulp');
var setUp = require("./setup");
var clean = require('gulp-clean');
var print = require('gulp-print');
gulp.task('clean', function () {
    return gulp.src([setUp.currentModeDistPath, setUp.currentModeTmpDirPath]).pipe(print()).pipe(clean());
});
 