var gulp = require('gulp');
var helpers = require("../icecap/system/helpers");
var clean = require('gulp-clean');
var print = require('gulp-print');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var gutil = require('gulp-util');
module.exports = {
    plugin: function (section, setUp) {
        if (section.type === "asset") {
            gulp.src([setUp.currentModeRootPath + section.path + '/**/*.*'], {
                base: setUp.currentModeRootPath + section.path
            })
                .pipe(print())
                .pipe(gulp.dest(setUp.currentModeTmpDirPath + section.path)).pipe(filesize())
                .on('error', gutil.log);
            setUp.compose.asset = setUp.compose.asset || [];
            setUp.compose.asset.push(helpers.logAndReturn(setUp.currentModeTmpDirPath + section.path));

        }
    }

}; 