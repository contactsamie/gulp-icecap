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
        if (section.type === "script") {

            var scriptOutputFile = setUp.currentModeAppConfig.root;
            var tmpScriptOutputFile = scriptOutputFile + "_" + helpers.guid() + '.js'
            // helpers.logAndReturn(section.path,"section path ..");
           
            gulp.src([setUp.currentModeRootPath + section.path + '/**/*.js'])
                .pipe(print())
                .pipe(concat(tmpScriptOutputFile))
                .pipe(rename(tmpScriptOutputFile))
                .pipe(gulp.dest(setUp.currentModeTmpDirPath + section.path))
                .pipe(filesize())
                .on('error', gutil.log);

            setUp.compose.script = setUp.compose.script || [];
            setUp.compose.script.push(helpers.logAndReturn(setUp.currentModeTmpDirPath + section.path + "/" + tmpScriptOutputFile));
        }

    }

}; 