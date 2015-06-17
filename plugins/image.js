var gulp = require('gulp');
var helpers = require("../icecap/system/helpers");
var clean = require('gulp-clean');
var print = require('gulp-print');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
module.exports = {
    plugin: function (section, setUp) {
        if (section.type === "image") {
            gulp.src([setUp.currentModeRootPath + section.path + '/**/*.*'], {
                base: setUp.currentModeRootPath + section.path
            })
                .pipe(print())
                .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
                .pipe(gulp.dest(setUp.currentModeTmpDirPath + section.path)).pipe(filesize())
                .on('error', gutil.log);

            setUp.compose.image = setUp.compose.image || [];
            setUp.compose.image.push(helpers.logAndReturn(setUp.currentModeTmpDirPath + section.path));

        }

    }

}; 