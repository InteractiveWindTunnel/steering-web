var path = require('path');

var appRoot = 'app/frontend/src/';
var outputRoot = 'web/dist/app';
 var sassPath = 'app/assets/scss';
var jspmPath = './web/jspm_packages';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  style: 'styles/**/*.css',
  output: outputRoot,
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/',
  sassPath: sassPath,
  jspmPath: jspmPath
};
