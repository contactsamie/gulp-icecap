
var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace-task');
var connect = require('gulp-connect');
module.exports =  {
    log: function (msg) {
        gutil.log('log : ', gutil.colors.magenta(JSON.stringify(msg)));
    },
    replaceTagInFileById: function (file, tagName, scriptId, body, dest) {
        return gulp.src([file]).pipe(replace({
            patterns: [
                {
                    match: new RegExp("<" + tagName + " *id=\"" + scriptId + "\"*[^<]*(?:(?!<\/" + tagName + ">)<[^<]*)*(.|\n)<\/" + tagName + ">"),
                    replacement: '<' + tagName + '  id="' + scriptId + '">' + body + '</' + tagName + '>'
                }
            ]
        })).pipe(gulp.dest(dest));
    },
    replaceScriptTagInFileById: function (file, tagName, scriptId, body, dest) {
        return gulp.src([file]).pipe(replace({
            patterns: [
                {
                    match: new RegExp("<script *id=\"" + scriptId + "\"*[^<]*(?:(?!<\/script>)<[^<]*)*(.|\n)<\/script>"),
                    replacement: '<script  id="script">' + body + '</script>'
                }
            ]
        })).pipe(gulp.dest(dest));
    },
    replaceFileByTagName: function (file, tagName, body, dest) {
        return gulp.src([file]).pipe(replace({
            patterns: [
                {
                    match: new RegExp("<" + tagName + " *[^<]*(?:(?!<\/" + tagName + ">)<[^<]*)*(.|\n)<\/" + tagName + ">"),
                    replacement: '<' + tagName + '  >' + body + '</' + tagName + '>'
                }
            ]
        })).pipe(gulp.dest(dest));
    },
   
    logAndReturn: function (m, message) {
        message && this.log(message + " ...");
        this.log(m);
        return m;
    },
    serve: function (root, port, livereload, middleware) {
        var p = port || 8001;
        this.log('spinning up server at  http://localhost:' + p + '/');

        if (middleware) {
            connect.server({
                root: root,
                livereload: livereload || false,
                port: p,
                middleware: middleware
            });
        } else {
            connect.server({
                root: root,
                livereload: livereload || false,
                port: p
            });
        }
        this.log(JSON.stringify(connect));
    },
    /**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
    guid: function () {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }
};