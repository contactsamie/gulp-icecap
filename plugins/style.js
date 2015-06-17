var gulp = require('gulp');
var helpers = require("../icecap/system/helpers");
var clean = require('gulp-clean');
var print = require('gulp-print');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var concatCss = require('gulp-concat-css');
var gutil = require('gulp-util');
module.exports = {
        plugin: function (section, setUp) {
        if (section.type === "style") {

            var cssOutputFile = setUp.currentModeAppConfig.root;
            var tmpCssOutputFile = cssOutputFile + "_" + helpers.guid() + '.css';
            //helpers.logAndReturn(section.path,"section path ..");
            gulp.src([setUp.currentModeRootPath + section.path + '/**/*.css'])
                .pipe(print())
                .pipe(concatCss(tmpCssOutputFile))
                .pipe(rename(tmpCssOutputFile))
               
            // .on('error', handleError(section.type))
                .pipe(gulp.dest(setUp.currentModeTmpDirPath + section.path)).pipe(filesize())
                .on('error', gutil.log);

            setUp.compose.style = setUp.compose.style || [];
            setUp.compose.style.push(helpers.logAndReturn(setUp.currentModeTmpDirPath + section.path + "/" + tmpCssOutputFile));

        }


    }

}; 