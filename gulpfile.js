var gulp = require('gulp');

var gutil = require('gulp-util');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var file = require('gulp-file');
var expect = require('gulp-expect-file');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var htmlreplace = require('gulp-html-replace');
var include = require('gulp-html-tag-include');
var processhtml = require('gulp-processhtml');
var replace = require('gulp-replace-task');
var glob = require("glob");
var modRewrite = require('connect-modrewrite');
var notify = require('gulp-notify');
var less = require('gulp-less');
var gutil = require('gulp-util');
var concatCss = require('gulp-concat-css');
var print = require('gulp-print');
var s2p = require('stream-to-promise');
var Promise = require('bluebird');
var filesize = require('gulp-filesize');
var imagemin = require('gulp-imagemin');
var todo = require('gulp-todo');
var requireDir = require('require-dir');
var tasks = require('gulp-task-listing');
// Require all tasks in gulp/tasks, including subfolders

requireDir('./icecap', { recurse: true });
var helpers = require("./icecap/system/helpers");
helpers.require = function (f) {
    this.log("loading " + f + " ....");
    var result = require(f);
    return result;
};

var rootConfig=require("./icecap.json");
var setUp = require("./icecap/system/setup");
var processScript = require("./"+rootConfig.pluginsDir+"/script");
var processStyle = require("./"+rootConfig.pluginsDir+"/style");
var processAsset = require("./"+rootConfig.pluginsDir+"/asset");
var processImage = require("./"+rootConfig.pluginsDir+"/image");
var processConfig = function () {


    for (var index = 0; index < setUp.currentModeSections.length; index++) {
        var section = setUp.currentModeSections[index];
        processScript.plugin(section, setUp);
        processStyle.plugin(section, setUp);
        processAsset.plugin(section, setUp);
        processImage.plugin(section, setUp);
    }
    /*
        gulp.src(setUp.compose.script).pipe(print())
            .pipe(concat(scriptOutputFile + '.min.js'))
            .pipe(rename(scriptOutputFile + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(setUp.currentModeDistPath));
            
            
    gulp.task('clean', function () {
        helpers.log('cleaning up');
        return gulp.src([setUp.currentModeDistPath, setUp.currentModeTmpDirPath]).pipe(print()).pipe(clean());
    });
    */
};
gulp.task('man', tasks);
gulp.task('processConfig', ['man', 'clean'], function () {
    processConfig();
});



gulp.task('default', ['processConfig']);

