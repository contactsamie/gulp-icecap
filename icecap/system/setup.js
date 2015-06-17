
var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace-task');
var connect = require('gulp-connect');
var helpers = require("./helpers");
helpers.require = function (f) {
    this.log("loading " + f + " ....");
    var result = require(f);
    return result;
};

var setUp = {};
setUp.rootConfig = helpers.require('../../icecap.json');
setUp.rootPath = setUp.rootConfig.root + "/";
setUp.rootTmpDir = setUp.rootPath + setUp.rootConfig.tmpDir + "/";
setUp.modesConfigFolder = setUp.rootPath + setUp.rootConfig.modesDir;
//load mode list 
setUp.modesConfig = helpers.require("../."+setUp.rootPath + setUp.rootConfig.modesConfig);

setUp.currentModeName = setUp.modesConfig.mode;
// get all mode settings
setUp.modes = (function () {
    var m = {};
    // load all modes e.g debug, release etc
    for (var index = 0; index < setUp.modesConfig.modes.length; index++) {
        var name = setUp.modesConfig.modes[index];
        helpers.log("loading mode : " + name);
        m[name] = helpers.require("../."+setUp.modesConfigFolder + '/config.' + name + '.json');
    }
    return m;
})();


setUp.currentModeConfig = setUp.modes[setUp.currentModeName];
//helpers.log("current Mode Config .. ");
//helpers.log(currentModeConfig);

setUp.currentModeAppConfig = helpers.require("../."+setUp.rootPath + setUp.currentModeConfig.appConfig);
setUp.currentModeRootPath = helpers.logAndReturn(setUp.rootPath + setUp.currentModeAppConfig.root + "/", "currentModeRootPath");
setUp.currentModeDistPath = helpers.logAndReturn(setUp.currentModeRootPath + setUp.currentModeAppConfig.dist + "/", "currentModeDistPath");
setUp.currentModeTmpDirPath = helpers.logAndReturn(setUp.rootTmpDir + setUp.currentModeAppConfig.tmpDir + "/", "currentModeTmpDirPath");
setUp.currentModeSections = setUp.currentModeAppConfig.sections;
setUp. compose = {};
module.exports = setUp;